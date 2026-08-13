"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeading } from "@/components/SectionHeading";
import { softTransition } from "@/lib/motion";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getRemaining(target: number, now: number): Remaining {
  const diff = Math.max(0, target - now);
  if (diff === 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, done: false };
}

const labels = ["Days", "Hours", "Minutes", "Seconds"] as const;

const PLACEHOLDER: Remaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  done: false,
};

export function CountdownSection() {
  const target = useMemo(
    () => new Date(site.eventDateIso).getTime(),
    [],
  );
  const reduceMotion = useReducedMotion();
  /** Avoid SSR/client time mismatch (React #418) — use the same initial placeholder. */
  const [remaining, setRemaining] = useState<Remaining>(PLACEHOLDER);

  useEffect(() => {
    const tick = () => setRemaining(getRemaining(target, Date.now()));
    const initialTick = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(initialTick);
      window.clearInterval(id);
    };
  }, [target]);

  const values = [
    remaining.days,
    remaining.hours,
    remaining.minutes,
    remaining.seconds,
  ] as const;

  return (
    <SectionContainer
      id="countdown"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-[radial-gradient(ellipse_75%_55%_at_4%_18%,color-mix(in_oklab,var(--color-rose)_17%,transparent),transparent_68%),radial-gradient(ellipse_65%_50%_at_96%_82%,color-mix(in_oklab,var(--color-gold)_13%,transparent),transparent_70%)] pb-[max(4rem,env(safe-area-inset-bottom))] pt-[max(4rem,env(safe-area-inset-top))] sm:py-24 [&>div]:relative [&>div]:z-10 [&>div]:max-w-[44rem]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--color-gold)_30%,transparent)] to-transparent"
      />

      <div className="mx-auto w-full">
        <Reveal>
          <SectionHeading
            eyebrow="Save the date"
            title="Counting the moments"
            subtitle="Until Sunday, October 4, 2026 at 7:00 PM — when we celebrate together."
          />
        </Reveal>

        <Reveal delay={0.06}>
          {remaining.done ? (
            <p className="mx-auto max-w-md text-center font-serif text-xl font-medium leading-snug text-[var(--color-ink)] sm:text-2xl">
              The day has arrived — we are celebrating with full hearts.
            </p>
          ) : (
            <div
              className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
              aria-label="Time remaining until Sunday, October 4, 2026 at 7:00 PM"
              role="timer"
            >
              {values.map((value, i) => (
                <motion.div
                  key={labels[i]}
                  className="flex min-h-[7rem] flex-col justify-center rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--color-surface)_88%,var(--color-paper))] px-2 py-5 text-center shadow-soft ring-1 ring-[color-mix(in_oklab,var(--color-rose-deep)_12%,transparent)] sm:min-h-[8.25rem] sm:px-3 sm:py-6"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ ...softTransition, delay: 0.04 * i }}
                >
                  <p className="font-serif text-[clamp(2.25rem,8vw,3.5rem)] tabular-nums leading-none tracking-[-0.025em] text-[var(--color-ink)]">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-sans text-[0.6rem] font-medium uppercase tracking-[0.26em] text-[var(--color-ink-muted)]">
                    {labels[i]}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </SectionContainer>
  );
}
