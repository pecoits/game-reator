// ===== DEMAND SYSTEM =====
import { REACTOR_CONFIG } from './config.js';

// Gerencia a cota de energia exigida pelo Partido e escala avisos burocráticos.
export class DemandSystem {
    constructor(simulation) {
        this.simulation = simulation;

        this.currentQuota   = 300; // MW
        this.demandEvents   = [
            { id: 'factory', text: 'Nova fábrica em Krasnogorsk',       delta: 120 },
            { id: 'mine',    text: 'Nova mina de urânio de Volgosk',     delta: 80  },
            { id: 'city',    text: 'Nova cidade satélite de Krasnovosk', delta: 150 }
        ];
        this.firedEventIds  = [];
        this.lastDemandTime = 0;

        // Escalonamento de avisos
        this.deficiencyStart = null; // sim.time quando energia caiu abaixo da cota
        this.warningStage    = 0;    // 0=ok 1=telex1 2=telex2 3=gameover
        this.blackoutCount   = 0;

        // Callbacks definidos externamente
        this.onShowTelex = null; // fn(stage, eventText|null, quota, blackoutCount)
        this.onGameOver  = null; // fn({ time, quota, energy, blackouts })
    }

    // Chamado a cada tick pelo game loop
    update(deltaTime) {
        if (!this.simulation.running)      return;
        if (!this.simulation.eventsEnabled) return;
        this._tryDemandEvent();
        this._checkDeficiency();
    }

    getQuota() { return this.currentQuota; }

    _tryDemandEvent() {
        if (this.warningStage > 0)                              return; // aviso ativo
        if (this.firedEventIds.length >= this.demandEvents.length) return; // todos disparados
        if (this.simulation.time - this.lastDemandTime < 180000)   return; // cooldown 3 min
        if (Math.random() > 0.003)                              return; // ~1 a cada 5 min

        const next = this.demandEvents.find(function(e) {
            return !this.firedEventIds.includes(e.id);
        }, this);
        if (!next) return;

        this.firedEventIds.push(next.id);
        this.currentQuota  += next.delta;
        this.lastDemandTime = this.simulation.time;

        if (this.onShowTelex) {
            this.onShowTelex(0, next.text, this.currentQuota, this.blackoutCount);
        }
    }

    _checkDeficiency() {
        const energy = this.simulation.energyGeneration;
        const now    = this.simulation.time;

        if (energy >= this.currentQuota) {
            // Stage 2+ is point of no return: visit already organized, recovery doesn't help
            if (this.warningStage < 2) {
                this.deficiencyStart = null;
                this.warningStage    = 0;
            }
            return;
        }

        if (this.deficiencyStart === null) {
            this.deficiencyStart = now;
        }

        const elapsed = now - this.deficiencyStart;

        if (this.warningStage === 0 && elapsed >= 30000) {
            this.warningStage = 1;
            if (this.onShowTelex) {
                this.onShowTelex(1, null, this.currentQuota, this.blackoutCount);
            }
        } else if (this.warningStage === 1 && elapsed >= 150000) {
            this.warningStage = 2;
            this.blackoutCount++;
            if (this.onShowTelex) {
                this.onShowTelex(2, null, this.currentQuota, this.blackoutCount);
            }
        } else if (this.warningStage === 2 && elapsed >= 240000) {
            this.warningStage = 3;
            if (this.onGameOver) {
                this.onGameOver({
                    time:     this.simulation.time,
                    quota:    this.currentQuota,
                    energy:   Math.round(energy),
                    blackouts: this.blackoutCount
                });
            }
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DemandSystem;
}
