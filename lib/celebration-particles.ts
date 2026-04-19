/** Refined closure moment — sparse, small, low-contrast drifts (not confetti-cannon). */

export type BurstParticle = {
  id: string;
  side: "L" | "R";
  topPct: number;
  delay: number;
  size: number;
  tone: "rose" | "gold";
  dx: number;
  dy: number;
};

export function buildCelebrationParticles(count = 10): BurstParticle[] {
  const half = Math.floor(count / 2);
  const out: BurstParticle[] = [];
  for (let i = 0; i < half; i++) {
    out.push({
      id: `L-${i}`,
      side: "L",
      topPct: 28 + (i / Math.max(half, 1)) * 48 + (i % 2),
      delay: i * 0.045,
      size: 2 + (i % 2),
      tone: i % 2 === 0 ? "rose" : "gold",
      dx: 14 + (i % 3) * 5,
      dy: -18 - (i % 4) * 4,
    });
  }
  for (let i = 0; i < count - half; i++) {
    out.push({
      id: `R-${i}`,
      side: "R",
      topPct: 30 + (i / Math.max(count - half, 1)) * 44,
      delay: i * 0.05,
      size: 2 + (i % 2),
      tone: i % 2 === 1 ? "rose" : "gold",
      dx: -(16 + (i % 3) * 5),
      dy: -16 - (i % 4) * 4,
    });
  }
  return out;
}
