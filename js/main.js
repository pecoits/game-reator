// ===== MAIN APPLICATION =====
var GameApp = (function() {
    function GameApp() {
        this.simulation = null;
        this.viewport = null;
        this.uiController = null;
        this.eventSystem = null;
        this.introSystem = null;
        this.gameLoop = null;
        this.lastTime = 0;
        this.loadingComplete = false;
        
        // Call init
        this.init();
    }

    GameApp.prototype.init = function() {
        console.log('GameApp.init() called');
        // Show language selection and intro FIRST
        this.introSystem = new IntroSystem(this);
    };

    // This is called after the intro is complete
    GameApp.prototype.continueInit = function() {
        var self = this;
        console.log('Starting game initialization...');
        
        // Show loading screen
        this.showLoadingScreen(function() {
            // Initialize systems
            self.initializeSystems();
            
            // Hide loading, show game
            self.hideLoadingScreen();
            
            // Start game loop
            self.startGameLoop();
            
            // Start first mission after delay
            setTimeout(function() {
                if (self.eventSystem) {
                    self.eventSystem.startMission('startup');
                }
            }, 5000);
        });
    };

    GameApp.prototype.showLoadingScreen = function(callback) {
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
        var loadingInterval = setInterval(function() {
            if (currentStep < loadingSteps.length) {
                var step = loadingSteps[currentStep];
                progressBar.style.width = step.progress + '%';
                loadingText.textContent = step.text;
                currentStep++;
                
                // When we reach 100%, wait a bit then callback
                if (step.progress === 100) {
                    clearInterval(loadingInterval);
                    setTimeout(function() {
                        if (callback) callback();
                    }, 500);
                }
            }
        }, 400);
    };

    GameApp.prototype.initializeSystems = function() {
        try {
            console.log('Initializing simulation...');
            this.simulation = new ReactorSimulation();
            
            console.log('Initializing viewport...');
            this.viewport = new ReactorViewport('reactor-viewport');
            
            console.log('Initializing UI controller...');
            this.uiController = new UIController(this.simulation, this.viewport);
            
            console.log('Initializing event system...');
            this.eventSystem = new EventSystem(this.simulation);
            
            console.log('Starting simulation...');
            this.simulation.start();
            
            console.log('All systems initialized successfully');
        } catch (error) {
            console.error('Error initializing systems:', error);
            showGameError('Ошибка инициализации: ' + error.message);
        }
    };

    GameApp.prototype.hideLoadingScreen = function() {
        var loadingScreen = document.getElementById('loading-screen');
        var gameContainer = document.getElementById('game-container');
        
        if (!loadingScreen || !gameContainer) {
            console.error('Game elements not found');
            return;
        }
        
        loadingScreen.style.display = 'none';
        gameContainer.style.display = 'flex';
        
        console.log('Game started!');
    };

    GameApp.prototype.startGameLoop = function() {
        var self = this;
        var tickRate = 1000; // 1 second ticks
        this.lastTime = performance.now();
        
        var gameLoop = function(currentTime) {
            var deltaTime = currentTime - self.lastTime;
            
            if (deltaTime >= tickRate) {
                // Update simulation
                if (self.simulation && self.simulation.running) {
                    self.simulation.tick(deltaTime);
                }
                
                // Update event system
                if (self.eventSystem) {
                    self.eventSystem.update(deltaTime);
                }
                
                self.lastTime = currentTime;
            }
            
            requestAnimationFrame(gameLoop);
        };
        
        requestAnimationFrame(gameLoop);
    };

    return GameApp;
})();

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
