"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { GoldDivider } from "./GoldDivider";

export function InvitationCard() {
  return (
    <section className="py-24 px-6 bg-[var(--color-black-elevated)] flex justify-center items-center relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-2xl w-full bg-[var(--color-charcoal)] border border-[var(--color-gold-muted)]/20 p-12 md:p-20 text-center relative shadow-[var(--shadow-soft-lg)]"
      >
        {/* Corner Ornaments (Optional pseudo-elements or subtle borders could go here) */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[var(--color-gold-muted)]/50" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[var(--color-gold-muted)]/50" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[var(--color-gold-muted)]/50" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[var(--color-gold-muted)]/50" />

        <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] block mb-6">
          SAVE THE DATE
        </span>

        <h3 className="font-serif text-3xl md:text-5xl text-[var(--color-ivory)] mb-8">
          Counting the Moments
        </h3>

        <GoldDivider className="my-10" />

        <div className="flex flex-col items-center justify-center gap-4 text-[var(--color-beige)] text-lg md:text-xl font-serif tracking-widest">
          <p className="uppercase">{site.displayDate.split(",")[0]}</p>
          <p className="text-2xl md:text-3xl text-[var(--color-gold)]">
            {site.displayDate.split(",")[1]?.trim()}
          </p>
          <p>{site.displayTime}</p>
        </div>

      </motion.div>
    </section>
  );
}
