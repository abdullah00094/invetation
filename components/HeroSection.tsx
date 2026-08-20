"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100svh] w-full flex items-center justify-center py-20 bg-[var(--color-white)] overflow-hidden">
      
      <div className="max-w-4xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center z-10 relative">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <span className="block font-pt-serif font-bold text-[var(--color-rosegold)] uppercase tracking-[0.25em] text-sm md:text-lg mb-8 md:mb-12">
            we are getting married
          </span>
          
          <h1 className="font-pinyon text-7xl md:text-9xl text-[var(--color-rosegold)] leading-tight flex flex-col items-center">
            <span>{site.couple.first}</span>
            <span className="text-5xl md:text-7xl my-2">&</span>
            <span>{site.couple.second}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center mt-12 md:mt-20 space-y-6"
        >
          <h2 className="font-pt-serif font-bold text-[var(--color-rosegold)] uppercase tracking-[0.3em] text-base md:text-xl">
            OUR WEDDING
          </h2>
          
          <p className="font-pt-serif text-[var(--color-rosegold)] text-2xl md:text-3xl tracking-[0.1em]">
            04 | 10 | 2026
          </p>
          
          <h3 className="font-pt-serif font-bold text-[var(--color-rosegold)] uppercase tracking-[0.2em] text-lg md:text-2xl mt-4">
            SAVE THE DATE
          </h3>
        </motion.div>

      </div>
    </section>
  );
}
