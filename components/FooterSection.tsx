"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { GoldDivider } from "./GoldDivider";

export function FooterSection() {
  return (
    <footer className="py-20 md:py-32 bg-[var(--color-black-elevated)] text-center relative border-t border-[var(--color-gold-muted)]/20">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1 }}
        className="max-w-[var(--container-md)] mx-auto px-6"
      >
        
        {/* Monogram / Top Logo */}
        <div className="font-serif text-3xl text-[var(--color-gold)] mb-12">
          {site.couple.first[0]} <span className="text-xl">&</span> {site.couple.second[0]}
        </div>
        
        <h2 className="font-serif text-5xl md:text-7xl text-[var(--color-ivory)] mb-6">
          {site.footer.names}
        </h2>
        
        <p className="font-serif text-xl md:text-2xl text-[var(--color-gold-muted)] tracking-widest mb-12">
          {site.footer.date}
        </p>
        
        <GoldDivider className="mb-12" />
        
        <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-beige)] mb-16">
          {site.footer.closing}
        </p>

        {/* Footer Nav */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <a href="#hero" className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors">
            Home
          </a>
          <a href="#story" className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors">
            Story
          </a>
          <a href="#details" className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors">
            Details
          </a>
          <a href="#gallery" className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors">
            Gallery
          </a>
          <a href="#rsvp" className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors">
            RSVP
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
