"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function GardenStory() {
  const scene = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["24svh", "-18svh"]);
  const x = useTransform(scrollYProgress, [0, 0.45, 1], ["-54%", "-47%", "-50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.66]);
  const pathGlow = useTransform(scrollYProgress, [0, 0.75, 1], [0.25, 0.65, 0.95]);
  const gardenY = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const frontX = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  return (
    <section ref={scene} className="garden-story relative h-[220svh] min-h-[75rem]" aria-label="A walk through the garden">
      <div className="sticky top-0 h-svh min-h-[32rem] overflow-hidden bg-[#e9d6b5]">
        <motion.div className="garden-art" style={reduceMotion ? undefined : { y: gardenY }} aria-hidden>
          <Image src="/garden-golden-hour.png" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </motion.div>
        <div className="garden-sky-glaze" aria-hidden />
        <motion.div className="garden-path-glow" style={{ opacity: reduceMotion ? 0.65 : pathGlow }} aria-hidden />
        <div className="garden-path" aria-hidden />
        <div className="garden-foliage garden-foliage--back" aria-hidden />
        <motion.div className="garden-foliage garden-foliage--mid" style={reduceMotion ? undefined : { y: midY }} aria-hidden />
        <div className="garden-roses garden-roses--left" aria-hidden />
        <div className="garden-roses garden-roses--right" aria-hidden />

        <div className="absolute inset-x-0 top-[max(2rem,env(safe-area-inset-top))] z-20 mx-auto px-5 text-center">
          <motion.p
            className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#455447]"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }}
          >Scroll to walk with us</motion.p>
          <p className="mt-2 font-serif text-[clamp(1.9rem,7vw,3.8rem)] italic leading-none text-[#423a32]">Toward a beautiful beginning</p>
        </div>

        <motion.div
          className="grooms-wrap absolute bottom-[12%] left-1/2 z-30"
          style={reduceMotion ? { x: "-50%", y: "1svh", scale: 0.78 } : { x, y, scale }}
        >
          <div className="groom-bob"><Image src="/man-woman-walking.png" alt="A man and woman walking hand in hand through the garden" fill priority sizes="(max-width: 640px) 48vw, 24vw" className="object-contain" /></div>
        </motion.div>

        <motion.div className="garden-foliage garden-foliage--front" style={reduceMotion ? undefined : { x: frontX }} aria-hidden />
        <div className="absolute inset-x-0 bottom-0 z-40 h-24 bg-gradient-to-t from-[#334a35]/70 to-transparent" aria-hidden />
        <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 text-center" aria-hidden>
          <span className="block h-8 w-px bg-[#fff8e8]/65" />
        </div>
      </div>
    </section>
  );
}
