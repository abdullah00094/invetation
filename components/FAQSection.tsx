"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/data/site";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[var(--color-black-elevated)]">
      <div className="max-w-[var(--container-md)] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] block mb-4">
            GUEST INFORMATION
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-ivory)]">
            Questions & Details
          </h2>
        </div>

        <div className="flex flex-col border-t border-[var(--color-gold-muted)]/30">
          {site.faq.map((item, index) => (
            <div 
              key={index} 
              className="border-b border-[var(--color-gold-muted)]/30 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
              >
                <span className="font-serif text-xl md:text-2xl text-[var(--color-beige)] group-hover:text-[var(--color-gold)] transition-colors pr-8">
                  {item.question}
                </span>
                <span className="text-[var(--color-gold)] text-2xl font-light transition-transform duration-300 transform flex-shrink-0">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="pb-6 text-[var(--color-text-muted)] text-base leading-relaxed pr-8">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
