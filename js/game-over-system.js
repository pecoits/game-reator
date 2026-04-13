// ===== GAME OVER SYSTEM =====
// Gerencia as telas de fim de jogo: explosão (parâmetros críticos) e demissão misteriosa.
class GameOverSystem {
    constructor(simulation, saveSystem, rankingSystem) {
        this.simulation    = simulation;
        this.saveSystem    = saveSystem;
        this.rankingSystem = rankingSystem;
        this.triggered     = false;
    }

    // Chamado a cada tick pelo game loop
    update() {
        if (this.triggered) return;
        if (!this.simulation || !this.simulation.running) return;

        const cfg = REACTOR_CONFIG.alarmThresholds;
        const temp  = this.simulation.coreTemperature;
        const pres  = this.simulation.pressure;
        const rad   = this.simulation.radiationLevel;

        let cause = null;
        if (temp >= cfg.temp.critical) {
            cause = {
                ru:    'КРИТИЧЕСКАЯ ТЕМПЕРАТУРА',
                pt:    'Temperatura do núcleo atingiu nível crítico',
                param: 'ТЕМПЕРАТУРА АКТИВНОЙ ЗОНЫ',
                value: temp.toFixed(1) + ' °C'
            };
        } else if (pres >= cfg.pressure.critical) {
            cause = {
                ru:    'КРИТИЧЕСКОЕ ДАВЛЕНИЕ',
                pt:    'Pressão do sistema atingiu nível crítico',
                param: 'ДАВЛЕНИЕ ПЕРВОГО КОНТУРА',
                value: pres.toFixed(2) + ' МПа'
            };
        } else if (rad >= cfg.radiation.critical) {
            cause = {
                ru:    'КРИТИЧЕСКИЙ УРОВЕНЬ РАДИАЦИИ',
                pt:    'Nível de radiação atingiu patamar crítico',
                param: 'РАДИАЦИОННЫЙ ФОН',
                value: rad.toFixed(2) + ' мЗв/ч'
            };
        }

        if (!cause) return;

        this.triggered = true;
        this.simulation.stop();
        this.saveSystem.clear();

        const timeMs = this.simulation.time;
        const data = {
            cause,
            temp:       temp.toFixed(1),
            pressure:   pres.toFixed(2),
            radiation:  rad.toFixed(2),
            time:       this._formatTime(timeMs),
            energyMWh:  this.simulation.totalEnergyMWh,
            totalAlerts: this.simulation.totalAlerts
        };

        if (this.rankingSystem) {
            this.rankingSystem.record({
                date:          Date.now(),
                outcome:       'explosion',
                timeMs,
                timeFormatted: data.time,
                energyMWh:     Math.round(this.simulation.totalEnergyMWh),
                totalAlerts:   this.simulation.totalAlerts,
                cause:         cause.ru
            });
        }

        this._showExplosionScreen(data);
    }

    // Chamado pelo DemandSystem após atingir stage 3
    triggerDismissal(stats) {
        if (this.triggered) return;
        this.triggered = true;
        this.saveSystem.clear();

        const timeMs     = this.simulation ? this.simulation.time : (stats.time || 0);
        const energyMWh  = this.simulation ? this.simulation.totalEnergyMWh : 0;
        const totalAlerts = this.simulation ? this.simulation.totalAlerts : 0;
        const timeFormatted = this._formatTime(timeMs);

        if (this.rankingSystem) {
            this.rankingSystem.record({
                date:          Date.now(),
                outcome:       'dismissal',
                timeMs,
                timeFormatted,
                energyMWh:     Math.round(energyMWh),
                totalAlerts,
                blackouts:     stats.blackouts,
                quota:         stats.quota
            });
        }

        this._showDismissalScreen(Object.assign({}, stats, {
            timeFormatted,
            energyMWh,
            totalAlerts
        }));
    }

    // Exibe o telex burocrático e pausa o jogo
    showTelex(stage, eventText, quota, blackoutCount) {
        this.simulation.running = false;

        const modal    = document.getElementById('telex-modal');
        const bodyEl   = document.getElementById('telex-body');
        const quotaEl  = document.getElementById('telex-quota');
        const refEl    = document.getElementById('telex-ref');
        const okBtn    = document.getElementById('btn-telex-ok');

        if (!modal) return;

        // Número de referência dinâmico
        const refNum = String(stage).padStart(4, '0');
        if (refEl) refEl.textContent = `Ref: ${refNum}-Б | KJNP-1`;

        if (stage === 0) {
            // Evento de aumento de demanda
            if (bodyEl) bodyEl.textContent =
                `Tovarisch operador,\n\nInformamos que a produção industrial da região de Krasnostan foi ampliada.\n\n${eventText || ''}\n\nA cota de fornecimento de energia foi reajustada com efeito imediato.`;
        } else if (stage === 1) {
            if (bodyEl) bodyEl.textContent =
                'Tovarisch operador,\n\nRegistramos deficiência na geração de energia. O fornecimento à rede está abaixo da cota estabelecida.\n\nExigimos normalização IMEDIATA da produção.';
        } else if (stage === 2) {
            if (bodyEl) bodyEl.textContent =
                'Tovarisch operador,\n\nApagão registrado em Krasnostan. A situação é INACEITÁVEL para os planos de produção socialista.\n\nUm relatório foi encaminhado ao Partido. Última advertência.';
        }

        if (quotaEl) quotaEl.textContent = `Cota atual: ${quota} MW | Apagões: ${blackoutCount}`;

        modal.style.display = 'flex';

        if (okBtn) {
            okBtn.onclick = () => {
                modal.style.display = 'none';
                this.simulation.running = true;
            };
        }
    }

    // MM:SS
    _formatTime(ms) {
        const totalSec = Math.floor((ms || 0) / 1000);
        const minutes  = Math.floor(totalSec / 60);
        const seconds  = totalSec % 60;
        return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    }

    _showExplosionScreen(data) {
        const screen = document.getElementById('gameover-explosion');
        if (!screen) return;

        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };

        set('exp-cause-ru',  data.cause.ru);
        set('exp-cause-pt',  data.cause.pt);
        set('exp-param',     data.cause.param + ': ' + data.cause.value);
        set('exp-temp',      data.temp + ' °C');
        set('exp-pressure',  data.pressure + ' МПа');
        set('exp-radiation', data.radiation + ' мЗв/ч');
        set('exp-time',      data.time);
        set('exp-energy',    Math.round(data.energyMWh) + ' MWh');
        set('exp-incidents', String(data.totalAlerts));

        screen.style.display = 'flex';
    }

    _showDismissalScreen(stats) {
        const screen = document.getElementById('gameover-dismissal');
        if (!screen) return;

        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };

        set('dis-time',      stats.timeFormatted);
        set('dis-blackouts', stats.blackouts);
        set('dis-quota',     stats.quota + ' MW');
        set('dis-deficit',   (stats.quota - stats.energy) + ' MW');
        set('dis-energy',    Math.round(stats.energyMWh) + ' MWh');
        set('dis-incidents', String(stats.totalAlerts));

        screen.style.display = 'flex';
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameOverSystem;
}
