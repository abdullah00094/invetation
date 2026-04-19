"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { OPENING_BALLOONS, type BalloonSpec } from "@/lib/opening-balloons";
import { dispatchInvitationOpen } from "@/lib/site-events";
import { mistIntro, quickTransition } from "@/lib/motion";
import { useInvitationAmbientAudio } from "@/components/InvitationAmbientAudio";
import { unlockCelebrationAudio } from "@/lib/celebration-audio";

/** Matte, desaturated ellipses — soft highlight via inset shadow on the node */
const BALLOON_BY_TONE: Record<BalloonSpec["tone"], string> = {
  rose:
    "bg-gradient-to-b from-[#e8e0e0] via-[#c4abab] to-[#9a8d8d]",
  gold:
    "bg-gradient-to-b from-[#eae6dc] via-[#c9c0a8] to-[#9e9688]",
  cream:
    "bg-gradient-to-b from-[#f4f2ec] via-[#e4e0d6] to-[#cfc9be]",
};

function CursorHint({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
    >
      <path
        d="M9 10l14 8-6 1.5L9 26V10z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        className="text-[color-mix(in_oklab,var(--color-ink)_32%,transparent)]"
      />
      <path
        d="M9 10l14 8-6 1.5L9 26V10z"
        fill="color-mix(in_oklab,var(--color-paper)_82%,transparent)"
        className="opacity-90"
      />
    </svg>
  );
}

export function OpeningBalloonsScene() {
  const { startAfterOpeningClick } = useInvitationAmbientAudio();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "";
      return;
    }
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const handleOpen = () => {
    startAfterOpeningClick();
    unlockCelebrationAudio();
    const active = document.activeElement;
    if (active instanceof HTMLElement) active.blur();
    dispatchInvitationOpen();
    setOpen(true);
    window.setTimeout(() => setMounted(false), reduceMotion ? 240 : 1320);
  };

  return (
    <AnimatePresence>
      {mounted ? (
        <motion.div
          key="opening-balloons"
          role="dialog"
          aria-modal="true"
          aria-labelledby="opening-balloons-title"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[var(--color-paper)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={quickTransition}
          {...(open ? { inert: true } : {})}
        >
          <h2 id="opening-balloons-title" className="sr-only">
            Open invitation
          </h2>

          {OPENING_BALLOONS.map((b, i) => (
            <motion.div
              key={i}
              className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-[999px] ${BALLOON_BY_TONE[b.tone]}`}
              style={{
                left: b.left,
                top: b.top,
                width: b.w,
                height: b.h,
                zIndex: b.z,
                boxShadow:
                  "inset 0 22px 38px rgba(255,255,255,0.14), inset 0 -16px 28px rgba(55,48,44,0.06), 0 12px 40px -16px rgba(41,36,31,0.12)",
              }}
              initial={false}
              animate={
                reduceMotion
                  ? open
                    ? { opacity: 0, x: b.exitX, y: b.exitY, rotate: b.exitRotate * 0.35, scale: 1.04 }
                    : { opacity: b.opacity * 0.9, x: "0px", y: "0px", rotate: 0, scale: 1 }
                  : open
                    ? {
                        opacity: 0,
                        x: b.exitX,
                        y: b.exitY,
                        rotate: b.exitRotate * 0.85,
                        scale: 1.06,
                      }
                    : {
                        opacity: [b.opacity * 0.94, b.opacity, b.opacity * 0.97],
                        y: [0, -b.drift, 0],
                        x: [0, b.drift * 0.28, 0],
                        rotate: [0, b.rotate * 0.35, -b.rotate * 0.28, 0],
                        scale: 1,
                      }
              }
              transition={
                reduceMotion
                  ? { duration: 0.28 }
                  : open
                    ? { ...mistIntro, delay: b.delay }
                    : {
                        duration: b.floatSec,
                        repeat: Infinity,
                        ease: [0.45, 0, 0.55, 1],
                        delay: b.delay,
                      }
              }
              aria-hidden
            />
          ))}

          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_56%_at_50%_48%,transparent_0%,color-mix(in_oklab,var(--color-paper)_55%,transparent)_100%)]"
            initial={false}
            animate={{ opacity: open ? 0 : reduceMotion ? 0.18 : 0.28 }}
            transition={reduceMotion ? { duration: 0.2 } : mistIntro}
            aria-hidden
          />

          <motion.div
            className="relative z-20 flex flex-col items-center px-6"
            initial={false}
            animate={
              open
                ? reduceMotion
                  ? { opacity: 0, scale: 1 }
                  : { opacity: 0, scale: 0.97, filter: "blur(5px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={mistIntro}
          >
            <motion.div
              className="mb-5"
              animate={
                reduceMotion || open
                  ? undefined
                  : { y: [0, 3, 0], opacity: [0.9, 1, 0.9] }
              }
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <CursorHint className="opacity-80" />
            </motion.div>

            <motion.button
              type="button"
              onClick={handleOpen}
              aria-label="Tap to open the invitation"
              className="relative flex min-h-[3.75rem] min-w-[12.5rem] max-w-[92vw] items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--color-ink)_8%,transparent)] bg-[color-mix(in_oklab,var(--color-paper)_72%,transparent)] px-12 py-4 text-center shadow-[0_2px_24px_-8px_rgba(41,36,31,0.12)] ring-1 ring-[color-mix(in_oklab,var(--color-rose)_18%,transparent)] backdrop-blur-[2px] transition-[box-shadow,transform] duration-700 hover:shadow-[0_8px_36px_-12px_rgba(41,36,31,0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] active:scale-[0.99] sm:min-w-[14rem]"
              animate={
                reduceMotion || open
                  ? undefined
                  : {
                      boxShadow: [
                        "0 2px 24px -8px rgba(41,36,31,0.12), 0 0 0 0 rgba(212,165,165,0)",
                        "0 4px 32px -10px rgba(41,36,31,0.1), 0 0 0 9px rgba(212,165,165,0.06)",
                        "0 2px 24px -8px rgba(41,36,31,0.12), 0 0 0 0 rgba(212,165,165,0)",
                      ],
                    }
              }
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[var(--color-ink)]">
                {site.opening.tapEn}
              </span>
            </motion.button>

            <p className="mt-7 max-w-[15rem] text-center font-sans text-[0.64rem] leading-relaxed tracking-wide text-[var(--color-ink-muted)]">
              {site.opening.hint}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
