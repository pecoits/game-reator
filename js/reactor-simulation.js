// ===== REACTOR SIMULATION ENGINE =====
var ReactorSimulation = (function() {
    function ReactorSimulation() {
        // Core parameters - STABLE initial configuration
        this.coreTemperature = 280; // °C (stable operating temp)
        this.pressure = 15.5; // MPa (normal)
        this.radiationLevel = 0.15; // mSv/h (low, safe)
        this.reactorPower = 75; // % (normal operating power)
        this.controlRodsPosition = 50; // % (mid-range, stable)
        this.mainPumpSpeed = 65; // % (good cooling)
        
        // Cooling system
        this.tempInlet = 185; // °C
        this.tempOutlet = 275; // °C
        this.coolantFlow = 8200; // m³/h
        this.pressurizerLevel = 60; // %
        this.emergencyCoolingActive = false;
        this.extraPumpActive = false;
        
        // Power generation
        this.energyGeneration = 750; // MW
        this.voltage = 15.75; // kV
        this.frequency = 50.0; // Hz
        this.gridLoad = 75; // %
        this.gridConnected = true;
        
        // Safety
        this.scramActive = false;
        this.alarmThresholds = {
            temp: { warning: 300, danger: 350, critical: 400 },
            pressure: { warning: 17, danger: 19, critical: 22 },
            radiation: { warning: 1.0, danger: 5.0, critical: 20.0 },
            power: { warning: 90, danger: 100, critical: 110 }
        };
        
        // Simulation state
        this.time = 0;
        this.ticks = 0;
        this.alerts = [];
        this.events = [];
        this.running = false;
        
        // Grace period - no problems for first 2 minutes (120 seconds)
        this.gracePeriod = 120000; // 2 minutes in milliseconds
        this.eventsEnabled = false;
        
        // Callbacks
        this.onUpdate = null;
        this.onAlert = null;
        this.onEvent = null;
    }

    ReactorSimulation.prototype.start = function() {
        this.running = true;
        this.addEvent('info', 'Система запущена. Реактор в стабильном режиме.');
        this.addEvent('info', 'Период обкатки: 2 минуты до первых событий.');
        
        // Enable events after grace period
        var self = this;
        setTimeout(function() {
            self.eventsEnabled = true;
            self.addEvent('warning', 'Период обкатки завершен. Ожидайте события.');
        }, this.gracePeriod);
    };

    ReactorSimulation.prototype.stop = function() {
        this.running = false;
    };

    ReactorSimulation.prototype.tick = function(deltaTime) {
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
        if (this.eventsEnabled && Math.random() < 0.003) {
            this.triggerRandomEvent();
        }
        
        // Notify update
        if (this.onUpdate) {
            this.onUpdate(this.getState());
        }
    };

    ReactorSimulation.prototype.updateControlRodsEffect = function() {
        // More rods inserted = less power
        var rodsEffect = (100 - this.controlRodsPosition) / 100;
        var targetPower = rodsEffect * 100;
        
        if (!this.scramActive) {
            this.reactorPower += (targetPower - this.reactorPower) * 0.01;
        } else {
            this.reactorPower *= 0.95; // Rapid shutdown
        }
    };

    ReactorSimulation.prototype.updateCoolingSystem = function() {
        var pumpEfficiency = this.mainPumpSpeed / 100;
        var extraCooling = this.extraPumpActive ? 0.3 : 0;
        var emergencyFactor = this.emergencyCoolingActive ? 2.0 : 1.0;
        
        var totalCooling = (pumpEfficiency + extraCooling) * emergencyFactor;
        
        // Coolant flow rate
        this.coolantFlow = 8200 * totalCooling;
        
        // Temperature calculations
        var heatFromReactor = this.reactorPower * 3.8;
        var coolingCapacity = totalCooling * 290;
        
        this.tempOutlet = 185 + (heatFromReactor / (totalCooling + 0.5));
        this.tempInlet = this.tempOutlet - (coolingCapacity / 100);
        
        // Pressurizer level
        this.pressurizerLevel = 50 + (this.coolantFlow / 200);
        this.pressurizerLevel = Math.min(100, Math.max(0, this.pressurizerLevel));
    };

    ReactorSimulation.prototype.updateTemperature = function() {
        // Core temperature based on power and cooling
        var heatGeneration = this.reactorPower * 4.5;
        var heatDissipation = (this.mainPumpSpeed / 100) * 195;
        var emergencyCooling = this.emergencyCoolingActive ? 150 : 0;
        
        var targetTemp = 200 + (heatGeneration - heatDissipation - emergencyCooling);
        this.coreTemperature += (targetTemp - this.coreTemperature) * 0.02;
        this.coreTemperature = Math.max(20, this.coreTemperature);
    };

    ReactorSimulation.prototype.updatePressure = function() {
        // Pressure related to temperature
        var tempPressure = 10 + (this.coreTemperature - 200) * 0.02;
        this.pressure += (tempPressure - this.pressure) * 0.01;
        this.pressure = Math.max(5, Math.min(25, this.pressure));
    };

    ReactorSimulation.prototype.updateRadiation = function() {
        // Base radiation + temperature factor
        var baseRadiation = 0.12;
        var tempFactor = Math.max(0, (this.coreTemperature - 250) / 100);
        var powerFactor = this.reactorPower / 100;
        
        this.radiationLevel = baseRadiation + (tempFactor * 0.3) + (powerFactor * 0.15);
        
        if (this.scramActive) {
            this.radiationLevel *= 0.9;
        }
    };

    ReactorSimulation.prototype.updatePowerGeneration = function() {
        // Energy generation based on reactor power
        this.energyGeneration = (this.reactorPower / 100) * 1000;
        this.voltage = 15.75 * (this.reactorPower / 100);
        this.frequency = 50.0 + (Math.random() - 0.5) * 0.1;
    };

    ReactorSimulation.prototype.updateGridParameters = function() {
        if (this.gridConnected) {
            this.gridLoad = (this.energyGeneration / 1000) * 100;
        } else {
            this.gridLoad = 0;
        }
    };

    ReactorSimulation.prototype.checkAlarms = function() {
        var self = this;
        var checks = [
            { value: this.coreTemperature, thresholds: this.alarmThresholds.temp, name: 'temp' },
            { value: this.pressure, thresholds: this.alarmThresholds.pressure, name: 'pressure' },
            { value: this.radiationLevel, thresholds: this.alarmThresholds.radiation, name: 'radiation' },
            { value: this.reactorPower, thresholds: this.alarmThresholds.power, name: 'power' }
        ];
        
        checks.forEach(function(check) {
            if (check.value >= check.thresholds.critical) {
                self.addAlert('critical', 'КРИТИЧЕСКИЙ: ' + self.getAlertName(check.name) + ' - ' + check.value.toFixed(2));
            } else if (check.value >= check.thresholds.danger) {
                self.addAlert('danger', 'ОПАСНОСТЬ: ' + self.getAlertName(check.name) + ' превышен');
            } else if (check.value >= check.thresholds.warning) {
                self.addAlert('warning', 'ВНИМАНИЕ: ' + self.getAlertName(check.name) + ' повышен');
            }
        });
    };

    ReactorSimulation.prototype.getAlertName = function(name) {
        var names = {
            temp: 'Температура',
            pressure: 'Давление',
            radiation: 'Радиация',
            power: 'Мощность'
        };
        return names[name] || name;
    };

    ReactorSimulation.prototype.addAlert = function(level, message) {
        // Avoid duplicate alerts
        var recentAlert = null;
        for (var i = 0; i < this.alerts.length; i++) {
            var a = this.alerts[i];
            if (a.message === message && (this.time - a.time) < 5000) {
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
    };

    ReactorSimulation.prototype.addEvent = function(type, message) {
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
    };

    ReactorSimulation.prototype.triggerRandomEvent = function() {
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
    };

    // Control methods
    ReactorSimulation.prototype.setControlRods = function(position) {
        this.controlRodsPosition = Math.max(0, Math.min(100, position));
        this.addEvent('info', 'Стержни установлены на ' + this.controlRodsPosition.toFixed(0) + '%');
    };

    ReactorSimulation.prototype.setMainPump = function(speed) {
        this.mainPumpSpeed = Math.max(0, Math.min(100, speed));
        this.addEvent('info', 'Скорость ГЦН: ' + this.mainPumpSpeed.toFixed(0) + '%');
    };

    ReactorSimulation.prototype.toggleEmergencyCooling = function() {
        this.emergencyCoolingActive = !this.emergencyCoolingActive;
        var msg = this.emergencyCoolingActive ? 'АВАРИЙНОЕ ОХЛАЖДЕНИЕ АКТИВИРОВАНО' : 'Аварийное охлаждение отключено';
        this.addEvent(this.emergencyCoolingActive ? 'danger' : 'info', msg);
    };

    ReactorSimulation.prototype.toggleExtraPump = function() {
        this.extraPumpActive = !this.extraPumpActive;
        var msg = this.extraPumpActive ? 'Дополнительный насос ВКЛ' : 'Дополнительный насос ВЫКЛ';
        this.addEvent('info', msg);
    };

    ReactorSimulation.prototype.toggleGridConnection = function() {
        this.gridConnected = !this.gridConnected;
        var msg = this.gridConnected ? 'Подключение к сети восстановлено' : 'Отключение от сети';
        this.addEvent(this.gridConnected ? 'success' : 'warning', msg);
    };

    ReactorSimulation.prototype.activateSCRAM = function() {
        this.scramActive = true;
        this.controlRodsPosition = 100;
        this.emergencyCoolingActive = true;
        this.addEvent('danger', 'АЗ-5 АКТИВИРОВАНА! АВАРИЙНАЯ ЗАЩИТА РЕАКТОРА!');
    };

    ReactorSimulation.prototype.resetSCRAM = function() {
        this.scramActive = false;
        this.addEvent('info', 'Аварийная защита сброшена');
    };

    ReactorSimulation.prototype.getState = function() {
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
    };

    ReactorSimulation.prototype.getAlertCount = function() {
        var count = 0;
        for (var i = 0; i < this.alerts.length; i++) {
            if ((this.time - this.alerts[i].time) < 30000) {
                count++;
            }
        }
        return count;
    };

    ReactorSimulation.prototype.clearAlerts = function() {
        this.alerts = [];
    };

    ReactorSimulation.prototype.getEvents = function() {
        return this.events;
    };

    ReactorSimulation.prototype.clearEvents = function() {
        this.events = [];
    };

    return ReactorSimulation;
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReactorSimulation;
}
