// ===== UI CONTROLLER =====
var UIController = (function() {
    function UIController(simulation, viewport) {
        this.simulation = simulation;
        this.viewport = viewport;
        this.soundSystem = new SoundSystem();
        this.hasCriticalAlarm = false;
        this.lastWarningSound = 0;
        this.warningSoundCooldown = 3000; // 3 seconds between warning beeps
        
        this.elements = {};
        this.currentTab = 'main';
        
        this.init();
    }

    UIController.prototype.init = function() {
        var self = this;
        this.cacheElements();
        this.setupEventListeners();
        
        this.simulation.onUpdate = function(state) { self.updateUI(state); };
        this.simulation.onAlert = function(alert) { self.handleAlert(alert); };
        this.simulation.onEvent = function(event) { self.addLogEntry(event); };
    };

    UIController.prototype.cacheElements = function() {
        this.elements.tempCore = document.getElementById('temp-core');
        this.elements.pressure = document.getElementById('pressure');
        this.elements.radiation = document.getElementById('radiation');
        this.elements.powerOutput = document.getElementById('power-output');
        this.elements.tempBar = document.getElementById('temp-bar');
        this.elements.pressureBar = document.getElementById('pressure-bar');
        this.elements.radiationBar = document.getElementById('radiation-bar');
        this.elements.powerBar = document.getElementById('power-bar');
        this.elements.controlRods = document.getElementById('control-rods');
        this.elements.rodsValue = document.getElementById('rods-value');
        this.elements.mainPump = document.getElementById('main-pump');
        this.elements.pumpValue = document.getElementById('pump-value');
        this.elements.tempInlet = document.getElementById('temp-inlet');
        this.elements.tempOutlet = document.getElementById('temp-outlet');
        this.elements.coolantFlow = document.getElementById('coolant-flow');
        this.elements.pressurizerLevel = document.getElementById('pressurizer-level');
        this.elements.energyGen = document.getElementById('energy-gen');
        this.elements.voltage = document.getElementById('voltage');
        this.elements.frequency = document.getElementById('frequency');
        this.elements.gridLoad = document.getElementById('grid-load');
        this.elements.reactorStatus = document.getElementById('reactor-status');
        this.elements.alertsBtn = document.getElementById('btn-alerts');
        this.elements.btnMute = document.getElementById('btn-mute');
        this.elements.volumeSlider = document.getElementById('volume-slider');
        this.elements.logEntries = document.getElementById('log-entries');
        this.elements.btnManual = document.getElementById('btn-manual');
        this.elements.btnEmergencyCool = document.getElementById('btn-emergency-cool');
        this.elements.btnExtraPump = document.getElementById('btn-extra-pump');
        this.elements.btnGridConnect = document.getElementById('btn-grid-connect');
        this.elements.btnScram = document.getElementById('btn-scram');
        this.elements.btnClearLog = document.getElementById('btn-clear-log');
        this.elements.btnCloseManual = document.getElementById('btn-close-manual');
        this.elements.btnCloseAlerts = document.getElementById('btn-close-alerts');
        this.elements.manualModal = document.getElementById('manual-modal');
        this.elements.alertModal = document.getElementById('alert-modal');
        this.elements.manualContent = document.getElementById('manual-content');
        this.elements.alertEntries = document.getElementById('alert-entries');
        this.elements.tabButtons = document.querySelectorAll('.tab-btn');
        this.elements.tabContents = document.querySelectorAll('.tab-content');
    };

    UIController.prototype.setupEventListeners = function() {
        var self = this;
        
        // Initialize sound system on first user interaction
        var initSound = function() {
            self.soundSystem.init();
            document.removeEventListener('click', initSound);
        };
        document.addEventListener('click', initSound);
        
        // Sound controls
        this.elements.btnMute.addEventListener('click', function() {
            var muted = self.soundSystem.toggleMute();
            self.elements.btnMute.textContent = muted ? '🔇' : '🔊';
            self.elements.btnMute.classList.toggle('muted', muted);
        });
        
        this.elements.volumeSlider.addEventListener('input', function(e) {
            var vol = parseInt(e.target.value) / 100;
            self.soundSystem.setVolume(vol);
            if (vol === 0) {
                self.elements.btnMute.textContent = '🔇';
                self.elements.btnMute.classList.add('muted');
            } else {
                self.elements.btnMute.textContent = '🔊';
                self.elements.btnMute.classList.remove('muted');
            }
        });
        
        // Control rods
        this.elements.controlRods.addEventListener('input', function(e) {
            var value = parseInt(e.target.value);
            self.elements.rodsValue.textContent = value + '%';
            self.simulation.setControlRods(value);
            self.viewport.updateControlRodsVisual(value);
        });
        
        // Main pump
        this.elements.mainPump.addEventListener('input', function(e) {
            var value = parseInt(e.target.value);
            self.elements.pumpValue.textContent = value + '%';
            self.simulation.setMainPump(value);
        });
        
        // Emergency cooling
        this.elements.btnEmergencyCool.addEventListener('click', function() {
            self.simulation.toggleEmergencyCooling();
            self.elements.btnEmergencyCool.textContent = 
                self.simulation.emergencyCoolingActive ? 'ДЕАКТИВИРОВАТЬ' : 'АКТИВИРОВАТЬ';
            self.elements.btnEmergencyCool.classList.toggle('btn-danger');
        });
        
        // Extra pump
        this.elements.btnExtraPump.addEventListener('click', function() {
            self.simulation.toggleExtraPump();
            self.elements.btnExtraPump.textContent = 
                self.simulation.extraPumpActive ? 'ВЫКЛ' : 'ВКЛ';
        });
        
        // Grid connection
        this.elements.btnGridConnect.addEventListener('click', function() {
            self.simulation.toggleGridConnection();
            self.elements.btnGridConnect.textContent = 
                self.simulation.gridConnected ? 'ПОДКЛЮЧЕНО' : 'ОТКЛЮЧЕНО';
            self.elements.btnGridConnect.classList.toggle('btn-success');
        });
        
        // SCRAM
        this.elements.btnScram.addEventListener('click', function() {
            if (!self.simulation.scramActive) {
                if (confirm('АКТИВИРОВАТЬ АЗ-5? Это приведет к аварийной остановке реактора.')) {
                    self.simulation.activateSCRAM();
                }
            } else {
                self.simulation.resetSCRAM();
                self.elements.btnScram.textContent = 'АЗ-5';
            }
        });
        
        // Clear log
        this.elements.btnClearLog.addEventListener('click', function() {
            self.simulation.clearEvents();
            self.elements.logEntries.innerHTML = '';
        });
        
        // Manual modal - uses selected language
        this.elements.btnManual.addEventListener('click', function() {
            var lang = window.selectedLanguage || 'en';
            if (lang === 'pt' && typeof manualContentPT !== 'undefined') {
                self.elements.manualContent.innerHTML = manualContentPT;
            } else {
                self.elements.manualContent.innerHTML = manualContentHTML;
            }
            self.elements.manualModal.style.display = 'flex';
        });
        
        this.elements.btnCloseManual.addEventListener('click', function() {
            self.elements.manualModal.style.display = 'none';
        });
        
        // Alert modal
        this.elements.btnAlerts.addEventListener('click', function() {
            self.showAlerts();
        });
        
        this.elements.btnCloseAlerts.addEventListener('click', function() {
            self.elements.alertModal.style.display = 'none';
        });
        
        // Tabs
        this.elements.tabButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var tab = btn.getAttribute('data-tab');
                self.switchTab(tab);
            });
        });
        
        // Close modals on outside click
        window.addEventListener('click', function(e) {
            if (e.target === self.elements.manualModal) {
                self.elements.manualModal.style.display = 'none';
            }
            if (e.target === self.elements.alertModal) {
                self.elements.alertModal.style.display = 'none';
            }
        });
    };

    UIController.prototype.switchTab = function(tabName) {
        var self = this;
        this.currentTab = tabName;
        
        this.elements.tabButtons.forEach(function(btn) {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
        });
        
        this.elements.tabContents.forEach(function(content) {
            content.classList.toggle('active', content.id === 'tab-' + tabName);
        });
    };

    UIController.prototype.updateUI = function(state) {
        // Main indicators
        this.elements.tempCore.textContent = state.coreTemperature.toFixed(1) + '°C';
        this.elements.pressure.textContent = state.pressure.toFixed(2) + ' МПа';
        this.elements.radiation.textContent = state.radiationLevel.toFixed(3) + ' мЗв/ч';
        this.elements.powerOutput.textContent = state.reactorPower.toFixed(1) + '%';
        
        // Indicator bars
        var tempPercent = Math.min(100, (state.coreTemperature / 400) * 100);
        this.elements.tempBar.style.width = tempPercent + '%';
        this.updateBarColor(this.elements.tempBar, tempPercent);
        
        var pressurePercent = Math.min(100, (state.pressure / 25) * 100);
        this.elements.pressureBar.style.width = pressurePercent + '%';
        this.updateBarColor(this.elements.pressureBar, pressurePercent);
        
        var radiationPercent = Math.min(100, (state.radiationLevel / 10) * 100);
        this.elements.radiationBar.style.width = radiationPercent + '%';
        this.updateBarColor(this.elements.radiationBar, radiationPercent);
        
        var powerPercent = Math.min(100, state.reactorPower);
        this.elements.powerBar.style.width = powerPercent + '%';
        this.updateBarColor(this.elements.powerBar, powerPercent);
        
        // Cooling indicators
        this.elements.tempInlet.textContent = state.tempInlet.toFixed(1) + '°C';
        this.elements.tempOutlet.textContent = state.tempOutlet.toFixed(1) + '°C';
        this.elements.coolantFlow.textContent = state.coolantFlow.toFixed(0) + ' м³/ч';
        this.elements.pressurizerLevel.textContent = state.pressurizerLevel.toFixed(1) + '%';
        
        // Power indicators
        this.elements.energyGen.textContent = state.energyGeneration.toFixed(1) + ' МВт';
        this.elements.voltage.textContent = state.voltage.toFixed(2) + ' кВ';
        this.elements.frequency.textContent = state.frequency.toFixed(2) + ' Гц';
        this.elements.gridLoad.textContent = state.gridLoad.toFixed(1) + '%';
        
        // Status indicator
        this.updateStatusIndicator(state);
        
        // Alerts count
        var alertCount = this.simulation.getAlertCount();
        this.elements.alertsBtn.textContent = '⚠ ' + alertCount;
        this.elements.alertsBtn.classList.toggle('has-alerts', alertCount > 0);
        
        // Update 3D viewport
        this.viewport.updateIndicators(state);
        
        // Play alarm sound if critical
        if (state.coreTemperature > 350 || state.pressure > 19 || state.scramActive) {
            if (!this.hasCriticalAlarm) {
                this.soundSystem.playAlarm();
                this.hasCriticalAlarm = true;
            }
        } else {
            if (this.hasCriticalAlarm) {
                this.soundSystem.stopAlarm();
                this.hasCriticalAlarm = false;
            }
        }
    };

    UIController.prototype.updateBarColor = function(element, percent) {
        element.classList.remove('warning', 'danger');
        if (percent > 80) {
            element.classList.add('danger');
        } else if (percent > 60) {
            element.classList.add('warning');
        }
    };

    UIController.prototype.updateStatusIndicator = function(state) {
        var statusEl = this.elements.reactorStatus;
        statusEl.classList.remove('warning', 'danger');
        
        if (state.gracePeriodActive) {
            statusEl.textContent = 'ОБКАТКА';
            statusEl.style.background = '#003366';
            statusEl.style.borderColor = '#0099ff';
            statusEl.style.color = '#0099ff';
        } else if (state.scramActive) {
            statusEl.textContent = 'АЗ-5';
            statusEl.classList.add('danger');
        } else if (state.coreTemperature > 350 || state.pressure > 19 || state.radiationLevel > 5) {
            statusEl.textContent = 'ОПАСНОСТЬ';
            statusEl.classList.add('danger');
        } else if (state.coreTemperature > 300 || state.pressure > 17 || state.radiationLevel > 1) {
            statusEl.textContent = 'ВНИМАНИЕ';
            statusEl.classList.add('warning');
        } else {
            statusEl.textContent = 'НОРМА';
            statusEl.style.background = '';
            statusEl.style.borderColor = '';
            statusEl.style.color = '';
        }
    };

    UIController.prototype.handleAlert = function(alert) {
        var now = Date.now();
        
        // Play warning beep for any alert (with cooldown to avoid spam)
        if (now - this.lastWarningSound > this.warningSoundCooldown) {
            this.soundSystem.playWarning();
            this.lastWarningSound = now;
        }
        
        // Play continuous alarm for critical situations
        if (alert.level === 'critical') {
            if (!this.hasCriticalAlarm) {
                this.soundSystem.playAlarm();
                this.hasCriticalAlarm = true;
            }
        }
    };

    UIController.prototype.addLogEntry = function(event) {
        var entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = '<span class="log-time">' + event.timestamp + '</span>' +
            '<span class="log-type ' + event.type + '">[' + event.type.toUpperCase() + ']</span>' +
            '<span class="log-message">' + event.message + '</span>';
        
        this.elements.logEntries.appendChild(entry);
        this.elements.logEntries.scrollTop = this.elements.logEntries.scrollHeight;
        
        // Keep only last 100 entries
        while (this.elements.logEntries.children.length > 100) {
            this.elements.logEntries.removeChild(this.elements.logEntries.firstChild);
        }
    };

    UIController.prototype.showAlerts = function() {
        var alerts = this.simulation.alerts.slice(-20);
        var self = this;
        
        if (alerts.length === 0) {
            this.elements.alertEntries.innerHTML = '<p style="text-align: center; color: #888;">Нет активных сигналов</p>';
        } else {
            this.elements.alertEntries.innerHTML = alerts.map(function(alert) {
                var timeStr = self.formatTime(alert.time);
                return '<div class="alert-item ' + (alert.level === 'critical' ? 'critical' : '') + '">' +
                    '<h4>' + (alert.level === 'critical' ? '🔴' : alert.level === 'danger' ? '🟠' : '🟡') + ' ' + alert.message + '</h4>' +
                    '<p class="alert-time">Время: ' + timeStr + '</p></div>';
            }).join('');
        }
        
        this.elements.alertModal.style.display = 'flex';
    };

    UIController.prototype.formatTime = function(ms) {
        var seconds = Math.floor(ms / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        return hours.toString().padStart(2, '0') + ':' + 
               (minutes % 60).toString().padStart(2, '0') + ':' + 
               (seconds % 60).toString().padStart(2, '0');
    };

    return UIController;
})();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIController;
}
