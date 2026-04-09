// ===== EVENT SYSTEM =====
class EventSystem {
    constructor(simulation) {
        this.simulation = simulation;
        this.scheduledEvents = [];
        this.missionObjectives = [];
        this.currentMission = null;
        this.startedStartupMission = false;
        
        this.initMissions();
    }

    initMissions() {
        this.missions = [
            {
                id: 'startup',
                title: 'ПУСК РЕАКТОРА',
                description: 'Запустите реактор и выведите его на номинальную мощность',
                objectives: [
                    { id: 'rods_50', description: 'Установить стержни на 50%', check: () => this.simulation.controlRodsPosition >= 45 && this.simulation.controlRodsPosition <= 55 },
                    { id: 'power_70', description: 'Достичь мощности 70%', check: () => this.simulation.reactorPower >= 70 },
                    { id: 'temp_stable', description: 'Стабилизировать температуру (< 300°C)', check: () => this.simulation.coreTemperature < 300 }
                ],
                reward: 'Реактор вышел на рабочий режим'
            },
            {
                id: 'emergency',
                title: 'АВАРИЙНАЯ СИТУАЦИЯ',
                description: 'Произошла авария в системе охлаждения. Примите меры!',
                objectives: [
                    { id: 'activate_cooling', description: 'Активировать аварийное охлаждение', check: () => this.simulation.emergencyCoolingActive },
                    { id: 'insert_rods', description: 'Ввести стержни на 80%+', check: () => this.simulation.controlRodsPosition >= 80 },
                    { id: 'reduce_temp', description: 'Снизить температуру ниже 320°C', check: () => this.simulation.coreTemperature < 320 }
                ],
                reward: 'Авария ликвидирована'
            },
            {
                id: 'grid_demand',
                title: 'ПОВЫШЕННЫЙ СПРОС',
                description: 'Министерство требует увеличить выработку энергии',
                objectives: [
                    { id: 'power_90', description: 'Достичь мощности 90%', check: () => this.simulation.reactorPower >= 90 },
                    { id: 'energy_900', description: 'Выработка > 900 МВт', check: () => this.simulation.energyGeneration > 900 },
                    { id: 'maintain_5min', description: 'Поддерживать 3 минуты', check: () => this.simulation.time > 180000 }
                ],
                reward: 'План выполнен! Премия 500 рублей'
            }
        ];
    }

    startMission(missionId) {
        if (this.currentMission && this.currentMission.active) {
            return false;
        }

        const mission = this.missions.find(m => m.id === missionId);
        if (mission) {
            this.currentMission = {
                ...mission,
                completedObjectives: [],
                startTime: this.simulation.time,
                active: true
            };
            
            this.simulation.addEvent('info', `═══ МИССИЯ: ${mission.title} ═══`);
            this.simulation.addEvent('info', mission.description);
            
            return true;
        }
        return false;
    }

    checkMissionProgress() {
        if (!this.currentMission || !this.currentMission.active) return;
        
        const mission = this.currentMission;
        
        mission.objectives.forEach(obj => {
            if (!mission.completedObjectives.includes(obj.id) && obj.check()) {
                mission.completedObjectives.push(obj.id);
                this.simulation.addEvent('success', `✓ Выполнено: ${obj.description}`);
                
                // Check if mission complete
                if (mission.completedObjectives.length === mission.objectives.length) {
                    this.completeMission();
                }
            }
        });
    }

    completeMission() {
        this.currentMission.completed = true;
        this.currentMission.active = false;
        this.simulation.addEvent('success', `═══ МИССИЯ ВЫПОЛНЕНА ═══`);
        this.simulation.addEvent('success', this.currentMission.reward);
        
        // Schedule next mission
        setTimeout(() => {
            this.scheduleRandomMission();
        }, 30000);
    }

    scheduleRandomMission() {
        const missionIndex = Math.floor(Math.random() * this.missions.length);
        this.startMission(this.missions[missionIndex].id);
    }

    getRandomEvent() {
        const events = [
            {
                type: 'inspection',
                trigger: () => Math.random() < 0.002,
                execute: () => {
                    this.simulation.addEvent('info', 'ПРОВЕРКА: Инспекторы из министерства прибыли');
                    setTimeout(() => {
                        this.simulation.addEvent('success', 'Проверка завершена. Замечаний нет.');
                    }, 15000);
                }
            },
            {
                type: 'equipment_failure',
                trigger: () => Math.random() < 0.001 && this.simulation.reactorPower > 50,
                execute: () => {
                    this.simulation.addEvent('danger', 'АВАРИЯ: Отказ датчика давления контура №2');
                    this.simulation.applyExternalPressureShock(2);
                }
            },
            {
                type: 'ministry_order',
                trigger: () => Math.random() < 0.0015,
                execute: () => {
                    const orders = [
                        'Увеличить выработку на 20% в течение 5 минут',
                        'Провести тестирование систем безопасности',
                        'Снизить мощность до 50% для профилактики',
                        'Подготовить доклад о работе станции'
                    ];
                    const order = orders[Math.floor(Math.random() * orders.length)];
                    this.simulation.addEvent('warning', `ДИРЕКТИВА МИНИСТЕРСТВА: ${order}`);
                }
            },
            {
                type: 'shift_change',
                trigger: () => this.simulation.time % 600000 < 1000 && this.simulation.ticks > 0,
                execute: () => {
                    const shifts = ['Бригада №1', 'Бригада №2', 'Бригада №3', 'Бригада №4'];
                    const shift = shifts[Math.floor(Math.random() * shifts.length)];
                    this.simulation.addEvent('info', `СМЕНА ПЕРСОНАЛА: ${shift} заступила на дежурство`);
                }
            }
        ];
        
        return events.find(event => event.trigger());
    }

    update(deltaTime) {
        // Check for random events
        const randomEvent = this.getRandomEvent();
        if (randomEvent) {
            randomEvent.execute();
        }
        
        // Check mission progress
        this.checkMissionProgress();
        
        // Auto-trigger first mission only after onboarding period.
        var startupDelay = (typeof REACTOR_CONFIG !== 'undefined' && typeof REACTOR_CONFIG.startupMissionDelay === 'number')
            ? REACTOR_CONFIG.startupMissionDelay
            : this.simulation.gracePeriod;

        if (!this.startedStartupMission && this.simulation.time >= startupDelay) {
            if (this.startMission('startup')) {
                this.startedStartupMission = true;
            }
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventSystem;
}
