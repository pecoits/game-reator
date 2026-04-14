// ===== REACTOR PHYSICS CONFIG =====
// Central location for all tunable simulation parameters.
export var REACTOR_CONFIG = {
    initial: {
        coreTemperature: 280,
        pressure: 15.5,
        radiationLevel: 0.15,
        reactorPower: 75,
        controlRodsPosition: 50,
        mainPumpSpeed: 65,
        tempInlet: 185,
        tempOutlet: 275,
        coolantFlow: 8200,
        pressurizerLevel: 60,
        energyGeneration: 750,
        voltage: 15.75,
        frequency: 50.0,
        gridLoad: 75
    },
    alarmThresholds: {
        temp:      { warning: 300, danger: 350, critical: 400 },
        pressure:  { warning: 17,  danger: 19,  critical: 22  },
        radiation: { warning: 1.0, danger: 5.0, critical: 20.0 },
        power:     { warning: 90,  danger: 100, critical: 110 }
    },
    gracePeriod: 180000,
    explosionTemp: 550,                // °C — limite físico irreversível (fusão do combustível)
    shiftDuration: 600000,             // ms — duração de um turno completo (10 min tempo real)
    startupMissionDelay: 210000,
    randomEventChance: 0.003,
    physics: {
        powerRodsSmoothFactor: 0.01,
        scramShutdownRate: 0.95,
        coolantFlowBase: 8200,
        heatPerPowerUnit: 3.8,
        coolingCapacityFactor: 290,
        coreHeatFactor: 4.5,
        coreDissipationFactor: 195,
        emergencyCoolingBonus: 150,
        tempPressureBase: 10,
        tempPressureFactor: 0.02,
        pressureSmoothFactor: 0.01,
        radiationBase: 0.12,
        tempRadiationFactor: 0.3,
        powerRadiationFactor: 0.15,
        scramRadiationDecay: 0.9,
        maxEnergyMW: 1000,
        voltageBase: 15.75,
        alertDeduplicateWindow: 5000,
        extraPumpCoolingBoost: 0.3,
        emergencyCoolingFactor: 2.0,
        coolantInletBase: 185,
        coolingOffsetConstant: 0.5,
        pressurizerBase: 50,
        pressurizerFlowDivisor: 200,
        temperatureSmoothFactor: 0.02,
        minCoreTemperature: 20,
        pressureMin: 5,
        pressureMax: 25,
        radiationTempThreshold: 250,
        radiationTempDivisor: 100,
        frequencyJitter: 0.1,
        baseTemperatureOffset: 200,
        frequencyBase: 50.0,
        alertRecentWindow: 30000,
        // Física de fuga acima da temperatura crítica
        voidFeedbackFactor:    0.02,   // potência extra por °C acima do crítico (coef. de vazio positivo)
        coolingBoilingPenalty: 0.7,    // fração de penalidade do resfriamento ao ferver (0=sem penalidade, 1=inútil)
        steamPressureFactor:   3.5,    // MPa adicionais por 100°C acima do crítico (pressão de vapor)
        // Calor residual pós-SCRAM (decay heat)
        decayHeatInitialFraction: 0.07, // calor inicial = 7% da potência no momento do SCRAM
        decayHeatDecayRate:       0.96, // decai ~4% por tick (meia-vida ≈ 17 ticks)
        decayHeatFactor:          2.5   // contribuição de calor por unidade de decayHeat
    }
};
