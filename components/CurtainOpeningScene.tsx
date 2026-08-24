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
  const timer = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = ""; };
  }, []);

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);

  const openInvitation = () => {
    if (opening) return;
    startAfterOpeningClick();
    unlockCelebrationAudio();
    dispatchInvitationOpen();
    setOpening(true);
    timer.current = window.setTimeout(() => {
      onOpen();
      document.documentElement.style.overflow = "";
      setMounted(false);
    }, reduceMotion ? 280 : 1100);
  };

  return (
    <AnimatePresence>
      {mounted && (
        <motion.section className="invitation-cover fixed inset-0 z-[100] overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cover-title" exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? .18 : .5 }} {...(opening ? { inert: true } : {})}>
          <div className="paper-light" aria-hidden />
          <div className="floral-cluster floral-cluster--top" aria-hidden><i/><i/><i/><b/><b/></div>
          <div className="floral-cluster floral-cluster--bottom" aria-hidden><i/><i/><i/><b/><b/></div>
          <motion.div className="invitation-sheet" animate={opening ? { y: reduceMotion ? -20 : "-115%", opacity: 0, rotateX: reduceMotion ? 0 : -7 } : { y: 0, opacity: 1, rotateX: 0 }} transition={{ duration: reduceMotion ? .26 : 1.05, ease: [0.72, 0, 0.22, 1] }}>
            <div className="invitation-frame" aria-hidden />
            <div className="cover-copy">
              <p className="cover-kicker">Together with joy</p>
              <h1 id="cover-title" className="cover-names">Abdullah <span>&amp;</span> Yousra</h1>
              <div className="cover-flourish" aria-hidden><span>♡</span></div>
              <p className="cover-event">Katb Al-Kitab ceremony </p>
              <p className="cover-date">Sunday · October 4 · 2026</p>
              <p className="cover-time">7:00 PM</p>
              <button type="button" onClick={openInvitation} className="seal-button" aria-label="Open Abdullah and Yousra's Katb Al-Kitab ceremony invitation">
                <span aria-hidden>YA</span><strong>{site.opening.tapEn}</strong>
              </button>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
