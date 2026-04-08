// ===== UI CONTROLLER =====
class UIController {
    constructor(simulation, viewport) {
        this.simulation = simulation;
        this.viewport = viewport;
        
        this.elements = {};
        this.currentTab = 'main';
        
        this.init();
    }

    init() {
        // Cache DOM elements
        this.cacheElements();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup simulation callbacks
        this.simulation.onUpdate = (state) => this.updateUI(state);
        this.simulation.onAlert = (alert) => this.handleAlert(alert);
        this.simulation.onEvent = (event) => this.addLogEntry(event);
    }

    cacheElements() {
        // Indicators
        this.elements.tempCore = document.getElementById('temp-core');
        this.elements.pressure = document.getElementById('pressure');
        this.elements.radiation = document.getElementById('radiation');
        this.elements.powerOutput = document.getElementById('power-output');
        
        // Indicator bars
        this.elements.tempBar = document.getElementById('temp-bar');
        this.elements.pressureBar = document.getElementById('pressure-bar');
        this.elements.radiationBar = document.getElementById('radiation-bar');
        this.elements.powerBar = document.getElementById('power-bar');
        
        // Controls
        this.elements.controlRods = document.getElementById('control-rods');
        this.elements.rodsValue = document.getElementById('rods-value');
        this.elements.mainPump = document.getElementById('main-pump');
        this.elements.pumpValue = document.getElementById('pump-value');
        
        // Cooling tab
        this.elements.tempInlet = document.getElementById('temp-inlet');
        this.elements.tempOutlet = document.getElementById('temp-outlet');
        this.elements.coolantFlow = document.getElementById('coolant-flow');
        this.elements.pressurizerLevel = document.getElementById('pressurizer-level');
        
        // Power tab
        this.elements.energyGen = document.getElementById('energy-gen');
        this.elements.voltage = document.getElementById('voltage');
        this.elements.frequency = document.getElementById('frequency');
        this.elements.gridLoad = document.getElementById('grid-load');
        
        // Status
        this.elements.reactorStatus = document.getElementById('reactor-status');
        this.elements.alertsBtn = document.getElementById('btn-alerts');
        
        // Log
        this.elements.logEntries = document.getElementById('log-entries');
        
        // Buttons
        this.elements.btnManual = document.getElementById('btn-manual');
        this.elements.btnAlerts = document.getElementById('btn-alerts');
        this.elements.btnEmergencyCool = document.getElementById('btn-emergency-cool');
        this.elements.btnExtraPump = document.getElementById('btn-extra-pump');
        this.elements.btnGridConnect = document.getElementById('btn-grid-connect');
        this.elements.btnScram = document.getElementById('btn-scram');
        this.elements.btnClearLog = document.getElementById('btn-clear-log');
        this.elements.btnCloseManual = document.getElementById('btn-close-manual');
        this.elements.btnCloseAlerts = document.getElementById('btn-close-alerts');
        
        // Modals
        this.elements.manualModal = document.getElementById('manual-modal');
        this.elements.alertModal = document.getElementById('alert-modal');
        this.elements.manualContent = document.getElementById('manual-content');
        this.elements.alertEntries = document.getElementById('alert-entries');
        
        // Tabs
        this.elements.tabButtons = document.querySelectorAll('.tab-btn');
        this.elements.tabContents = document.querySelectorAll('.tab-content');
    }

    setupEventListeners() {
        // Control rods
        this.elements.controlRods.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.elements.rodsValue.textContent = value + '%';
            this.simulation.setControlRods(value);
            this.viewport.updateControlRodsVisual(value);
        });
        
        // Main pump
        this.elements.mainPump.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.elements.pumpValue.textContent = value + '%';
            this.simulation.setMainPump(value);
        });
        
        // Emergency cooling
        this.elements.btnEmergencyCool.addEventListener('click', () => {
            this.simulation.toggleEmergencyCooling();
            this.elements.btnEmergencyCool.textContent = 
                this.simulation.emergencyCoolingActive ? 'ДЕАКТИВИРОВАТЬ' : 'АКТИВИРОВАТЬ';
            this.elements.btnEmergencyCool.classList.toggle('btn-danger');
        });
        
        // Extra pump
        this.elements.btnExtraPump.addEventListener('click', () => {
            this.simulation.toggleExtraPump();
            this.elements.btnExtraPump.textContent = 
                this.simulation.extraPumpActive ? 'ВЫКЛ' : 'ВКЛ';
        });
        
        // Grid connection
        this.elements.btnGridConnect.addEventListener('click', () => {
            this.simulation.toggleGridConnection();
            this.elements.btnGridConnect.textContent = 
                this.simulation.gridConnected ? 'ПОДКЛЮЧЕНО' : 'ОТКЛЮЧЕНО';
            this.elements.btnGridConnect.classList.toggle('btn-success');
        });
        
        // SCRAM
        this.elements.btnScram.addEventListener('click', () => {
            if (!this.simulation.scramActive) {
                if (confirm('АКТИВИРОВАТЬ АЗ-5? Это приведет к аварийной остановке реактора.')) {
                    this.simulation.activateSCRAM();
                }
            } else {
                this.simulation.resetSCRAM();
                this.elements.btnScram.textContent = 'АЗ-5';
            }
        });
        
        // Clear log
        this.elements.btnClearLog.addEventListener('click', () => {
            this.simulation.clearEvents();
            this.elements.logEntries.innerHTML = '';
        });
        
        // Manual modal
        this.elements.btnManual.addEventListener('click', () => {
            this.elements.manualContent.innerHTML = manualContentHTML;
            this.elements.manualModal.style.display = 'flex';
        });
        
        this.elements.btnCloseManual.addEventListener('click', () => {
            this.elements.manualModal.style.display = 'none';
        });
        
        // Alert modal
        this.elements.btnAlerts.addEventListener('click', () => {
            this.showAlerts();
        });
        
        this.elements.btnCloseAlerts.addEventListener('click', () => {
            this.elements.alertModal.style.display = 'none';
        });
        
        // Tabs
        this.elements.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.switchTab(tab);
            });
        });
        
        // Close modals on outside click
        window.addEventListener('click', (e) => {
            if (e.target === this.elements.manualModal) {
                this.elements.manualModal.style.display = 'none';
            }
            if (e.target === this.elements.alertModal) {
                this.elements.alertModal.style.display = 'none';
            }
        });
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        
        this.elements.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        this.elements.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === `tab-${tabName}`);
        });
    }

    updateUI(state) {
        // Main indicators
        this.elements.tempCore.textContent = state.coreTemperature.toFixed(1) + '°C';
        this.elements.pressure.textContent = state.pressure.toFixed(2) + ' МПа';
        this.elements.radiation.textContent = state.radiationLevel.toFixed(3) + ' мЗв/ч';
        this.elements.powerOutput.textContent = state.reactorPower.toFixed(1) + '%';
        
        // Indicator bars
        const tempPercent = Math.min(100, (state.coreTemperature / 400) * 100);
        this.elements.tempBar.style.width = tempPercent + '%';
        this.updateBarColor(this.elements.tempBar, tempPercent);
        
        const pressurePercent = Math.min(100, (state.pressure / 25) * 100);
        this.elements.pressureBar.style.width = pressurePercent + '%';
        this.updateBarColor(this.elements.pressureBar, pressurePercent);
        
        const radiationPercent = Math.min(100, (state.radiationLevel / 10) * 100);
        this.elements.radiationBar.style.width = radiationPercent + '%';
        this.updateBarColor(this.elements.radiationBar, radiationPercent);
        
        const powerPercent = Math.min(100, state.reactorPower);
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
        const alertCount = this.simulation.getAlertCount();
        this.elements.alertsBtn.textContent = '⚠ ' + alertCount;
        this.elements.alertsBtn.classList.toggle('has-alerts', alertCount > 0);
        
        // Update 3D viewport
        this.viewport.updateIndicators(state);
    }

    updateBarColor(element, percent) {
        element.classList.remove('warning', 'danger');
        if (percent > 80) {
            element.classList.add('danger');
        } else if (percent > 60) {
            element.classList.add('warning');
        }
    }

    updateStatusIndicator(state) {
        const statusEl = this.elements.reactorStatus;
        statusEl.classList.remove('warning', 'danger');
        
        if (state.scramActive) {
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
        }
    }

    handleAlert(alert) {
        // Flash screen for critical alerts
        if (alert.level === 'critical') {
            document.body.style.animation = 'none';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 100);
        }
    }

    addLogEntry(event) {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `
            <span class="log-time">${event.timestamp}</span>
            <span class="log-type ${event.type}">[${event.type.toUpperCase()}]</span>
            <span class="log-message">${event.message}</span>
        `;
        
        this.elements.logEntries.appendChild(entry);
        this.elements.logEntries.scrollTop = this.elements.logEntries.scrollHeight;
        
        // Keep only last 100 entries
        while (this.elements.logEntries.children.length > 100) {
            this.elements.logEntries.removeChild(this.elements.logEntries.firstChild);
        }
    }

    showAlerts() {
        const alerts = this.simulation.alerts.slice(-20); // Last 20 alerts
        
        if (alerts.length === 0) {
            this.elements.alertEntries.innerHTML = '<p style="text-align: center; color: #888;">Нет активных сигналов</p>';
        } else {
            this.elements.alertEntries.innerHTML = alerts.map(alert => `
                <div class="alert-item ${alert.level === 'critical' ? 'critical' : ''}">
                    <h4>${alert.level === 'critical' ? '🔴' : alert.level === 'danger' ? '🟠' : '🟡'} ${alert.message}</h4>
                    <p class="alert-time">Время: ${this.formatTime(alert.time)}</p>
                </div>
            `).join('');
        }
        
        this.elements.alertModal.style.display = 'flex';
    }

    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIController;
}
