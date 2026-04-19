"use client";

import { motion, useReducedMotion } from "framer-motion";

type ScrollIndicatorProps = {
  className?: string;
};

/** Soft scroll cue — gentle vertical motion, respects reduced motion */
export function ScrollIndicator({ className = "" }: ScrollIndicatorProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`} aria-hidden>
      <span className="font-sans text-[0.58rem] font-medium uppercase tracking-[0.42em] text-[var(--color-ink-muted)]">
        Scroll
      </span>
      <motion.div
        className="flex flex-col items-center"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, 5, 0],
              }
        }
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
        }}
      >
        <span className="block h-9 w-px shrink-0 bg-gradient-to-b from-[color-mix(in_oklab,var(--color-ink)_20%,transparent)] to-[color-mix(in_oklab,var(--color-gold)_40%,transparent)]" />
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="mt-0.5 text-[var(--color-rose-deep)]"
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
