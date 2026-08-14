"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInvitationAmbientAudio } from "@/components/InvitationAmbientAudio";
import { site } from "@/data/site";
import { unlockCelebrationAudio } from "@/lib/celebration-audio";
import { dispatchInvitationOpen } from "@/lib/site-events";

export function CurtainOpeningScene({ onOpen }: { onOpen: () => void }) {
  const { startAfterOpeningClick } = useInvitationAmbientAudio();
  const reduceMotion = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const [mounted, setMounted] = useState(true);
  const finishTimer = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => () => {
    if (finishTimer.current !== null) window.clearTimeout(finishTimer.current);
  }, []);

  const openCurtains = () => {
    if (opening) return;
    startAfterOpeningClick();
    unlockCelebrationAudio();
    dispatchInvitationOpen();
    setOpening(true);
    const revealDelay = reduceMotion ? 320 : 1320;
    finishTimer.current = window.setTimeout(() => {
      onOpen();
      document.documentElement.style.overflow = "";
      setMounted(false);
    }, revealDelay);
  };

  const panelTransition = reduceMotion
    ? { duration: 0.32, ease: "easeOut" as const }
    : { duration: 1.35, ease: [0.76, 0, 0.24, 1] as const };

  return (
      <AnimatePresence>
        {mounted && (
          <motion.section
            className="fixed inset-0 z-[100] overflow-hidden bg-[var(--color-paper)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="curtain-title"
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.45 }}
            {...(opening ? { inert: true } : {})}
          >
            <h1 id="curtain-title" className="sr-only">Open the garden countdown experience</h1>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,#fffaf0_0%,#f3e7d2_48%,#cfb68e_100%)]" aria-hidden />
            <motion.div
              className="curtain-seam-light"
              initial={false}
              animate={opening ? { scaleX: reduceMotion ? 18 : 70, opacity: [0.45, 1, 0] } : { scaleX: 1, opacity: 0.42 }}
              transition={reduceMotion ? { duration: 0.3 } : { duration: 1.25, ease: [0.6, 0, 0.25, 1] }}
              aria-hidden
            />

            {(["left", "right"] as const).map((side) => (
              <motion.div
                key={side}
                className={`curtain-panel curtain-panel--${side}`}
                initial={false}
                animate={opening ? { x: side === "left" ? "-96%" : "96%" } : { x: 0 }}
                transition={panelTransition}
                aria-hidden
              >
                <div className="curtain-folds" />
                <div className="curtain-tassel" />
              </motion.div>
            ))}

            <motion.div
              className="curtain-valance"
              animate={opening ? { y: "-105%", opacity: 0.75 } : { y: 0, opacity: 1 }}
              transition={panelTransition}
              aria-hidden
            />

            <motion.div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]"
              animate={opening ? { opacity: 0, scale: reduceMotion ? 1 : 0.96 } : { opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0.18 : 0.42 }}
            >
              <p className="mb-5 font-serif text-lg italic tracking-wide text-[#fff7ed]/80 sm:text-xl">The garden is waiting</p>
              <button
                type="button"
                onClick={openCurtains}
                aria-label="Open the garden and countdown experience"
                className="min-h-14 min-w-[12.5rem] rounded-full border border-[#f5d9bd]/55 bg-[#fff9ef]/95 px-10 py-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[var(--color-ink)] shadow-[0_14px_50px_rgba(48,20,25,.3)] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fff8ec] active:translate-y-0"
              >
                {site.opening.tapEn}
              </button>
              <p className="mt-5 max-w-60 text-center font-sans text-[0.65rem] leading-relaxed tracking-[0.08em] text-[#fff7ed]/75">Tap to begin our walk together</p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
  );
}
