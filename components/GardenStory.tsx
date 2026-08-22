"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function GardenStory() {
  const scene = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["22svh", "-15svh"]);
  const x = useTransform(scrollYProgress, [0, .5, 1], ["-53%", "-47%", "-50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, .69]);
  const gardenY = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);

  return (
    <section ref={scene} className="garden-story relative h-[220svh] min-h-[72rem]" aria-label="A walk through the garden">
      <div className="sticky top-0 h-svh min-h-[32rem] overflow-hidden bg-[var(--color-background)]">
        <motion.div className="garden-art" style={reduceMotion ? undefined : { y: gardenY }} aria-hidden><Image src="/garden-golden-hour.png" alt="" fill priority sizes="100vw" className="object-cover object-center" /></motion.div>
        <div className="garden-paper-veil" aria-hidden />
        <div className="garden-line-frame" aria-hidden />
        <div className="garden-petal garden-petal--one" aria-hidden />
        <div className="garden-petal garden-petal--two" aria-hidden />
        <div className="garden-heading">
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 8 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }}>A walk toward our day</motion.p>
          <h2>Yousra <span>&amp;</span> Abdullah</h2><small>Scroll gently</small>
        </div>
        <motion.div className="couple-wrap absolute bottom-[10%] left-1/2 z-30" style={reduceMotion ? { x: "-50%", y: "2svh", scale: .78 } : { x, y, scale }}>
          <div className="couple-walk"><Image src="/man-woman-walking.png" alt="A man and woman walking hand in hand through the garden" fill priority sizes="(max-width: 640px) 52vw, 25vw" className="object-contain" /></div>
        </motion.div>
        <div className="garden-bottom-fade" aria-hidden />
      </div>
    </section>
  );
}
