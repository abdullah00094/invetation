"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import coupleImg from "@/public/man-woman-walking.png"; // Fallback if no other img, or we can use a gallery img

export function StorySection() {
  // Using the first gallery image for the story if available
  const storyImg = site.gallery[0]?.src || coupleImg;

  return (
    <section id="story" className="py-24 md:py-32 bg-[var(--color-black)] overflow-hidden">
      <div className="max-w-[var(--container-xl)] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* Left: Image (Asymmetric) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto md:mr-auto md:ml-0 overflow-hidden border border-[var(--color-gold-muted)]/20 p-2">
              <div className="relative w-full h-full bg-[var(--color-charcoal)]">
                {typeof storyImg === 'string' ? (
                  <Image
                    src={storyImg}
                    alt="Our Story"
                    fill
                    className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <Image
                    src={storyImg}
                    alt="Our Story"
                    fill
                    className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Right: Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-6 block">
              OUR STORY
            </span>
            
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-ivory)] mb-8 leading-tight">
              {site.story.heading}
            </h2>
            
            <div className="flex flex-col gap-6 text-[var(--color-beige)] max-w-lg leading-relaxed">
              {site.story.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
