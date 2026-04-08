// ===== REACTOR SIMULATION ENGINE =====
class ReactorSimulation {
    constructor() {
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

        // Simulation state
        this.time                 = 0;
        this.ticks                = 0;
        this.alerts               = [];
        this.events               = [];
        this.running              = false;

        // Grace period from config
        this.gracePeriod          = REACTOR_CONFIG.gracePeriod;
        this.eventsEnabled        = false;

        // Callbacks
        this.onUpdate = null;
        this.onAlert  = null;
        this.onEvent  = null;
    }

    start() {
        this.running = true;
        this.addEvent('info', 'Система запущена. Реактор в стабильном режиме.');
        this.addEvent('info', 'Период обкатки: 2 минуты до первых событий.');

        // Enable events after grace period
        setTimeout(() => {
            this.eventsEnabled = true;
            this.addEvent('warning', 'Период обкатки завершен. Ожидайте события.');
        }, this.gracePeriod);
    }

    stop() {
        this.running = false;
    }

    tick(deltaTime) {
        if (!this.running) return;

        this.time += deltaTime;
        this.ticks++;

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
        } else {
            this.reactorPower *= REACTOR_CONFIG.physics.scramShutdownRate; // Rapid shutdown
        }
    }

    updateCoolingSystem() {
        var pumpEfficiency = this.mainPumpSpeed / 100;
        var extraCooling = this.extraPumpActive ? REACTOR_CONFIG.physics.extraPumpCoolingBoost : 0;
        var emergencyFactor = this.emergencyCoolingActive ? REACTOR_CONFIG.physics.emergencyCoolingFactor : 1.0;

        var totalCooling = (pumpEfficiency + extraCooling) * emergencyFactor;

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
        var heatGeneration = this.reactorPower * REACTOR_CONFIG.physics.coreHeatFactor;
        var heatDissipation = (this.mainPumpSpeed / 100) * REACTOR_CONFIG.physics.coreDissipationFactor;
        var emergencyCooling = this.emergencyCoolingActive ? REACTOR_CONFIG.physics.emergencyCoolingBonus : 0;

        var targetTemp = REACTOR_CONFIG.physics.baseTemperatureOffset + (heatGeneration - heatDissipation - emergencyCooling);
        this.coreTemperature += (targetTemp - this.coreTemperature) * REACTOR_CONFIG.physics.temperatureSmoothFactor;
        this.coreTemperature = Math.max(REACTOR_CONFIG.physics.minCoreTemperature, this.coreTemperature);
    }

    updatePressure() {
        // Pressure related to temperature
        var tempPressure = REACTOR_CONFIG.physics.tempPressureBase + (this.coreTemperature - 200) * REACTOR_CONFIG.physics.tempPressureFactor;
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
            this.alerts.push(alert);

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

        if (this.onEvent) {
            this.onEvent(event);
        }
    }

    triggerRandomEvent() {
        var events = [
            { type: 'warning', message: 'Колебания давления в контуре охлаждения' },
            { type: 'info', message: 'Плановая проверка систем завершена' },
            { type: 'warning', message: 'Повышение температуры в активной зоне' },
            { type: 'info', message: 'Смена персонала. Бригада №3 заступила' },
            { type: 'warning', message: 'Отклонение частоты тока в сети' },
            { type: 'info', message: 'Автоматическая калибровка датчиков' },
            { type: 'danger', message: 'Сбой в системе охлаждения контура №2' },
            { type: 'info', message: 'Получена директива министерства №1994' }
        ];

        var event = events[Math.floor(Math.random() * events.length)];
        this.addEvent(event.type, event.message);
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
        this.controlRodsPosition = 100;
        this.emergencyCoolingActive = true;
        this.addEvent('danger', 'АЗ-5 АКТИВИРОВАНА! АВАРИЙНАЯ ЗАЩИТА РЕАКТОРА!');
    }

    resetSCRAM() {
        this.scramActive = false;
        this.addEvent('info', 'Аварийная защита сброшена');
    }

    applyExternalPressureShock(deltaMPa) {
        var p = REACTOR_CONFIG.physics;
        this.pressure = Math.max(p.pressureMin, Math.min(p.pressureMax, this.pressure + deltaMPa));
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
            alerts: this.alerts,
            time: this.time,
            gracePeriodActive: !this.eventsEnabled
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
