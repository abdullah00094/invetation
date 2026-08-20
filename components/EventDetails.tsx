"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";

export function EventDetails() {
  return (
    <section id="details" className="py-20 md:py-32 bg-[var(--color-white)] text-center flex flex-col items-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 w-full flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="font-pt-serif font-bold text-[var(--color-terracotta)] text-2xl md:text-5xl uppercase tracking-[0.15em] mb-12">
            THE <br/> BIG DAY <br/> DETAILS
          </h2>
          
          <div className="flex flex-col space-y-6 md:space-y-8">
            <p className="font-pt-serif font-bold text-[var(--color-terracotta)] text-xl md:text-4xl uppercase tracking-[0.1em]">
              {site.displayDate}
            </p>
            
            <p className="font-pt-serif font-bold text-[var(--color-terracotta)] text-xl md:text-4xl uppercase tracking-[0.1em]">
              At {site.displayTime}
            </p>
            
            <div className="flex flex-col">
              <p className="font-pt-serif font-bold text-[var(--color-terracotta)] text-xl md:text-3xl uppercase tracking-[0.05em]">
                {site.venue.name}
              </p>
              {site.venue.addressLines.map((line, i) => (
                <p key={i} className="font-pt-serif font-bold text-[var(--color-terracotta)] text-lg md:text-2xl uppercase tracking-[0.05em] mt-2">
                  {line}
                </p>
              ))}
            </div>
            
            {site.venue.mapUrl && (
              <a 
                href={site.venue.mapUrl} 
                target="_blank" 
                rel="noreferrer"
                className="mt-8 font-pt-serif font-bold inline-block border-b-2 border-[var(--color-terracotta)] text-[var(--color-terracotta)] text-2xl md:text-4xl hover:text-[var(--color-brown)] hover:border-[var(--color-brown)] transition-colors pb-1 uppercase tracking-[0.1em]"
              >
                Location
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 md:mt-32 flex flex-col items-center w-full"
        >
          <h3 className="font-pinyon text-5xl md:text-8xl text-[var(--color-terracotta)] mb-8">
            {site.couple.first} & {site.couple.second}
          </h3>
          <p className="font-pinyon text-3xl md:text-6xl text-[var(--color-rosegold)] mt-8">
            See you<br/>there !
          </p>
        </motion.div>

      </div>
    </section>
  );
}
