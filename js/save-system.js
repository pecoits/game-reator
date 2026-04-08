// ===== SAVE SYSTEM =====
const SAVE_KEY = 'game_reator_save';
const SAVE_VERSION = 1;

class SaveSystem {
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
            if (data.version !== SAVE_VERSION) { this.clear(); return null; }
            return data;
        } catch (e) {
            console.warn('SaveSystem: could not load:', e);
            return null;
        }
    }

    clear() {
        localStorage.removeItem(SAVE_KEY);
    }
}
