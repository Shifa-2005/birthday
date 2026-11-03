// Romantic Web Audio Synthesizer - 100% self-contained, no external audio files required!

class RomanticSound {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft sparkle / magical chime
  playChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + i * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + i * 0.08);
      osc.stop(this.ctx.currentTime + i * 0.08 + 0.65);
    });
  }

  // Soft romantic pop / balloon pop sound
  playPop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(980, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.22);
  }

  // Cute cartoon cat meow sound!
  playMeow() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(920, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.32);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.13, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  // Angry / grumpy cat hiss-growl for when Ghuggu clicks "NO"!
  playAngryMeow() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    // Low pitch growl/buzz + screech
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.25);
    osc.frequency.linearRampToValueAtTime(450, now + 0.45);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.52);
  }

  // Gentle blowing sound for candles
  playBlow() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Celebration fanfare / cheerful chimes
  playCelebration() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const chord = [392.00, 493.88, 587.33, 783.99, 987.77];
    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + idx * 0.06 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.06 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.06);
      osc.stop(this.ctx.currentTime + idx * 0.06 + 1.25);
    });
  }

  // Ambient gentle piano-like melody
  startAmbientMusic() {
    if (this.bgmPlaying || this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    this.bgmPlaying = true;
    const melody = [
      { f: 440.00, d: 0.8 },
      { f: 554.37, d: 0.8 },
      { f: 659.25, d: 1.2 },
      { f: 554.37, d: 0.8 },
      { f: 493.88, d: 0.8 },
      { f: 440.00, d: 1.4 },
      { f: 369.99, d: 0.8 },
      { f: 440.00, d: 1.6 }
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!this.bgmPlaying || this.isMuted || !this.ctx) return;
      const note = melody[noteIdx];
      noteIdx = (noteIdx + 1) % melody.length;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.035, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + note.d * 1.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + note.d * 1.55);

      this.bgmInterval = setTimeout(playNext, note.d * 900);
    };

    playNext();
  }

  stopAmbientMusic() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearTimeout(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbientMusic();
    } else {
      this.startAmbientMusic();
    }
    return this.isMuted;
  }
}

export const soundManager = new RomanticSound();
