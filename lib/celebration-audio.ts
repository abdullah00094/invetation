/**
 * Browser autoplay rules: AudioContext must be created/resumed after a user gesture.
 * Opening CTA calls `unlockCelebrationAudio()`; end celebration calls `playCelebrationChime()`.
 */

let ctx: AudioContext | null = null;

export function unlockCelebrationAudio(): void {
  if (typeof window === "undefined") return;
  try {
    if (ctx && ctx.state !== "closed") {
      void ctx.resume();
      return;
    }
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    void ctx.resume();
  } catch {
    /* blocked or unsupported */
  }
}

export function isCelebrationAudioUnlocked(): boolean {
  return ctx !== null && ctx.state !== "closed";
}

/** Short, soft two-note chime — no external file, fails silently if blocked */
export function playCelebrationChime(): void {
  if (!ctx || ctx.state === "closed") return;
  try {
    void ctx.resume();
    const t = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, t);
    master.gain.exponentialRampToValueAtTime(0.042, t + 0.05);
    master.gain.exponentialRampToValueAtTime(0.0001, t + 1.15);
    master.connect(ctx.destination);

    const playNote = (freq: number, start: number, dur: number) => {
      const osc = ctx!.createOscillator();
      const g = ctx!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(0.065, start + 0.035);
      g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
      osc.connect(g);
      g.connect(master);
      osc.start(start);
      osc.stop(start + dur + 0.05);
    };

    playNote(392, t, 0.35); // G4
    playNote(523.25, t + 0.22, 0.45); // C5
  } catch {
    /* ignore */
  }
}
