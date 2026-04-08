// ===== REACTOR SIMULATION ENGINE =====
class ReactorSimulation {
    constructor() {
        // Core parameters
        this.coreTemperature = 250; // °C
        this.pressure = 15.5; // MPa
        this.radiationLevel = 0.12; // mSv/h
        this.reactorPower = 75; // %
        this.controlRodsPosition = 50; // %
        this.mainPumpSpeed = 60; // %
        
        // Cooling system
        this.tempInlet = 180; // °C
        this.tempOutlet = 280; // °C
        this.coolantFlow = 8500; // m³/h
        this.pressurizerLevel = 65; // %
        this.emergencyCoolingActive = false;
        this.extraPumpActive = false;
        
        // Power generation
        this.energyGeneration = 850; // MW
        this.voltage = 15.75; // kV
        this.frequency = 50.0; // Hz
        this.gridLoad = 78; // %
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
        
        // Callbacks
        this.onUpdate = null;
        this.onAlert = null;
        this.onEvent = null;
    }

    start() {
        this.running = true;
        this.addEvent('info', 'Система запущена. Реактор в рабочем режиме.');
    }

    stop() {
        this.running = false;
    }

    tick(deltaTime = 1000) {
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
        
        // Check for alarms
        this.checkAlarms();
        
        // Random events
        if (Math.random() < 0.005) {
            this.triggerRandomEvent();
        }
        
        // Notify update
        if (this.onUpdate) {
            this.onUpdate(this.getState());
        }
    }

    updateControlRodsEffect() {
        // More rods inserted = less power
        const rodsEffect = (100 - this.controlRodsPosition) / 100;
        const targetPower = rodsEffect * 100;
        
        if (!this.scramActive) {
            this.reactorPower += (targetPower - this.reactorPower) * 0.01;
        } else {
            this.reactorPower *= 0.95; // Rapid shutdown
        }
    }

    updateCoolingSystem() {
        const pumpEfficiency = this.mainPumpSpeed / 100;
        const extraCooling = this.extraPumpActive ? 0.3 : 0;
        const emergencyFactor = this.emergencyCoolingActive ? 2.0 : 1.0;
        
        const totalCooling = (pumpEfficiency + extraCooling) * emergencyFactor;
        
        // Coolant flow rate
        this.coolantFlow = 8500 * totalCooling;
        
        // Temperature calculations
        const heatFromReactor = this.reactorPower * 4;
        const coolingCapacity = totalCooling * 300;
        
        this.tempOutlet = 180 + (heatFromReactor / (totalCooling + 0.5));
        this.tempInlet = this.tempOutlet - (coolingCapacity / 100);
        
        // Pressurizer level
        this.pressurizerLevel = 50 + (this.coolantFlow / 200);
        this.pressurizerLevel = Math.min(100, Math.max(0, this.pressurizerLevel));
    }

    updateTemperature() {
        // Core temperature based on power and cooling
        const heatGeneration = this.reactorPower * 5;
        const heatDissipation = (this.mainPumpSpeed / 100) * 200;
        const emergencyCooling = this.emergencyCoolingActive ? 150 : 0;
        
        const targetTemp = 200 + (heatGeneration - heatDissipation - emergencyCooling);
        this.coreTemperature += (targetTemp - this.coreTemperature) * 0.02;
        this.coreTemperature = Math.max(20, this.coreTemperature);
    }

    updatePressure() {
        // Pressure related to temperature
        const tempPressure = 10 + (this.coreTemperature - 200) * 0.02;
        this.pressure += (tempPressure - this.pressure) * 0.01;
        this.pressure = Math.max(5, Math.min(25, this.pressure));
    }

    updateRadiation() {
        // Base radiation + temperature factor
        const baseRadiation = 0.1;
        const tempFactor = Math.max(0, (this.coreTemperature - 250) / 100);
        const powerFactor = this.reactorPower / 100;
        
        this.radiationLevel = baseRadiation + (tempFactor * 0.5) + (powerFactor * 0.2);
        
        if (this.scramActive) {
            this.radiationLevel *= 0.9;
        }
    }

    updatePowerGeneration() {
        // Energy generation based on reactor power
        this.energyGeneration = (this.reactorPower / 100) * 1000;
        this.voltage = 15.75 * (this.reactorPower / 100);
        this.frequency = 50.0 + (Math.random() - 0.5) * 0.2;
    }

    updateGridParameters() {
        if (this.gridConnected) {
            this.gridLoad = (this.energyGeneration / 1000) * 100;
        } else {
            this.gridLoad = 0;
        }
    }

    checkAlarms() {
        const checks = [
            { value: this.coreTemperature, thresholds: this.alarmThresholds.temp, name: 'temp' },
            { value: this.pressure, thresholds: this.alarmThresholds.pressure, name: 'pressure' },
            { value: this.radiationLevel, thresholds: this.alarmThresholds.radiation, name: 'radiation' },
            { value: this.reactorPower, thresholds: this.alarmThresholds.power, name: 'power' }
        ];
        
        checks.forEach(check => {
            if (check.value >= check.thresholds.critical) {
                this.addAlert('critical', `КРИТИЧЕСКИЙ: ${this.getAlertName(check.name)} - ${check.value.toFixed(2)}`);
            } else if (check.value >= check.thresholds.danger) {
                this.addAlert('danger', `ОПАСНОСТЬ: ${this.getAlertName(check.name)} превышен`);
            } else if (check.value >= check.thresholds.warning) {
                this.addAlert('warning', `ВНИМАНИЕ: ${this.getAlertName(check.name)} повышен`);
            }
        });
    }

    getAlertName(name) {
        const names = {
            temp: 'Температура',
            pressure: 'Давление',
            radiation: 'Радиация',
            power: 'Мощность'
        };
        return names[name] || name;
    }

    addAlert(level, message) {
        // Avoid duplicate alerts
        const recentAlert = this.alerts.find(a => 
            a.message === message && (this.time - a.time) < 5000
        );
        
        if (!recentAlert) {
            const alert = {
                level,
                message,
                time: this.time
            };
            this.alerts.push(alert);
            
            if (this.onAlert) {
                this.onAlert(alert);
            }
        }
    }

    addEvent(type, message) {
        const event = {
            type,
            message,
            time: this.time,
            timestamp: new Date().toLocaleTimeString('ru-RU')
        };
        this.events.push(event);
        
        if (this.onEvent) {
            this.onEvent(event);
        }
    }

    triggerRandomEvent() {
        const events = [
            { type: 'warning', message: 'Колебания давления в контуре охлаждения' },
            { type: 'info', message: 'Плановая проверка систем завершена' },
            { type: 'warning', message: 'Повышение температуры в активной зоне' },
            { type: 'info', message: 'Смена персонала. Бригада №3 заступила' },
            { type: 'warning', message: 'Отклонение частоты тока в сети' },
            { type: 'info', message: 'Автоматическая калибровка датчиков' },
            { type: 'danger', message: 'Сбой в системе охлаждения контура №2' },
            { type: 'info', message: 'Получена директива министерства №1994' }
        ];
        
        const event = events[Math.floor(Math.random() * events.length)];
        this.addEvent(event.type, event.message);
    }

    // Control methods
    setControlRods(position) {
        this.controlRodsPosition = Math.max(0, Math.min(100, position));
        this.addEvent('info', `Стержни установлены на ${this.controlRodsPosition.toFixed(0)}%`);
    }

    setMainPump(speed) {
        this.mainPumpSpeed = Math.max(0, Math.min(100, speed));
        this.addEvent('info', `Скорость ГЦН: ${this.mainPumpSpeed.toFixed(0)}%`);
    }

    toggleEmergencyCooling() {
        this.emergencyCoolingActive = !this.emergencyCoolingActive;
        const msg = this.emergencyCoolingActive ? 'АВАРИЙНОЕ ОХЛАЖДЕНИЕ АКТИВИРОВАНО' : 'Аварийное охлаждение отключено';
        this.addEvent(this.emergencyCoolingActive ? 'danger' : 'info', msg);
    }

    toggleExtraPump() {
        this.extraPumpActive = !this.extraPumpActive;
        const msg = this.extraPumpActive ? 'Дополнительный насос ВКЛ' : 'Дополнительный насос ВЫКЛ';
        this.addEvent('info', msg);
    }

    toggleGridConnection() {
        this.gridConnected = !this.gridConnected;
        const msg = this.gridConnected ? 'Подключение к сети восстановлено' : 'Отключение от сети';
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
            time: this.time
        };
    }

    getAlertCount() {
        const recentAlerts = this.alerts.filter(a => (this.time - a.time) < 30000);
        return recentAlerts.length;
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
