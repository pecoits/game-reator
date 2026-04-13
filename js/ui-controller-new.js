// ===== UI CONTROLLER - NEW CONTROL ROOM STYLE =====
var UIControllerNew = (function() {
    function UIControllerNew(simulation) {
        this.simulation = simulation;
        this.soundSystem = new SoundSystem();
        this.hasCriticalAlarm = false;
        this.lastWarningSound = 0;
        this.warningSoundCooldown = 3000;
        this.currentManualPage = 1;
        this.totalManualPages = 1;
        
        this.elements = {};
        
        this.init();
    }

    UIControllerNew.prototype.init = function() {
        var self = this;
        this.cacheElements();
        this.setupEventListeners();
        
        this.simulation.onUpdate = function(state) { self.updateUI(state); };
        this.simulation.onAlert = function(alert) { self.handleAlert(alert); };
        this.simulation.onEvent = function(event) { self.addJournalEntry(event); };
        
        // Initialize knob/lever positions from simulation state
        this.syncControlsFromSimulation();
    };

    UIControllerNew.prototype.syncControlsFromSimulation = function() {
        // Sync knobs
        if (this.elements.knobRods) {
            var rodsKnob = this.elements.knobRods.querySelector('.knob');
            var rodsValue = this.elements.knobRods.querySelector('.knob-value');
            if (rodsKnob && rodsValue) {
                var value = this.simulation.controlRodsPosition || 50;
                rodsKnob.setAttribute('data-value', value);
                rodsKnob.style.transform = 'rotate(' + (-130 + (value / 100) * 260) + 'deg)';
                rodsValue.textContent = Math.round(value) + '%';
            }
        }
        
        if (this.elements.knobPump) {
            var pumpKnob = this.elements.knobPump.querySelector('.knob');
            var pumpValue = this.elements.knobPump.querySelector('.knob-value');
            if (pumpKnob && pumpValue) {
                var value = this.simulation.mainPumpSpeed || 65;
                pumpKnob.setAttribute('data-value', value);
                pumpKnob.style.transform = 'rotate(' + (-130 + (value / 100) * 260) + 'deg)';
                pumpValue.textContent = Math.round(value) + '%';
            }
        }
        
        // Sync toggle switches
        if (this.elements.toggleCool) {
            this.updateToggleState(this.elements.toggleCool, this.simulation.emergencyCoolingActive);
        }
        
        if (this.elements.toggleExtra) {
            this.updateToggleState(this.elements.toggleExtra, this.simulation.extraPumpActive);
        }
        
        // Sync grid button
        if (this.elements.btnGrid) {
            this.elements.btnGrid.textContent = this.simulation.gridConnected ? 'ПОДКЛЮЧЕНО' : 'ОТКЛЮЧЕНО';
            this.elements.btnGrid.classList.toggle('btn-safe', this.simulation.gridConnected);
            this.elements.btnGrid.classList.toggle('btn-warn', !this.simulation.gridConnected);
        }
    };

    UIControllerNew.prototype.updateToggleState = function(toggleEl, isActive) {
        if (!toggleEl) return;
        var thumb = toggleEl.querySelector('.toggle-thumb');
        var track = toggleEl.querySelector('.toggle-track');
        var status = toggleEl.querySelector('.toggle-status');
        
        if (thumb) {
            thumb.classList.toggle('on', isActive);
            thumb.classList.toggle('off', !isActive);
        }
        if (track) {
            track.classList.toggle('active', isActive);
        }
        if (status) {
            status.textContent = isActive ? 'ВКЛ' : 'ВЫКЛ';
            status.classList.toggle('on', isActive);
            status.classList.toggle('off', !isActive);
        }
    };

    UIControllerNew.prototype.cacheElements = function() {
        // Gauges
        this.elements.needleTemp = document.getElementById('needle-temp');
        this.elements.needlePressure = document.getElementById('needle-pressure');
        this.elements.needlePower = document.getElementById('needle-power');
        this.elements.needleRadiation = document.getElementById('needle-radiation');
        this.elements.valTemp = document.getElementById('val-temp');
        this.elements.valPressure = document.getElementById('val-pressure');
        this.elements.valPower = document.getElementById('val-power');
        this.elements.valRadiation = document.getElementById('val-radiation');
        
        // Digital displays
        this.elements.dispReactor = document.getElementById('disp-reactor');
        this.elements.dispPressure = document.getElementById('disp-pressure');
        this.elements.dispTemp = document.getElementById('disp-temp');
        this.elements.dispAlarms = document.getElementById('disp-alarms');
        
        // Annunciator lamps
        this.elements.lampNormal = document.getElementById('lamp-normal');
        this.elements.lampWarning = document.getElementById('lamp-warning');
        this.elements.lampDanger = document.getElementById('lamp-danger');
        this.elements.lampScram = document.getElementById('lamp-scram');
        
        // Journal
        this.elements.journalContent = document.getElementById('journal-content');
        
        // Controls
        this.elements.knobRods = document.getElementById('knob-rods');
        this.elements.knobPump = document.getElementById('knob-pump');
        this.elements.toggleCool = document.getElementById('toggle-cool');
        this.elements.toggleExtra = document.getElementById('toggle-extra');
        this.elements.btnReset = document.getElementById('btn-reset');
        this.elements.btnGrid = document.getElementById('btn-grid');
        this.elements.btnScram = document.getElementById('btn-scram');
        
        // Header
        this.elements.alertsBtn = document.getElementById('btn-alerts');
        this.elements.btnMute = document.getElementById('btn-mute');
        this.elements.volumeSlider = document.getElementById('volume-slider');
        this.elements.btnManual = document.getElementById('btn-manual');

        // Sparklines
        this.elements.sparkTemp     = document.getElementById('spark-temp-line');
        this.elements.sparkPressure = document.getElementById('spark-pressure-line');
        this.elements.sparkPower    = document.getElementById('spark-power-line');
        this.elements.sparkRad      = document.getElementById('spark-radiation-line');

        // Emergency overlay & stats
        this.elements.emergencyOverlay = document.getElementById('emergency-overlay');
        this.elements.statTime   = document.getElementById('stat-time');
        this.elements.statEnergy = document.getElementById('stat-energy');
        this.elements.statAlerts = document.getElementById('stat-alerts');
        
        // Modals
        this.elements.manualModal = document.getElementById('manual-modal');
        this.elements.alertModal = document.getElementById('alert-modal');
        this.elements.manualContent = document.getElementById('manual-content');
        this.elements.alertEntries = document.getElementById('alert-entries');
        this.elements.btnCloseAlerts = document.getElementById('btn-close-alerts');
    };

    UIControllerNew.prototype.setupEventListeners = function() {
        var self = this;
        
        // Initialize sound system on first interaction
        var initSound = function() {
            self.soundSystem.init();
            self.soundSystem.startAmbient();
            document.removeEventListener('click', initSound);
        };
        document.addEventListener('click', initSound);
        
        // Sound controls
        if (this.elements.btnMute) {
            this.elements.btnMute.addEventListener('click', function() {
                var muted = self.soundSystem.toggleMute();
                self.elements.btnMute.textContent = muted ? '🔇' : '🔊';
            });
        }
        
        if (this.elements.volumeSlider) {
            this.elements.volumeSlider.addEventListener('input', function(e) {
                var vol = parseInt(e.target.value) / 100;
                self.soundSystem.setVolume(vol);
            });
        }
        
        // Knobs
        if (this.elements.knobRods) {
            this.initKnob(this.elements.knobRods, function(value) {
                self.simulation.setControlRods(value);
            });
        }
        
        if (this.elements.knobPump) {
            this.initKnob(this.elements.knobPump, function(value) {
                self.simulation.setMainPump(value);
            });
        }
        
        // Toggle Switches
        if (this.elements.toggleCool) {
            this.elements.toggleCool.addEventListener('click', function() {
                self.simulation.toggleEmergencyCooling();
                self.updateToggleState(self.elements.toggleCool, self.simulation.emergencyCoolingActive);
            });
        }
        
        if (this.elements.toggleExtra) {
            this.elements.toggleExtra.addEventListener('click', function() {
                self.simulation.toggleExtraPump();
                self.updateToggleState(self.elements.toggleExtra, self.simulation.extraPumpActive);
            });
        }
        
        // Buttons
        if (this.elements.btnReset) {
            this.elements.btnReset.addEventListener('click', function() {
                self.simulation.clearAlerts();
            });
        }
        
        if (this.elements.btnGrid) {
            this.elements.btnGrid.addEventListener('click', function() {
                self.simulation.toggleGridConnection();
            });
        }
        
        if (this.elements.btnScram) {
            this.elements.btnScram.addEventListener('click', function() {
                if (!self.simulation.scramActive) {
                    if (confirm('АКТИВИРОВАТЬ АЗ-5?')) {
                        self.simulation.activateSCRAM();
                    }
                }
            });
        }
        
        // Manual
        if (this.elements.btnManual) {
            this.elements.btnManual.addEventListener('click', function() {
                self.openManual();
            });
        }
        
        // Alerts
        if (this.elements.alertsBtn) {
            this.elements.alertsBtn.addEventListener('click', function() {
                self.showAlerts();
            });
        }
        
        if (this.elements.btnCloseAlerts) {
            this.elements.btnCloseAlerts.addEventListener('click', function() {
                self.elements.alertModal.style.display = 'none';
            });
        }
        
        // Close modals on outside click
        window.addEventListener('click', function(e) {
            if (self.elements.manualModal && e.target === self.elements.manualModal) {
                self.elements.manualModal.style.display = 'none';
            }
            if (self.elements.alertModal && e.target === self.elements.alertModal) {
                self.elements.alertModal.style.display = 'none';
            }
        });
    };

    UIControllerNew.prototype.initKnob = function(container, callback) {
        var knob = container.querySelector('.knob');
        var valueDisplay = container.querySelector('.knob-value');
        var isDragging = false;
        var startY = 0;
        var startValue = 0;
        
        function updateKnob(value) {
            value = Math.max(0, Math.min(100, value));
            var angle = -130 + (value / 100) * 260;
            knob.style.transform = 'rotate(' + angle + 'deg)';
            valueDisplay.textContent = Math.round(value) + '%';
            knob.setAttribute('data-value', value);
            if (callback) callback(value);
        }
        
        // Initialize
        var initialValue = parseFloat(knob.getAttribute('data-value')) || 50;
        updateKnob(initialValue);
        
        knob.addEventListener('mousedown', function(e) {
            isDragging = true;
            startY = e.clientY;
            startValue = parseFloat(knob.getAttribute('data-value')) || 50;
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            var delta = (startY - e.clientY) * 0.5;
            var newValue = startValue + delta;
            updateKnob(newValue);
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        // Touch support
        knob.addEventListener('touchstart', function(e) {
            isDragging = true;
            startY = e.touches[0].clientY;
            startValue = parseFloat(knob.getAttribute('data-value')) || 50;
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            var delta = (startY - e.touches[0].clientY) * 0.5;
            var newValue = startValue + delta;
            updateKnob(newValue);
        });
        
        document.addEventListener('touchend', function() {
            isDragging = false;
        });
    };

    UIControllerNew.prototype.updateUI = function(state) {
        // Update gauges
        this.updateGauge('temp', state.coreTemperature, 0, 450, '°C');
        this.updateGauge('pressure', state.pressure, 0, 25, ' МПа');
        this.updateGauge('power', state.reactorPower, 0, 110, '%');
        this.updateGauge('radiation', state.radiationLevel, 0, 20, ' мЗв/ч');
        
        // Update digital displays
        this.updateDisplay(this.elements.dispReactor, state.reactorPower.toFixed(1), state.reactorPower < 90 ? 'green' : state.reactorPower < 100 ? 'yellow' : 'red');
        this.updateDisplay(this.elements.dispPressure, state.pressure.toFixed(1), state.pressure < 17 ? 'green' : state.pressure < 19 ? 'yellow' : 'red');
        this.updateDisplay(this.elements.dispTemp, state.coreTemperature.toFixed(1), state.coreTemperature < 300 ? 'green' : state.coreTemperature < 350 ? 'yellow' : 'red');
        
        var alarmCount = this.simulation.getAlertCount();
        this.updateDisplay(this.elements.dispAlarms, alarmCount.toString().padStart(4, '0'), alarmCount === 0 ? 'green' : alarmCount < 3 ? 'yellow' : 'red');
        
        // Update annunciator lamps
        this.updateLamps(state);
        
        // Update alerts button
        if (this.elements.alertsBtn) {
            this.elements.alertsBtn.textContent = '⚠ ' + alarmCount;
            this.elements.alertsBtn.classList.toggle('has-alerts', alarmCount > 0);
        }
        
        // Sound logic
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

        // Sparklines
        var history = this.simulation.history;
        if (history) {
            this.updateSparkline(this.elements.sparkTemp,     history.temp,     20,  450);
            this.updateSparkline(this.elements.sparkPressure, history.pressure, 10,  22);
            this.updateSparkline(this.elements.sparkPower,    history.power,    0,   110);
            this.updateSparkline(this.elements.sparkRad,      history.radiation, 0,  20);
        }

        // Emergency visual overlay
        var overlay = this.elements.emergencyOverlay;
        if (overlay) {
            var isCrit = state.coreTemperature > 350 || state.pressure > 19 || state.radiationLevel > 5 || state.scramActive;
            var isWarn = !isCrit && (state.coreTemperature > 300 || state.pressure > 17 || state.radiationLevel > 1);
            overlay.className = isCrit ? 'emergency-critical' : (isWarn ? 'emergency-warning' : '');
        }

        // Stats row
        if (this.elements.statTime)   this.elements.statTime.textContent   = this.formatTime(state.time);
        if (this.elements.statEnergy) this.elements.statEnergy.textContent = Math.round(state.totalEnergyMWh || 0);
        if (this.elements.statAlerts) this.elements.statAlerts.textContent = state.totalAlerts || 0;
    };

    UIControllerNew.prototype.updateSparkline = function(lineEl, data, min, max) {
        if (!lineEl || !data || data.length < 2) return;
        var w = 60, h = 20;
        var range = (max - min) || 1;
        var pts = data.map(function(v, i) {
            var x = (i / (data.length - 1)) * w;
            var y = h - Math.max(0, Math.min(h, ((v - min) / range) * h));
            return x.toFixed(1) + ',' + y.toFixed(1);
        }).join(' ');
        lineEl.setAttribute('points', pts);
        var last = data[data.length - 1];
        var ratio = (last - min) / range;
        lineEl.setAttribute('stroke', ratio < 0.65 ? '#64ff8f' : ratio < 0.82 ? '#ffe066' : '#ff6b6b');
    };

    UIControllerNew.prototype.updateGauge = function(type, value, min, max, unit) {
        var needle = this.elements['needle' + type.charAt(0).toUpperCase() + type.slice(1)];
        var valueEl = this.elements['val' + type.charAt(0).toUpperCase() + type.slice(1)];
        
        if (!needle || !valueEl) return;
        
        var ratio = (value - min) / (max - min);
        ratio = Math.max(0, Math.min(1, ratio));
        var angle = -130 + ratio * 260;
        
        needle.setAttribute('transform', 'rotate(' + angle + ' 100 100)');
        valueEl.textContent = value.toFixed(1) + unit;
    };

    UIControllerNew.prototype.updateDisplay = function(element, value, color) {
        if (!element) return;
        element.textContent = value;
        element.className = 'seven-segment tone-' + color;
    };

    UIControllerNew.prototype.updateLamps = function(state) {
        // Reset all
        [this.elements.lampNormal, this.elements.lampWarning, this.elements.lampDanger, this.elements.lampScram].forEach(function(lamp) {
            if (lamp) {
                lamp.className = 'lamp lamp-dim';
            }
        });
        
        if (state.scramActive) {
            this.elements.lampScram.className = 'lamp lamp-red';
        } else if (state.coreTemperature > 350 || state.pressure > 19) {
            this.elements.lampDanger.className = 'lamp lamp-red';
        } else if (state.coreTemperature > 300 || state.pressure > 17) {
            this.elements.lampWarning.className = 'lamp lamp-yellow';
            this.elements.lampNormal.className = 'lamp lamp-dim';
        } else {
            this.elements.lampNormal.className = 'lamp lamp-green';
        }
    };

    UIControllerNew.prototype.addJournalEntry = function(event) {
        if (!this.elements.journalContent) return;
        
        var line = document.createElement('div');
        line.className = 'journal-line';
        
        var typeClass = '';
        if (event.type === 'warning') typeClass = 'warning';
        else if (event.type === 'danger') typeClass = 'danger';
        
        line.innerHTML = '<span class="journal-time">' + event.timestamp + '</span>' +
            '<span class="journal-text ' + typeClass + '">' + event.message + '</span>';
        
        this.elements.journalContent.insertBefore(line, this.elements.journalContent.firstChild);
        
        // Keep only last 20 entries
        while (this.elements.journalContent.children.length > 20) {
            this.elements.journalContent.removeChild(this.elements.journalContent.lastChild);
        }
    };

    UIControllerNew.prototype.handleAlert = function(alert) {
        var now = Date.now();
        
        if (now - this.lastWarningSound > this.warningSoundCooldown) {
            this.soundSystem.playWarning();
            this.lastWarningSound = now;
        }
        
        if (alert.level === 'critical') {
            if (!this.hasCriticalAlarm) {
                this.soundSystem.playAlarm();
                this.hasCriticalAlarm = true;
            }
        }
    };

    UIControllerNew.prototype.openManual = function() {
        var lang = window.selectedLanguage || 'en';
        var pages = lang === 'pt' ? manualPagesPT : manualPagesEN;
        
        if (!pages || pages.length === 0) return;
        
        var html = '<button class="manual-close-float" id="manual-close-float">×</button>';
        html += '<div class="manual-content" id="manual-pages-container">';
        
        pages.forEach(function(page) {
            html += page;
        });
        
        html += '<div class="manual-nav">';
        html += '<button class="manual-nav-btn" id="manual-prev-btn" disabled>← НАЗАД</button>';
        html += '<span class="manual-page-indicator" id="manual-page-indicator">1 / ' + pages.length + '</span>';
        html += '<button class="manual-nav-btn" id="manual-next-btn">ДАЛЕЕ →</button>';
        html += '</div>';
        html += '</div>';
        
        this.elements.manualContent.innerHTML = html;
        this.elements.manualModal.style.display = 'flex';
        
        this.currentManualPage = 1;
        this.totalManualPages = pages.length;
        this.setupManualNavigation();
    };

    UIControllerNew.prototype.setupManualNavigation = function() {
        var self = this;
        var prevBtn = document.getElementById('manual-prev-btn');
        var nextBtn = document.getElementById('manual-next-btn');
        var closeFloat = document.getElementById('manual-close-float');
        
        if (closeFloat) {
            closeFloat.addEventListener('click', function() {
                self.elements.manualModal.style.display = 'none';
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (self.currentManualPage > 1) {
                    self.goToManualPage(self.currentManualPage - 1);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (self.currentManualPage < self.totalManualPages) {
                    self.goToManualPage(self.currentManualPage + 1);
                }
            });
        }
    };

    UIControllerNew.prototype.goToManualPage = function(pageNum) {
        var pages = document.querySelectorAll('.manual-page');
        var indicator = document.getElementById('manual-page-indicator');
        var prevBtn = document.getElementById('manual-prev-btn');
        var nextBtn = document.getElementById('manual-next-btn');
        
        pages.forEach(function(page) {
            page.classList.remove('active');
        });
        
        var targetPage = document.querySelector('.manual-page[data-page="' + pageNum + '"]');
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        this.currentManualPage = pageNum;
        
        if (indicator) {
            indicator.textContent = pageNum + ' / ' + this.totalManualPages;
        }
        
        if (prevBtn) prevBtn.disabled = (pageNum === 1);
        if (nextBtn) nextBtn.disabled = (pageNum === this.totalManualPages);
    };

    UIControllerNew.prototype.showAlerts = function() {
        var alerts = this.simulation.alerts.slice(-20);
        var self = this;
        
        if (alerts.length === 0) {
            this.elements.alertEntries.innerHTML = '<p style="text-align: center; color: #888;">Нет активных сигналов</p>';
        } else {
            this.elements.alertEntries.innerHTML = alerts.map(function(alert) {
                var timeStr = self.formatTime(alert.time);
                return '<div class="alert-item">' +
                    '<h4>' + alert.message + '</h4>' +
                    '<p class="alert-time">Время: ' + timeStr + '</p></div>';
            }).join('');
        }
        
        this.elements.alertModal.style.display = 'flex';
    };

    UIControllerNew.prototype.formatTime = function(ms) {
        var seconds = Math.floor(ms / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        return hours.toString().padStart(2, '0') + ':' + 
               (minutes % 60).toString().padStart(2, '0') + ':' + 
               (seconds % 60).toString().padStart(2, '0');
    };

    return UIControllerNew;
})();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIControllerNew;
}
