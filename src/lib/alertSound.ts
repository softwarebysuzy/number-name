export function playPermissionAlert(): void {
  try {
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.connect(ctx.destination);

    // Use two oscillators to create a more distinct timbre
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(660, now);

    const osc2 = ctx.createOscillator();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(1320, now);

    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();

    // Envelope: quick attack, short decay for a sharp alert
    const attack = 0.002;
    const decay = 0.18;
    const sustain = 0.5;
    const release = 0.25;

    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.exponentialRampToValueAtTime(1.0, now + attack);
    gain1.gain.exponentialRampToValueAtTime(sustain, now + attack + decay);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay + release);

    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.exponentialRampToValueAtTime(0.9, now + attack);
    gain2.gain.exponentialRampToValueAtTime(0.4, now + attack + decay);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay + release);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(master);
    gain2.connect(master);

    // Start and stop
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + attack + decay + release + 0.05);
    osc2.stop(now + attack + decay + release + 0.05);

    // Fade master out a bit after
    master.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay + release + 0.1);

    // Close context after sound finishes (some browsers may ignore close)
    setTimeout(() => {
      try {
        ctx.close();
      } catch (e) {
        // ignore
      }
    }, (attack + decay + release + 0.2) * 1000);
  } catch (e) {
    // silently ignore if Audio API not available
  }
}

export default playPermissionAlert;
