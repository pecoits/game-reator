// ===== SOUND SYSTEM =====
class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.volume = 0.5; // Default volume (50%)
        this.muted = false;
        this.alarmOscillator = null;
        this.alarmGain = null;
        this.alarmActive = false;
        this.initialized = false;
        this.ambientOsc1 = null;
        this.ambientOsc2 = null;
        this.ambientGain1 = null;
        this.ambientGain2 = null;
        this.ambientActive = false;
    }

    init() {
        if (this.initialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
            console.log('Sound system initialized');
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }

    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        if (this.alarmGain) {
            this.alarmGain.gain.value = this.volume * 0.3;
        }
        this.muted = this.volume === 0;
        this._updateAmbientVolume();
    }

    toggleMute() {
        this.muted = !this.muted;
        if (this.muted) {
            this.stopAlarm();
        }
        this._updateAmbientVolume();
        return this.muted;
    }

    startAmbient() {
        if (!this.initialized || this.ambientActive) return;
        var ctx = this.audioContext;

        this.ambientOsc1 = ctx.createOscillator();
        this.ambientGain1 = ctx.createGain();
        this.ambientOsc1.type = 'sine';
        this.ambientOsc1.frequency.value = 55;
        this.ambientGain1.gain.value = this.muted ? 0 : this.volume * 0.04;
        this.ambientOsc1.connect(this.ambientGain1);
        this.ambientGain1.connect(ctx.destination);
        this.ambientOsc1.start();

        this.ambientOsc2 = ctx.createOscillator();
        this.ambientGain2 = ctx.createGain();
        this.ambientOsc2.type = 'sine';
        this.ambientOsc2.frequency.value = 110;
        this.ambientGain2.gain.value = this.muted ? 0 : this.volume * 0.015;
        this.ambientOsc2.connect(this.ambientGain2);
        this.ambientGain2.connect(ctx.destination);
        this.ambientOsc2.start();

        this.ambientActive = true;
    }

    stopAmbient() {
        if (!this.ambientActive) return;
        this.ambientActive = false;
        var oscs = [this.ambientOsc1, this.ambientOsc2];
        var gains = [this.ambientGain1, this.ambientGain2];
        oscs.forEach(function(osc) { if (osc) { try { osc.stop(); osc.disconnect(); } catch (_e) {} } });
        gains.forEach(function(g) { if (g) { try { g.disconnect(); } catch (_e) {} } });
        this.ambientOsc1 = this.ambientOsc2 = this.ambientGain1 = this.ambientGain2 = null;
    }

    _updateAmbientVolume() {
        if (!this.ambientActive) return;
        var v = this.muted ? 0 : this.volume;
        if (this.ambientGain1) this.ambientGain1.gain.value = v * 0.04;
        if (this.ambientGain2) this.ambientGain2.gain.value = v * 0.015;
    }

    playAlarm() {
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
        var freq = 800;
        this.alarmInterval = setInterval(() => {
            if (this.alarmOscillator) {
                freq = freq === 800 ? 600 : 800;
                this.alarmOscillator.frequency.value = freq;
            }
        }, 500);
    }

    stopAlarm() {
        this.alarmActive = false;

        if (this.alarmInterval) {
            clearInterval(this.alarmInterval);
            this.alarmInterval = null;
        }

        if (this.alarmOscillator) {
            try {
                this.alarmOscillator.stop();
                this.alarmOscillator.disconnect();
            } catch (_err) {}
            this.alarmOscillator = null;
        }

        if (this.alarmGain) {
            try {
                this.alarmGain.disconnect();
            } catch (_err) {}
            this.alarmGain = null;
        }
    }

    playClick() {
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
    }

    playSuccess() {
        if (!this.initialized || this.muted) return;

        var now = this.audioContext.currentTime;

        // Play a success chord (C major arpeggio)
        [523.25, 659.25, 783.99].forEach((freq, i) => {
            var osc = this.audioContext.createOscillator();
            var gain = this.audioContext.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.value = this.volume * 0.15;

            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.start(now + i * 0.15);
            osc.stop(now + i * 0.15 + 0.2);
        });
    }

    playWarning() {
        if (!this.initialized || this.muted) return;

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
        gain2.connect(this.audioContext.destination);

        oscillator2.start(now + 0.3);
        oscillator2.stop(now + 0.45);
    }

    getState() {
        return {
            volume: this.volume,
            muted: this.muted
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SoundSystem;
}
