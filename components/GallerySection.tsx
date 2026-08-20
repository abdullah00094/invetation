"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/data/site";

export function GallerySection() {
  if (!site.gallery) return null;

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[var(--color-black-elevated)] overflow-hidden">
      <div className="max-w-[var(--container-xl)] mx-auto px-6">
        
        <div className="text-center mb-20">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] block mb-4">
            MOMENTS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-ivory)]">
            Captured Memories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-center">
          {site.gallery.map((img, index) => {
            // Apply different heights and offsets for an editorial masonry feel
            const isLarge = index % 4 === 0;
            const isMedium = index % 4 === 1 || index % 4 === 3;
            
            let heightClass = "aspect-square";
            if (isLarge) heightClass = "aspect-[3/4]";
            else if (isMedium) heightClass = "aspect-[4/5]";
            
            const translateY = index % 2 !== 0 ? "lg:translate-y-16" : "";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                className={`relative w-full ${heightClass} ${translateY} border border-[var(--color-gold-muted)]/20 p-2 lg:p-3 bg-[var(--color-charcoal)] group`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
