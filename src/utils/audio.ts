// Subtle Web Audio chime synthesizer for reflective exploration
class ChimeSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playReflectionChime(index: number = 0) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      // Pentatonic meditative notes (C4, D4, E4, G4, A4, C5, D5)
      const frequencies = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33];
      const freq = frequencies[index % frequencies.length];

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Warm harmonic overtone
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.linearRampToValueAtTime(0.015, now + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(ctx.destination);
      gain2.connect(ctx.destination);

      osc.start(now);
      osc2.start(now);

      osc.stop(now + 1.7);
      osc2.stop(now + 1.7);
    } catch {
      // Audio not permitted or supported; fail silently
    }
  }
}

export const chimePlayer = new ChimeSynthesizer();
