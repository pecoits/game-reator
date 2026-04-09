// ===== SAVE SYSTEM =====
const SAVE_KEY = 'game_reator_save';
const SAVE_VERSION = 1;

class SaveSystem {
    clamp(value, min, max, fallback) {
        if (typeof value !== 'number' || Number.isNaN(value)) return fallback;
        return Math.max(min, Math.min(max, value));
    }

    toBoolean(value, fallback) {
        if (typeof value === 'boolean') return value;
        return fallback;
    }

    validate(data) {
        if (!data || typeof data !== 'object') return null;
        if (data.version !== SAVE_VERSION) return null;
        if (!data.sim || typeof data.sim !== 'object') return null;

        const s = data.sim;
        return {
            version: SAVE_VERSION,
            savedAt: typeof data.savedAt === 'number' ? data.savedAt : Date.now(),
            sim: {
                coreTemperature: this.clamp(s.coreTemperature, 20, 1000, REACTOR_CONFIG.initial.coreTemperature),
                pressure: this.clamp(s.pressure, 0, REACTOR_CONFIG.physics.pressureMax, REACTOR_CONFIG.initial.pressure),
                radiationLevel: this.clamp(s.radiationLevel, 0, 100, REACTOR_CONFIG.initial.radiationLevel),
                reactorPower: this.clamp(s.reactorPower, 0, 120, REACTOR_CONFIG.initial.reactorPower),
                controlRodsPosition: this.clamp(s.controlRodsPosition, 0, 100, REACTOR_CONFIG.initial.controlRodsPosition),
                mainPumpSpeed: this.clamp(s.mainPumpSpeed, 0, 100, REACTOR_CONFIG.initial.mainPumpSpeed),
                emergencyCoolingActive: this.toBoolean(s.emergencyCoolingActive, false),
                extraPumpActive: this.toBoolean(s.extraPumpActive, false),
                gridConnected: this.toBoolean(s.gridConnected, true),
                scramActive: this.toBoolean(s.scramActive, false),
                time: this.clamp(s.time, 0, Number.MAX_SAFE_INTEGER, 0)
            },
            completedMissions: Array.isArray(data.completedMissions) ? data.completedMissions : []
        };
    }

    save(simState, completedMissions) {
        try {
            const data = {
                version: SAVE_VERSION,
                savedAt: Date.now(),
                sim: {
                    coreTemperature:        simState.coreTemperature,
                    pressure:               simState.pressure,
                    radiationLevel:         simState.radiationLevel,
                    reactorPower:           simState.reactorPower,
                    controlRodsPosition:    simState.controlRodsPosition,
                    mainPumpSpeed:          simState.mainPumpSpeed,
                    emergencyCoolingActive: simState.emergencyCoolingActive,
                    extraPumpActive:        simState.extraPumpActive,
                    gridConnected:          simState.gridConnected,
                    scramActive:            simState.scramActive,
                    time:                   simState.time
                },
                completedMissions: completedMissions || []
            };
            localStorage.setItem(SAVE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('SaveSystem: could not save:', e);
        }
    }

    load() {
        try {
            const raw = localStorage.getItem(SAVE_KEY);
            if (!raw) return null;
            const data = JSON.parse(raw);
            const validated = this.validate(data);
            if (!validated) {
                this.clear();
                return null;
            }
            return validated;
        } catch (e) {
            console.warn('SaveSystem: could not load:', e);
            return null;
        }
    }

    clear() {
        localStorage.removeItem(SAVE_KEY);
    }
}
