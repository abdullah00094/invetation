"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { softTransition } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Slight scale on enter (disabled when reduced motion is on) */
  withScale?: boolean;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  withScale = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 14, scale: withScale ? 0.992 : 1 }
      }
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -6% 0px" }}
      transition={{ ...softTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
