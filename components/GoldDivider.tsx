"use client";

import { motion } from "framer-motion";

export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center items-center w-full my-8 ${className}`}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-24 h-px bg-[var(--color-gold-muted)]"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="mx-3 w-1.5 h-1.5 rotate-45 border border-[var(--color-gold)]"
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-24 h-px bg-[var(--color-gold-muted)]"
      />
    </div>
  );
}
