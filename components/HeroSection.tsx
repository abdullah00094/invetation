"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HeroAtmosphere } from "@/components/HeroAtmosphere";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { site } from "@/data/site";
import { INVITATION_OPEN_EVENT } from "@/lib/site-events";
import { softTransition } from "@/lib/motion";

const childEase = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onOpen = () => setRevealed(true);
    window.addEventListener(INVITATION_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(INVITATION_OPEN_EVENT, onOpen);
  }, []);

  const namesDelay = reduceMotion ? 0 : 0.1;
  const subtitleDelay = reduceMotion ? 0 : 0.42;
  const arrowDelay = reduceMotion ? 0 : 0.78;

  return (
    <header
      ref={headerRef}
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(5.5rem,env(safe-area-inset-top))] text-center sm:px-10"
    >
      <HeroAtmosphere scrollRootRef={headerRef} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,color-mix(in_oklab,var(--color-rose)_12%,transparent),transparent_58%),radial-gradient(ellipse_70%_45%_at_90%_80%,color-mix(in_oklab,var(--color-gold)_10%,transparent),transparent)]"
      />

      <div className="relative z-10 flex max-w-[22rem] flex-col items-center sm:max-w-2xl">
        {/* Names first */}
        <motion.h1
          className="text-balance font-serif text-[clamp(2.45rem,9.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)]"
          initial={false}
          animate={
            revealed
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: reduceMotion ? 0 : 14 }
          }
          transition={{
            duration: reduceMotion ? 0.2 : 0.88,
            ease: childEase,
            delay: namesDelay,
          }}
        >
          {site.couple.names[0]}
          <span className="mx-2.5 inline-block bg-gradient-to-r from-[var(--color-rose)] to-[color-mix(in_oklab,var(--color-rose)_70%,var(--color-gold))] bg-clip-text font-light text-transparent sm:mx-3.5">
            {site.couple.joiner}
          </span>
          {site.couple.names[1]}
        </motion.h1>

        <motion.p
          className="mx-auto mt-8 max-w-[21rem] font-sans text-[0.9375rem] leading-[1.82] text-[var(--color-ink-muted)] sm:max-w-md sm:text-[1.05rem] sm:leading-[1.75]"
          initial={false}
          animate={
            revealed
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.985 }
          }
          transition={{
            duration: reduceMotion ? 0.2 : 0.82,
            ease: childEase,
            delay: subtitleDelay,
          }}
        >
          {site.hero.subtitle}
        </motion.p>
      </div>

      <motion.div
        className="relative z-10 mt-[clamp(2.75rem,9vh,4.5rem)]"
        initial={false}
        animate={
          revealed
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: reduceMotion ? 0 : 8 }
        }
        transition={{
          ...softTransition,
          delay: arrowDelay,
        }}
      >
        <ScrollIndicator />
      </motion.div>
    </header>
  );
}
