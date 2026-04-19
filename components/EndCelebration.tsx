"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { playCelebrationChime, isCelebrationAudioUnlocked } from "@/lib/celebration-audio";
import { buildCelebrationParticles } from "@/lib/celebration-particles";

const PARTICLE_COUNT = 10;

/**
 * Quiet closure gesture: a few soft motes drift inward from the sides — not confetti.
 * Chime only after opening CTA has unlocked audio.
 */
export function EndCelebration() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);
  const particles = useMemo(() => buildCelebrationParticles(PARTICLE_COUNT), []);

  const trigger = useCallback(() => {
    if (done) return;
    setDone(true);
    setActive(true);
    if (!reduceMotion && isCelebrationAudioUnlocked()) {
      playCelebrationChime();
    }
    window.setTimeout(() => setActive(false), 2400);
  }, [done, reduceMotion]);

  useEffect(() => {
    const el = document.getElementById("thanks");
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.32) {
            trigger();
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: [0.32, 0.45] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger]);

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      aria-hidden
    >
      {active
        ? particles.map((p) => (
            <motion.span
              key={p.id}
              className={`absolute rounded-full blur-[0.35px] ${
                p.tone === "rose"
                  ? "bg-gradient-to-br from-[#ebe3e3] to-[#c5abab]"
                  : "bg-gradient-to-br from-[#ebe8df] to-[#c4bb9f]"
              }`}
              style={{
                left: p.side === "L" ? "0%" : undefined,
                right: p.side === "R" ? "0%" : undefined,
                top: `${p.topPct}%`,
                width: p.size,
                height: p.size,
                opacity: 0.85,
                boxShadow: "0 0 12px rgba(249,248,243,0.35)",
              }}
              initial={{ opacity: 0, scale: 0.85, x: p.side === "L" ? 6 : -6, y: 4 }}
              animate={{
                opacity: [0, 0.42, 0.22, 0],
                scale: [0.85, 1, 0.95, 0.75],
                x: p.side === "L" ? p.dx + 6 : p.dx - 6,
                y: p.dy,
              }}
              transition={{
                duration: 2.15,
                ease: [0.33, 1, 0.32, 1],
                delay: p.delay,
              }}
            />
          ))
        : null}
    </div>
  );
}
