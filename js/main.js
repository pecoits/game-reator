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
        this.saveSystem     = new SaveSystem();
        this.rankingSystem  = new RankingSystem();
        this.gameOverSystem = null;
        this.demandSystem   = null;

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
                // Auto-save every 10 ticks
                if (this.simulation.ticks > 0 && this.simulation.ticks % 10 === 0 && this.saveSystem) {
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

    showRanking() {
        const entries = this.rankingSystem.load();
        const listEl  = document.getElementById('ranking-list');
        if (!listEl) return;

        if (entries.length === 0) {
            listEl.innerHTML = '<p class="ranking-empty">Нет данных — Nenhuma partida registrada.</p>';
        } else {
            listEl.innerHTML = entries.map(function(e, i) {
                const outcomeClass = e.outcome === 'explosion' ? 'rank-stamp-explosion' : 'rank-stamp-dismissal';
                const outcomeText  = e.outcome === 'explosion'  ? 'ВЗРЫВ' : 'УВОЛЕН';
                const detail = e.outcome === 'explosion'
                    ? (e.cause || '—')
                    : (e.blackouts + ' apagões | cota ' + (e.quota || '—') + ' MW');
                const dateStr = new Date(e.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
                const energy  = typeof e.energyMWh === 'number' ? e.energyMWh + ' MWh' : '—';
                return '<div class="rank-entry">' +
                    '<span class="rank-num">#' + (i + 1) + '</span>' +
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

function showGameError(message) {
    var modal = document.getElementById('error-modal');
    var msgEl = document.getElementById('error-modal-message');
    var closeBtn = document.getElementById('btn-close-error');
    if (!modal) { console.error(message); return; }
    msgEl.textContent = message;
    modal.style.display = 'flex';
    closeBtn.onclick = function() { modal.style.display = 'none'; };
}

function showBootError(message) {
    var modal = document.getElementById('boot-error-modal');
    var msgEl = document.getElementById('boot-error-message');
    if (!modal) { console.error(message); return; }
    msgEl.textContent = message;
    modal.style.display = 'flex';
    var loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.style.display = 'none';
}

function showGameConfirm(title, message, onYes) {
    var modal = document.getElementById('confirm-modal');
    var titleEl = document.getElementById('confirm-modal-title');
    var msgEl = document.getElementById('confirm-modal-message');
    var yesBtn = document.getElementById('btn-confirm-yes');
    var noBtn = document.getElementById('btn-confirm-no');
    if (!modal) { if (confirm(message)) onYes(); return; }
    titleEl.textContent = title;
    msgEl.textContent = message;
    modal.style.display = 'flex';
    yesBtn.onclick = function() { modal.style.display = 'none'; onYes(); };
    noBtn.onclick  = function() { modal.style.display = 'none'; };
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting game...');
    console.log('IntroSystem available:', typeof IntroSystem !== 'undefined');
    console.log('ReactorSimulation available:', typeof ReactorSimulation !== 'undefined');

    try {
        window.game = new GameApp();
        console.log('GameApp initialized successfully');
    } catch (error) {
        console.error('Failed to start game:', error);
        console.error(error.stack);
        showBootError('Ошибка запуска: ' + error.message);
    }
});
