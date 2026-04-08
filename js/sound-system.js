// ===== SOUND SYSTEM =====
var SoundSystem = (function() {
    function SoundSystem() {
        this.audioContext = null;
        this.volume = 0.5; // Default volume (50%)
        this.muted = false;
        this.alarmOscillator = null;
        this.alarmGain = null;
        this.alarmActive = false;
        this.initialized = false;
    }

    SoundSystem.prototype.init = function() {
        if (this.initialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
            console.log('Sound system initialized');
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    };

    SoundSystem.prototype.setVolume = function(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        if (this.alarmGain) {
            this.alarmGain.gain.value = this.volume * 0.3;
        }
        if (this.volume === 0) {
            this.muted = true;
        } else {
            this.muted = false;
        }
    };

    SoundSystem.prototype.toggleMute = function() {
        this.muted = !this.muted;
        if (this.muted) {
            this.stopAlarm();
        }
        return this.muted;
    };

    SoundSystem.prototype.playAlarm = function() {
        if (!this.initialized || this.muted) return;
        
        // Don't start if already playing
        if (this.alarmActive) return;
        
        this.alarmActive = true;
        
        // Create oscillator for alarm sound
        this.alarmOscillator = this.audioContext.createOscillator();
        this.alarmGain = this.audioContext.createGain();
        
        // Alarm tone - alternating high/low beep
        this.alarmOscillator.type = 'square';
        this.alarmOscillator.frequency.value = 800;
        
        // Volume control
        this.alarmGain.gain.value = this.volume * 0.3;
        
        // Connect
        this.alarmOscillator.connect(this.alarmGain);
        this.alarmGain.connect(this.audioContext.destination);
        
        // Start
        this.alarmOscillator.start();
        
        // Alternate frequency for alarm effect
        var self = this;
        var freq = 800;
        this.alarmInterval = setInterval(function() {
            if (self.alarmOscillator) {
                freq = freq === 800 ? 600 : 800;
                self.alarmOscillator.frequency.value = freq;
            }
        }, 500);
    };

    SoundSystem.prototype.stopAlarm = function() {
        this.alarmActive = false;
        
        if (this.alarmInterval) {
            clearInterval(this.alarmInterval);
            this.alarmInterval = null;
        }
        
        if (this.alarmOscillator) {
            try {
                this.alarmOscillator.stop();
                this.alarmOscillator.disconnect();
            } catch (e) {}
            this.alarmOscillator = null;
        }
        
        if (this.alarmGain) {
            try {
                this.alarmGain.disconnect();
            } catch (e) {}
            this.alarmGain = null;
        }
    };

    SoundSystem.prototype.playClick = function() {
        if (!this.initialized || this.muted) return;
        
        var oscillator = this.audioContext.createOscillator();
        var gain = this.audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = 1000;
        gain.gain.value = this.volume * 0.1;
        
        oscillator.connect(gain);
        gain.connect(this.audioContext.destination);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.05);
    };

    SoundSystem.prototype.playSuccess = function() {
        if (!this.initialized || this.muted) return;
        
        var self = this;
        var now = this.audioContext.currentTime;
        
        // Play a success chord (C major arpeggio)
        [523.25, 659.25, 783.99].forEach(function(freq, i) {
            var osc = self.audioContext.createOscillator();
            var gain = self.audioContext.createGain();
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.value = self.volume * 0.15;
            
            osc.connect(gain);
            gain.connect(self.audioContext.destination);
            
            osc.start(now + i * 0.15);
            osc.stop(now + i * 0.15 + 0.2);
        });
    };

    SoundSystem.prototype.playWarning = function() {
        if (!this.initialized || this.muted) return;
        
        var self = this;
        var now = this.audioContext.currentTime;
        
        // Single beep for warning
        var oscillator = this.audioContext.createOscillator();
        var gain = this.audioContext.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.value = 880; // A5 - clear beep
        gain.gain.value = this.volume * 0.15;
        
        oscillator.connect(gain);
        gain.connect(this.audioContext.destination);
        
        oscillator.start(now);
        oscillator.stop(now + 0.15); // Short beep
        
        // Second beep after a pause
        var oscillator2 = this.audioContext.createOscillator();
        var gain2 = this.audioContext.createGain();
        
        oscillator2.type = 'square';
        oscillator2.frequency.value = 880;
        gain2.gain.value = this.volume * 0.15;
        
        oscillator2.connect(gain2);
        gain2.connect(self.audioContext.destination);
        
        oscillator2.start(now + 0.3);
        oscillator2.stop(now + 0.45);
    };

    SoundSystem.prototype.getState = function() {
        return {
            volume: this.volume,
            muted: this.muted
        };
    };

    return SoundSystem;
})();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SoundSystem;
}
