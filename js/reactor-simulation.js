// ===== REACTOR SIMULATION ENGINE =====
export class ReactorSimulation {
    constructor() {
        this.maxAlertHistory      = 200;
        this.maxEventHistory      = 500;
        // Core parameters from config
        var c = REACTOR_CONFIG.initial;
        this.coreTemperature      = c.coreTemperature;
        this.pressure             = c.pressure;
        this.radiationLevel       = c.radiationLevel;
        this.reactorPower         = c.reactorPower;
        this.controlRodsPosition  = c.controlRodsPosition;
        this.mainPumpSpeed        = c.mainPumpSpeed;

        // Cooling system
        this.tempInlet            = c.tempInlet;
        this.tempOutlet           = c.tempOutlet;
        this.coolantFlow          = c.coolantFlow;
        this.pressurizerLevel     = c.pressurizerLevel;
        this.emergencyCoolingActive = false;
        this.extraPumpActive        = false;

        // Power generation
        this.energyGeneration     = c.energyGeneration;
        this.voltage              = c.voltage;
        this.frequency            = c.frequency;
        this.gridLoad             = c.gridLoad;
        this.gridConnected        = true;

        // Safety
        this.scramActive          = false;
        this.alarmThresholds      = REACTOR_CONFIG.alarmThresholds;
        this.decayHeat            = 0;    // calor residual após SCRAM
        this.pumpDegradation      = 1.0;  // multiplicador de eficiência da bomba (falhas temporárias)
        this.pumpDegradationTimer = 0;    // ticks restantes de degradação
        this.rodSlipTimer         = 0;    // ticks restantes de aviso de deslizamento de barras
        this.pressureShockTimer   = 0;    // ticks restantes de alerta de choque de pressão

        // Simulation state
        this.time                 = 0;
        this.ticks                = 0;
        this.totalEnergyMWh       = 0;
        this.totalAlerts          = 0;
        this.alerts               = [];
        this.history              = { temp: [], pressure: [], power: [], radiation: [] };
        this.events               = [];
        this.running              = false;

        // Grace period from config
        this.gracePeriod          = REACTOR_CONFIG.gracePeriod;
        this.eventsEnabled        = false;
        this.graceTimeoutId       = null;

        // Callbacks
        this.onUpdate = null;
        this.onAlert  = null;
        this.onEvent  = null;
    }

    start() {
        this.running = true;
        var graceMinutes = Math.round(this.gracePeriod / 60000);
        this.addEvent('info', 'Система запущена. Реактор в стабильном режиме.');
        this.addEvent('info', 'Период обкатки: ' + graceMinutes + ' минуты до первых событий.');

        // Enable events after grace period
        this.graceTimeoutId = setTimeout(() => {
            this.eventsEnabled = true;
            this.addEvent('warning', 'Период обкатки завершен. Ожидайте события.');
        }, this.gracePeriod);
        if (this.graceTimeoutId && typeof this.graceTimeoutId.unref === 'function') {
            this.graceTimeoutId.unref();
        }
    }

    stop() {
        this.running = false;
        if (this.graceTimeoutId) {
            clearTimeout(this.graceTimeoutId);
            this.graceTimeoutId = null;
        }
    }

    tick(deltaTime) {
        if (!this.running) return;

        this.time += deltaTime;
        this.ticks++;
        this.totalEnergyMWh += this.energyGeneration * (deltaTime / 3600000);
        this._recordHistory();

        // Contador de aviso de deslizamento de barras
        if (this.rodSlipTimer > 0) this.rodSlipTimer--;

        // Contador de alerta de choque de pressão
        if (this.pressureShockTimer > 0) this.pressureShockTimer--;

        // Recuperação ou escalada de falha da bomba
        if (this.pumpDegradationTimer > 0) {
            this.pumpDegradationTimer--;
            if (this.pumpDegradationTimer === 0) {
                if (this.pumpDegradation < 1.0 && Math.random() < 0.25) {
                    // 25% de chance: falha escalada para parada total
                    this.pumpDegradation = 0.02;
                    this.pumpDegradationTimer = 35;
                    this.addEvent('danger', 'КРИТИЧЕСКИЙ ОТКАЗ ГЦН: насос остановлен! Ручное вмешательство требуется.');
                } else {
                    this.pumpDegradation = 1.0;
                    this.addEvent('info', 'ГЦН восстановлен до нормальной производительности.');
                }
            }
        }

        // Update simulation physics
        this.updateControlRodsEffect();
        this.updateCoolingSystem();
        this.updateTemperature();
        this.updatePressure();
        this.updateRadiation();
        this.updatePowerGeneration();
        this.updateGridParameters();

        // Check for alarms (always check, even during grace period)
        this.checkAlarms();

        // Random events (only after grace period)
        if (this.eventsEnabled && Math.random() < REACTOR_CONFIG.randomEventChance) {
            this.triggerRandomEvent();
        }

        // Notify update
        if (this.onUpdate) {
            this.onUpdate(this.getState());
        }
    }

    updateControlRodsEffect() {
        // More rods inserted = less power
        var rodsEffect = (100 - this.controlRodsPosition) / 100;
        var targetPower = rodsEffect * 100;

        if (!this.scramActive) {
            this.reactorPower += (targetPower - this.reactorPower) * REACTOR_CONFIG.physics.powerRodsSmoothFactor;

            // Coeficiente de vazio positivo (RBMK): acima da temperatura crítica, o refrigerante
            // começa a ferver, reduz a moderação e a reação em cadeia se auto-acelera.
            var critTemp = REACTOR_CONFIG.alarmThresholds.temp.critical;
            if (this.coreTemperature > critTemp) {
                this.reactorPower += (this.coreTemperature - critTemp) * REACTOR_CONFIG.physics.voidFeedbackFactor;
                this.reactorPower = Math.min(150, this.reactorPower);
            }
        } else {
            this.reactorPower *= REACTOR_CONFIG.physics.scramShutdownRate; // Rapid shutdown
            // Calor residual (decay heat) dissipa independentemente das barras
            if (this.decayHeat > 0) {
                this.decayHeat *= REACTOR_CONFIG.physics.decayHeatDecayRate;
                if (this.decayHeat < 0.05) this.decayHeat = 0;
            }
        }
    }

    updateCoolingSystem() {
        var pumpEfficiency = (this.mainPumpSpeed / 100) * this.pumpDegradation;
        var extraCooling = this.extraPumpActive ? REACTOR_CONFIG.physics.extraPumpCoolingBoost : 0;
        var emergencyFactor = this.emergencyCoolingActive ? REACTOR_CONFIG.physics.emergencyCoolingFactor : 1.0;

        var totalCooling = (pumpEfficiency + extraCooling) * emergencyFactor;

        // Penalidade de ebulição: acima da temperatura crítica, o refrigerante ferve e perde
        // eficiência de transferência de calor (vapor conduz muito menos que líquido).
        var critTemp = REACTOR_CONFIG.alarmThresholds.temp.critical;
        if (this.coreTemperature > critTemp) {
            var overheat = Math.min(1.0, (this.coreTemperature - critTemp) / (REACTOR_CONFIG.explosionTemp - critTemp));
            var boilingPenalty = Math.max(0.15, 1.0 - overheat * REACTOR_CONFIG.physics.coolingBoilingPenalty);
            totalCooling *= boilingPenalty;
        }

        // Coolant flow rate
        this.coolantFlow = REACTOR_CONFIG.physics.coolantFlowBase * totalCooling;

        // Temperature calculations
        var heatFromReactor = this.reactorPower * REACTOR_CONFIG.physics.heatPerPowerUnit;
        var coolingCapacity = totalCooling * REACTOR_CONFIG.physics.coolingCapacityFactor;

        this.tempOutlet = REACTOR_CONFIG.physics.coolantInletBase + (heatFromReactor / (totalCooling + REACTOR_CONFIG.physics.coolingOffsetConstant));
        this.tempInlet = this.tempOutlet - (coolingCapacity / 100);

        // Pressurizer level
        this.pressurizerLevel = REACTOR_CONFIG.physics.pressurizerBase + (this.coolantFlow / REACTOR_CONFIG.physics.pressurizerFlowDivisor);
        this.pressurizerLevel = Math.min(100, Math.max(0, this.pressurizerLevel));
    }

    updateTemperature() {
        // Core temperature based on power and cooling
        // decayHeat contribui mesmo com SCRAM ativo (calor de decaimento dos produtos de fissão)
        var heatGeneration = this.reactorPower * REACTOR_CONFIG.physics.coreHeatFactor
                           + this.decayHeat * REACTOR_CONFIG.physics.decayHeatFactor;
        var heatDissipation = (this.mainPumpSpeed / 100) * REACTOR_CONFIG.physics.coreDissipationFactor;
        var emergencyCooling = this.emergencyCoolingActive ? REACTOR_CONFIG.physics.emergencyCoolingBonus : 0;

        var targetTemp = REACTOR_CONFIG.physics.baseTemperatureOffset + (heatGeneration - heatDissipation - emergencyCooling);
        this.coreTemperature += (targetTemp - this.coreTemperature) * REACTOR_CONFIG.physics.temperatureSmoothFactor;
        this.coreTemperature = Math.max(REACTOR_CONFIG.physics.minCoreTemperature, this.coreTemperature);
    }

    updatePressure() {
        // Pressure related to temperature
        var tempPressure = REACTOR_CONFIG.physics.tempPressureBase + (this.coreTemperature - 200) * REACTOR_CONFIG.physics.tempPressureFactor;

        // Pressão de vapor: refrigerante fervendo gera pico de pressão no circuito primário
        var critTemp = REACTOR_CONFIG.alarmThresholds.temp.critical;
        if (this.coreTemperature > critTemp) {
            var steamFactor = (this.coreTemperature - critTemp) / 100;
            tempPressure += steamFactor * REACTOR_CONFIG.physics.steamPressureFactor;
        }

        this.pressure += (tempPressure - this.pressure) * REACTOR_CONFIG.physics.pressureSmoothFactor;
        this.pressure = Math.max(REACTOR_CONFIG.physics.pressureMin, Math.min(REACTOR_CONFIG.physics.pressureMax, this.pressure));
    }

    updateRadiation() {
        // Base radiation + temperature factor
        var baseRadiation = REACTOR_CONFIG.physics.radiationBase;
        var tempFactor = Math.max(0, (this.coreTemperature - REACTOR_CONFIG.physics.radiationTempThreshold) / REACTOR_CONFIG.physics.radiationTempDivisor);
        var powerFactor = this.reactorPower / 100;

        this.radiationLevel = baseRadiation + (tempFactor * REACTOR_CONFIG.physics.tempRadiationFactor) + (powerFactor * REACTOR_CONFIG.physics.powerRadiationFactor);

        if (this.scramActive) {
            this.radiationLevel *= REACTOR_CONFIG.physics.scramRadiationDecay;
        }
    }

    updatePowerGeneration() {
        // Energy generation based on reactor power
        this.energyGeneration = (this.reactorPower / 100) * REACTOR_CONFIG.physics.maxEnergyMW;
        this.voltage = REACTOR_CONFIG.physics.voltageBase * (this.reactorPower / 100);
        this.frequency = REACTOR_CONFIG.physics.frequencyBase + (Math.random() - 0.5) * REACTOR_CONFIG.physics.frequencyJitter;
    }

    updateGridParameters() {
        if (this.gridConnected) {
            this.gridLoad = (this.energyGeneration / REACTOR_CONFIG.physics.maxEnergyMW) * 100;
        } else {
            this.gridLoad = 0;
        }
    }

    _recordHistory() {
        var maxLen = 60;
        var h = this.history;
        h.temp.push(this.coreTemperature);
        h.pressure.push(this.pressure);
        h.power.push(this.reactorPower);
        h.radiation.push(this.radiationLevel);
        if (h.temp.length > maxLen) {
            h.temp.shift(); h.pressure.shift(); h.power.shift(); h.radiation.shift();
        }
    }

    checkAlarms() {
        var checks = [
            { value: this.coreTemperature, thresholds: this.alarmThresholds.temp, name: 'temp' },
            { value: this.pressure, thresholds: this.alarmThresholds.pressure, name: 'pressure' },
            { value: this.radiationLevel, thresholds: this.alarmThresholds.radiation, name: 'radiation' },
            { value: this.reactorPower, thresholds: this.alarmThresholds.power, name: 'power' }
        ];

        checks.forEach(check => {
            if (check.value >= check.thresholds.critical) {
                this.addAlert('critical', 'КРИТИЧЕСКИЙ: ' + this.getAlertName(check.name) + ' - ' + check.value.toFixed(2));
            } else if (check.value >= check.thresholds.danger) {
                this.addAlert('danger', 'ОПАСНОСТЬ: ' + this.getAlertName(check.name) + ' превышен');
            } else if (check.value >= check.thresholds.warning) {
                this.addAlert('warning', 'ВНИМАНИЕ: ' + this.getAlertName(check.name) + ' повышен');
            }
        });
    }

    getAlertName(name) {
        var names = {
            temp: 'Температура',
            pressure: 'Давление',
            radiation: 'Радиация',
            power: 'Мощность'
        };
        return names[name] || name;
    }

    addAlert(level, message) {
        // Avoid duplicate alerts
        var recentAlert = null;
        for (var i = 0; i < this.alerts.length; i++) {
            var a = this.alerts[i];
            if (a.message === message && (this.time - a.time) < REACTOR_CONFIG.physics.alertDeduplicateWindow) {
                recentAlert = a;
                break;
            }
        }

        if (!recentAlert) {
            var alert = {
                level: level,
                message: message,
                time: this.time
            };
            this.totalAlerts++;
            this.alerts.push(alert);
            if (this.alerts.length > this.maxAlertHistory) {
                this.alerts.splice(0, this.alerts.length - this.maxAlertHistory);
            }

            if (this.onAlert) {
                this.onAlert(alert);
            }
        }
    }

    addEvent(type, message) {
        var event = {
            type: type,
            message: message,
            time: this.time,
            timestamp: new Date().toLocaleTimeString('ru-RU')
        };
        this.events.push(event);
        if (this.events.length > this.maxEventHistory) {
            this.events.splice(0, this.events.length - this.maxEventHistory);
        }

        if (this.onEvent) {
            this.onEvent(event);
        }
    }

    triggerRandomEvent() {
        var self = this;
        // Peso maior = mais frequente. Informativos têm peso 10; impactantes têm peso 2-3.
        var events = [
            // --- Informativos (peso 10 cada) ---
            { weight: 10, type: 'info',    message: 'Плановая проверка систем завершена' },
            { weight: 10, type: 'info',    message: 'Смена персонала. Бригада №3 заступила' },
            { weight: 10, type: 'info',    message: 'Автоматическая калибровка датчиков' },
            { weight: 10, type: 'info',    message: 'Получена директива министерства №1994' },
            { weight: 10, type: 'warning', message: 'Отклонение частоты тока в сети' },
            // --- Eventos com efeito real (peso 2-3) ---
            {
                weight: 2, type: 'danger',
                message: 'ОТКАЗ ГЦН: производительность насоса снижена до 30%',
                effect: function() {
                    self.pumpDegradation = 0.3;
                    self.pumpDegradationTimer = 25;
                    self.addEvent('warning', 'ГЦН работает на 30%. Восстановление через ~25 сек.');
                }
            },
            {
                weight: 3, type: 'warning',
                message: 'Проскальзывание стержней: потеря позиции -15%',
                effect: function() {
                    self.controlRodsPosition = Math.max(0, self.controlRodsPosition - 15);
                    self.rodSlipTimer = 40;
                    self.addEvent('warning', 'Стержни сдвинулись. Скорректируйте положение регуляторов.');
                }
            },
            {
                weight: 2, type: 'danger',
                message: 'Гидравлический удар в первом контуре',
                effect: function() {
                    self.applyExternalPressureShock(2.0);
                }
            },
            {
                weight: 3, type: 'warning',
                message: 'Частичная потеря охлаждения контура №2',
                effect: function() {
                    self.pumpDegradation = Math.min(self.pumpDegradation, 0.6);
                    self.pumpDegradationTimer = Math.max(self.pumpDegradationTimer, 15);
                    self.addEvent('warning', 'Расход охладителя снижен. Контроль температуры обязателен.');
                }
            }
        ];

        // Seleção por peso acumulado
        var total = 0;
        for (var i = 0; i < events.length; i++) total += events[i].weight;
        var rand = Math.random() * total;
        var cumulative = 0;
        var chosen = events[events.length - 1];
        for (var j = 0; j < events.length; j++) {
            cumulative += events[j].weight;
            if (rand < cumulative) { chosen = events[j]; break; }
        }

        this.addEvent(chosen.type, chosen.message);
        if (chosen.effect) chosen.effect();
    }

    // Control methods
    setControlRods(position) {
        this.controlRodsPosition = Math.max(0, Math.min(100, position));
        this.addEvent('info', 'Стержни установлены на ' + this.controlRodsPosition.toFixed(0) + '%');
    }

    setMainPump(speed) {
        this.mainPumpSpeed = Math.max(0, Math.min(100, speed));
        this.addEvent('info', 'Скорость ГЦН: ' + this.mainPumpSpeed.toFixed(0) + '%');
    }

    toggleEmergencyCooling() {
        this.emergencyCoolingActive = !this.emergencyCoolingActive;
        var msg = this.emergencyCoolingActive ? 'АВАРИЙНОЕ ОХЛАЖДЕНИЕ АКТИВИРОВАНО' : 'Аварийное охлаждение отключено';
        this.addEvent(this.emergencyCoolingActive ? 'danger' : 'info', msg);
    }

    toggleExtraPump() {
        this.extraPumpActive = !this.extraPumpActive;
        var msg = this.extraPumpActive ? 'Дополнительный насос ВКЛ' : 'Дополнительный насос ВЫКЛ';
        this.addEvent('info', msg);
    }

    toggleGridConnection() {
        this.gridConnected = !this.gridConnected;
        var msg = this.gridConnected ? 'Подключение к сети восстановлено' : 'Отключение от сети';
        this.addEvent(this.gridConnected ? 'success' : 'warning', msg);
    }

    activateSCRAM() {
        this.scramActive = true;
        this.decayHeat = this.reactorPower * REACTOR_CONFIG.physics.decayHeatInitialFraction;
        this.controlRodsPosition = 100;
        this.emergencyCoolingActive = true;
        this.gridConnected = false;
        this.addEvent('danger', 'АЗ-5 АКТИВИРОВАНА! АВАРИЙНАЯ ЗАЩИТА РЕАКТОРА!');
    }

    resetSCRAM() {
        this.addEvent('warning', 'Сброс АЗ-5 заблокирован: процедура необратима в текущем сценарии.');
    }

    applyExternalPressureShock(deltaMPa) {
        var p = REACTOR_CONFIG.physics;
        this.pressure = Math.max(p.pressureMin, Math.min(p.pressureMax, this.pressure + deltaMPa));
        this.pressureShockTimer = 20;
        this.addEvent('danger', 'Скачок давления: +' + deltaMPa.toFixed(1) + ' МПа');
    }

    getState() {
        return {
            coreTemperature: this.coreTemperature,
            pressure: this.pressure,
            radiationLevel: this.radiationLevel,
            reactorPower: this.reactorPower,
            controlRodsPosition: this.controlRodsPosition,
            mainPumpSpeed: this.mainPumpSpeed,
            tempInlet: this.tempInlet,
            tempOutlet: this.tempOutlet,
            coolantFlow: this.coolantFlow,
            pressurizerLevel: this.pressurizerLevel,
            emergencyCoolingActive: this.emergencyCoolingActive,
            extraPumpActive: this.extraPumpActive,
            energyGeneration: this.energyGeneration,
            voltage: this.voltage,
            frequency: this.frequency,
            gridLoad: this.gridLoad,
            gridConnected: this.gridConnected,
            scramActive: this.scramActive,
            decayHeat: this.decayHeat,
            pumpDegradation: this.pumpDegradation,
            pumpFaultActive:     this.pumpDegradationTimer > 0,
            rodSlipActive:       this.rodSlipTimer > 0,
            pressureFaultActive: this.pressureShockTimer > 0,
            alerts: this.alerts,
            time: this.time,
            gracePeriodActive: !this.eventsEnabled,
            totalEnergyMWh: this.totalEnergyMWh,
            totalAlerts: this.totalAlerts
        };
    }

    getAlertCount() {
        var count = 0;
        for (var i = 0; i < this.alerts.length; i++) {
            if ((this.time - this.alerts[i].time) < REACTOR_CONFIG.physics.alertRecentWindow) {
                count++;
            }
        }
        return count;
    }

    clearAlerts() {
        this.alerts = [];
    }

    getEvents() {
        return this.events;
    }

    clearEvents() {
        this.events = [];
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReactorSimulation;
}
