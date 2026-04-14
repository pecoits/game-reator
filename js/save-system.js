// ===== SAVE SYSTEM =====
const SAVE_PREFIX = 'game_reator_save_';
const SAVE_VERSION = 1;

export class SaveSystem {
    constructor() {
        this.currentSlot = 1;
    }

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
                coreTemperature: this.clamp(s.coreTemperature, 20, 1000, 280),
                pressure: this.clamp(s.pressure, 0, 25, 6.9),
                radiationLevel: this.clamp(s.radiationLevel, 0, 100, 0.15),
                reactorPower: this.clamp(s.reactorPower, 0, 150, 100),
                controlRodsPosition: this.clamp(s.controlRodsPosition, 0, 100, 50),
                mainPumpSpeed: this.clamp(s.mainPumpSpeed, 0, 100, 70),
                emergencyCoolingActive: this.toBoolean(s.emergencyCoolingActive, false),
                extraPumpActive: this.toBoolean(s.extraPumpActive, false),
                gridConnected: this.toBoolean(s.gridConnected, true),
                scramActive: this.toBoolean(s.scramActive, false),
                time: this.clamp(s.time, 0, Number.MAX_SAFE_INTEGER, 0),
                totalEnergyMWh: s.totalEnergyMWh || 0
            },
            completedMissions: Array.isArray(data.completedMissions) ? data.completedMissions : []
        };
    }

    save(simState, completedMissions, slot = null) {
        const slotToUse = slot || this.currentSlot;
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
                    time:                   simState.time,
                    totalEnergyMWh:         simState.totalEnergyMWh
                },
                completedMissions: completedMissions || []
            };
            localStorage.setItem(SAVE_PREFIX + slotToUse, JSON.stringify(data));
        } catch (e) {
            console.warn('SaveSystem: could not save to slot ' + slotToUse + ':', e);
        }
    }

    load(slot = null) {
        const slotToUse = slot || this.currentSlot;
        try {
            const raw = localStorage.getItem(SAVE_PREFIX + slotToUse);
            if (!raw) return null;
            const data = JSON.parse(raw);
            const validated = this.validate(data);
            if (!validated) {
                this.clear(slotToUse);
                return null;
            }
            return validated;
        } catch (e) {
            console.warn('SaveSystem: could not load from slot ' + slotToUse + ':', e);
            return null;
        }
    }

    clear(slot = null) {
        const slotToUse = slot || this.currentSlot;
        localStorage.removeItem(SAVE_PREFIX + slotToUse);
    }

    getSlotsInfo() {
        const slots = [];
        for (let i = 1; i <= 3; i++) {
            const data = this.load(i);
            slots.push({
                id: i,
                empty: !data,
                date: data ? data.savedAt : null,
                energy: data ? Math.round(data.sim.totalEnergyMWh || 0) : 0,
                time: data ? data.sim.time : 0
            });
        }
        return slots;
    }

    setSlot(slot) {
        this.currentSlot = slot;
    }
}
