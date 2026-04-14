import { ReactorSimulation } from './reactor-simulation.js';
import { UIControllerNew } from './ui-controller-new.js';
import { SaveSystem } from './save-system.js';
import { IntroSystem } from './intro-system.js';
import { EventSystem } from './event-system.js';
import { GameOverSystem } from './game-over-system.js';
import { DemandSystem } from './demand-system.js';
import { RankingSystem } from './ranking-system.js';
import { TutorialSystem } from './tutorial-system.js';
import { showGameError, showBootError } from './utils.js';

// Global configurations
// REACTOR_CONFIG is global from config.js, Vite should handle it if loaded.

// ===== MAIN APPLICATION =====
class GameApp {
    constructor() {
        this.simulation = null;
        this.viewport = null;
        this.uiController = null;
        this.eventSystem = null;
        this.introSystem = null;
        this.gameLoop = null;
        this.lastTime = 0;
        this.loadingComplete = false;
        this.saveSystem      = new SaveSystem();
        this.rankingSystem   = new RankingSystem();
        this.gameOverSystem  = null;
        this.demandSystem    = null;
        this.tutorialSystem  = null;
        this.shiftComplete   = false;

        // Call init
        this.init();
    }

    init() {
        console.log('GameApp.init() called');
        // Show language selection and intro FIRST
        this.introSystem = new IntroSystem(this);
    }

    // This is called after the intro is complete
    continueInit() {
        console.log('Starting game initialization...');

        // Show loading screen
        this.showLoadingScreen(() => {
            // Initialize systems
            this.initializeSystems();

            // Hide loading, show game
            this.hideLoadingScreen();

            // Start game loop
            this.startGameLoop();

        });
    }

    showLoadingScreen(callback) {
        var loadingScreen = document.getElementById('loading-screen');
        var progressBar = document.getElementById('loading-progress');
        var loadingText = document.getElementById('loading-text');

        if (!loadingScreen || !progressBar || !loadingText) {
            console.error('Loading elements not found');
            if (callback) callback();
            return;
        }

        // Show loading screen
        loadingScreen.style.display = 'flex';

        var loadingSteps = [
            { progress: 20, text: 'Инициализация систем реактора...' },
            { progress: 40, text: 'Загрузка моделей...' },
            { progress: 60, text: 'Калибровка датчиков...' },
            { progress: 80, text: 'Проверка систем безопасности...' },
            { progress: 100, text: 'Запуск завершен...' }
        ];

        var currentStep = 0;
        var loadingInterval = setInterval(() => {
            if (currentStep < loadingSteps.length) {
                var step = loadingSteps[currentStep];
                progressBar.style.width = step.progress + '%';
                loadingText.textContent = step.text;
                currentStep++;

                // When we reach 100%, wait a bit then callback
                if (step.progress === 100) {
                    clearInterval(loadingInterval);
                    setTimeout(() => {
                        if (callback) callback();
                    }, 500);
                }
            }
        }, 400);
    }

    initializeSystems() {
        try {
            console.log('Initializing simulation...');
            this.simulation = new ReactorSimulation();

            // Restore saved state if available
            const saved = this.saveSystem.load();
            if (saved && saved.sim) {
                const s = saved.sim;
                this.simulation.coreTemperature        = s.coreTemperature;
                this.simulation.pressure               = s.pressure;
                this.simulation.radiationLevel         = s.radiationLevel;
                this.simulation.reactorPower           = s.reactorPower;
                this.simulation.controlRodsPosition    = s.controlRodsPosition;
                this.simulation.mainPumpSpeed          = s.mainPumpSpeed;
                this.simulation.emergencyCoolingActive = s.emergencyCoolingActive;
                this.simulation.extraPumpActive        = s.extraPumpActive;
                this.simulation.gridConnected          = s.gridConnected;
                this.simulation.scramActive            = s.scramActive;
                this.simulation.time                   = s.time;
                
                // Also restore knob/lever positions to UI if available
                if (s.knobRods !== undefined) this.simulation.controlRodsPosition = s.knobRods;
                if (s.knobPump !== undefined) this.simulation.mainPumpSpeed = s.knobPump;
                if (s.leverCool !== undefined) this.simulation.emergencyCoolingActive = s.leverCool;
                if (s.leverExtra !== undefined) this.simulation.extraPumpActive = s.leverExtra;
                if (s.gridConnected !== undefined) this.simulation.gridConnected = s.gridConnected;
                
                this.simulation.addEvent('info', 'Состояние восстановлено из архива.');
            }

            console.log('Initializing UI controller...');
            this.uiController = new UIControllerNew(this.simulation);

            console.log('Initializing event system...');
            this.eventSystem = new EventSystem(this.simulation);
            this.gameOverSystem = new GameOverSystem(this.simulation, this.saveSystem, this.rankingSystem);

            // Ranking button
            var btnRanking = document.getElementById('btn-ranking');
            if (btnRanking) btnRanking.addEventListener('click', () => this.showRanking());
            var btnRankingClose = document.getElementById('btn-ranking-close');
            if (btnRankingClose) btnRankingClose.addEventListener('click', function() {
                var overlay = document.getElementById('ranking-overlay');
                if (overlay) overlay.style.display = 'none';
            });
            this.demandSystem   = new DemandSystem(this.simulation);
            this.demandSystem.onShowTelex = (stage, text, quota, count) => {
                this.gameOverSystem.showTelex(stage, text, quota, count);
            };
            this.demandSystem.onGameOver = (stats) => {
                this.gameOverSystem.triggerDismissal(stats);
            };

            console.log('Starting simulation...');
            this.simulation.start();

            // Tutorial na primeira sessão
            this.tutorialSystem = new TutorialSystem(this.simulation);
            this.tutorialSystem.show();

            // Botão de replay do tutorial
            var btnTutorialReplay = document.getElementById('btn-tutorial-replay');
            if (btnTutorialReplay) {
                btnTutorialReplay.addEventListener('click', () => {
                    localStorage.removeItem('game_reator_tutorial_done');
                    this.tutorialSystem.show();
                });
            }

            console.log('All systems initialized successfully');
        } catch (error) {
            console.error('Error initializing systems:', error);
            showGameError('Ошибка инициализации: ' + error.message);
        }
    }

    hideLoadingScreen() {
        var loadingScreen = document.getElementById('loading-screen');
        var gameContainer = document.getElementById('game-container');

        if (!loadingScreen || !gameContainer) {
            console.error('Game elements not found');
            return;
        }

        loadingScreen.style.display = 'none';
        gameContainer.style.display = 'flex';

        console.log('Game started!');
    }

    startGameLoop() {
        const tickRate = 1000;
        this.lastTime = performance.now();
        const loop = currentTime => {
            const delta = currentTime - this.lastTime;
            if (delta >= tickRate) {
                if (this.simulation && this.simulation.running) this.simulation.tick(delta);
                if (this.eventSystem) this.eventSystem.update(delta);
                if (this.gameOverSystem) this.gameOverSystem.update();
                if (this.demandSystem)   this.demandSystem.update(delta);

                // Verificação de turno completo
                if (!this.shiftComplete && this.gameOverSystem && !this.gameOverSystem.triggered &&
                    this.simulation && this.simulation.time >= REACTOR_CONFIG.shiftDuration) {
                    this._triggerShiftComplete();
                }
                // Auto-save every 10 ticks
                if (this.simulation && this.simulation.ticks > 0 && this.simulation.ticks % 10 === 0 && this.saveSystem) {
                    const completedMissions = this.eventSystem
                        ? this.eventSystem.missions
                            .filter(m => m.completed)
                            .map(m => m.id)
                        : [];
                    
                    // Save simulation state plus UI state
                    const simState = this.simulation.getState();
                    simState.knobRods = this.simulation.controlRodsPosition;
                    simState.knobPump = this.simulation.mainPumpSpeed;
                    simState.leverCool = this.simulation.emergencyCoolingActive;
                    simState.leverExtra = this.simulation.extraPumpActive;
                    
                    this.saveSystem.save(simState, completedMissions);
                }
                this.lastTime = currentTime;
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    _triggerShiftComplete() {
        this.shiftComplete = true;
        this.simulation.stop();
        this.saveSystem.clear();
        if (this.uiController && this.uiController.soundSystem) {
            this.uiController.soundSystem.playSuccess();
        }

        const timeMs        = this.simulation.time;
        const timeFormatted = this._formatTime(timeMs);
        const energyMWh     = Math.round(this.simulation.totalEnergyMWh);
        const totalAlerts   = this.simulation.totalAlerts;

        if (this.rankingSystem) {
            this.rankingSystem.record({
                date: Date.now(), outcome: 'shift',
                timeMs, timeFormatted, energyMWh, totalAlerts,
                cause: 'Turno concluído'
            });
        }

        const screen = document.getElementById('gameover-shift');
        if (!screen) return;
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        set('shift-time',      timeFormatted);
        set('shift-energy',    energyMWh + ' MWh');
        set('shift-incidents', totalAlerts);
        screen.style.display = 'flex';
    }

    _formatTime(ms) {
        const s = Math.floor((ms || 0) / 1000);
        return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    }

    showRanking() {
        const entries = this.rankingSystem.load();
        const listEl  = document.getElementById('ranking-list');
        if (!listEl) return;

        if (entries.length === 0) {
            listEl.innerHTML = '<p class="ranking-empty">Нет данных — Nenhuma partida registrada.</p>';
        } else {
            // Destacar melhor desempenho (maior energia gerada)
            let bestIdx = -1;
            let bestEnergy = -1;
            entries.forEach(function(e, i) {
                if (typeof e.energyMWh === 'number' && e.energyMWh > bestEnergy) {
                    bestEnergy = e.energyMWh;
                    bestIdx = i;
                }
            });

            listEl.innerHTML = entries.map(function(e, i) {
                const outcomeClass = e.outcome === 'explosion' ? 'rank-stamp-explosion' :
                                     e.outcome === 'shift'     ? 'rank-stamp-shift'     : 'rank-stamp-dismissal';
                const outcomeText  = e.outcome === 'explosion' ? 'ВЗРЫВ' :
                                     e.outcome === 'shift'     ? 'СМЕНА' : 'УВОЛЕН';
                const detail = e.outcome === 'explosion'
                    ? (e.cause || '—')
                    : e.outcome === 'shift'
                        ? (e.energyMWh + ' MWh | ' + e.totalAlerts + ' inc.')
                        : (e.blackouts + ' apagões | cota ' + (e.quota || '—') + ' MW');
                const dateStr = new Date(e.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
                const energy  = typeof e.energyMWh === 'number' ? e.energyMWh + ' MWh' : '—';
                const isBest  = i === bestIdx && bestEnergy > 0;
                return '<div class="rank-entry' + (isBest ? ' rank-best' : '') + '">' +
                    '<span class="rank-num">' + (isBest ? '★' : '#' + (i + 1)) + '</span>' +
                    '<span class="rank-date">' + dateStr + '</span>' +
                    '<span class="rank-svc">' + (e.timeFormatted || '00:00') + '</span>' +
                    '<span class="rank-stamp ' + outcomeClass + '">' + outcomeText + '</span>' +
                    '<span class="rank-energy">' + energy + '</span>' +
                    '<span class="rank-detail">' + detail + '</span>' +
                    '</div>';
            }).join('');
        }

        const overlay = document.getElementById('ranking-overlay');
        if (overlay) overlay.style.display = 'flex';
    }
}

// Start the game
try {
    console.log('Main module execution started');
    console.log('Checking dependencies:');
    console.log('- SaveSystem:', typeof SaveSystem);
    console.log('- ReactorSimulation:', typeof ReactorSimulation);
    console.log('- IntroSystem:', typeof IntroSystem);

    window.game = new GameApp();
    window.GameApp = GameApp;
    console.log('GameApp instance created and exported to window.game');
} catch (error) {
    console.error('CRITICAL: Failed to start game from main module:', error);
    console.error(error.stack);
    showBootError('Ошибка запуска: ' + error.message);
}
