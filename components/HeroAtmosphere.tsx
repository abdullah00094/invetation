"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { INVITATION_OPEN_EVENT } from "@/lib/site-events";
import { mistIntro } from "@/lib/motion";

type HeroAtmosphereProps = {
  scrollRootRef: RefObject<HTMLElement | null>;
};

type Layer = {
  /** position as % of container */
  left: string;
  top: string;
  /** blob size */
  w: string;
  h: string;
  /** soft fill — uses design tokens */
  fill: string;
  /** intro motion offsets (%) */
  toX: string;
  toY: string;
  delay: number;
};

const LAYERS: Layer[] = [
  {
    left: "50%",
    top: "38%",
    w: "min(92vw, 36rem)",
    h: "min(58vh, 30rem)",
    fill: "color-mix(in oklab, var(--color-rose) 42%, var(--color-paper))",
    toX: "-14%",
    toY: "-18%",
    delay: 0,
  },
  {
    left: "12%",
    top: "58%",
    w: "min(78vw, 28rem)",
    h: "min(48vh, 22rem)",
    fill: "color-mix(in oklab, var(--color-paper) 55%, var(--color-gold) 22%)",
    toX: "10%",
    toY: "6%",
    delay: 0.08,
  },
  {
    left: "72%",
    top: "52%",
    w: "min(70vw, 26rem)",
    h: "min(44vh, 20rem)",
    fill: "color-mix(in oklab, var(--color-rose) 28%, white)",
    toX: "12%",
    toY: "-10%",
    delay: 0.14,
  },
  {
    left: "48%",
    top: "72%",
    w: "min(88vw, 32rem)",
    h: "min(36vh, 16rem)",
    fill: "color-mix(in oklab, var(--color-gold) 18%, var(--color-paper))",
    toX: "-6%",
    toY: "14%",
    delay: 0.2,
  },
];

/**
 * Dreamy mist / soft cloud layers over the hero: intro parts after the guest opens the invitation,
 * then drifts subtly with scroll. Purely decorative (pointer-events none).
 */
export function HeroAtmosphere({ scrollRootRef }: HeroAtmosphereProps) {
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onOpen = () => setRevealed(true);
    window.addEventListener(INVITATION_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(INVITATION_OPEN_EVENT, onOpen);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollRootRef,
    offset: ["start start", "end start"],
  });

  const driftY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -28]);
  const driftOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduceMotion ? 1 : 0.35],
  );

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      style={{ y: driftY, opacity: driftOpacity }}
      aria-hidden
    >
      {/* Soft veil — lifts with the blobs */}
      <motion.div
        className="absolute inset-0 bg-[color-mix(in_oklab,var(--color-paper)_55%,transparent)]"
        initial={false}
        animate={
          reduceMotion
            ? { opacity: 0 }
            : revealed
              ? { opacity: 0 }
              : { opacity: 0.45 }
        }
        transition={reduceMotion ? { duration: 0.2 } : mistIntro}
      />

      {LAYERS.map((layer, i) => (
        <motion.div
          key={i}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-[100%] motion-reduce:blur-none ${reduceMotion ? "" : "blur-[36px] sm:blur-[52px]"}`}
          style={{
            left: layer.left,
            top: layer.top,
            width: layer.w,
            height: layer.h,
            background: layer.fill,
            willChange: reduceMotion ? undefined : "transform, opacity",
          }}
          initial={false}
          animate={
            reduceMotion
              ? { opacity: 0.05, x: "0%", y: "0%", scale: 1 }
              : revealed
                ? {
                    opacity: 0.14,
                    x: layer.toX,
                    y: layer.toY,
                    scale: 1.18,
                  }
                : {
                    opacity: 0.52,
                    x: "0%",
                    y: "0%",
                    scale: 1.02,
                  }
          }
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : {
                  ...mistIntro,
                  delay: revealed ? layer.delay : 0,
                }
          }
        />
      ))}
    </motion.div>
  );
}
