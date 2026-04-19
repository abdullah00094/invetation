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
  /** Avoid SSR/client time mismatch (React #418) — show stable placeholders until mounted. */
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState<Remaining>(PLACEHOLDER);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const tick = () => setRemaining(getRemaining(target, Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target, mounted]);

  const display = mounted ? remaining : PLACEHOLDER;

  const values = [
    display.days,
    display.hours,
    display.minutes,
    display.seconds,
  ] as const;

  return (
    <SectionContainer id="countdown">
      <Reveal>
        <SectionHeading
          eyebrow="Save the date"
          title="Counting the moments"
          subtitle="Until we see you — with gratitude and open arms."
        />
      </Reveal>

      <Reveal delay={0.06}>
        {mounted && remaining.done ? (
          <p className="mx-auto max-w-md text-center font-serif text-xl font-medium leading-snug text-[var(--color-ink)] sm:text-2xl">
            The day has arrived — we are celebrating with full hearts.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3.5">
            {values.map((value, i) => (
              <motion.div
                key={labels[i]}
                className="flex min-h-[5.75rem] flex-col justify-center rounded-[var(--radius-card)] bg-[var(--color-surface)] px-2 py-5 text-center shadow-soft ring-1 ring-[color-mix(in_oklab,var(--color-ink)_5%,transparent)] sm:min-h-[6.5rem] sm:px-3 sm:py-6"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ ...softTransition, delay: 0.04 * i }}
              >
                <p className="font-serif text-[clamp(1.75rem,6.5vw,2.35rem)] tabular-nums leading-none tracking-tight text-[var(--color-ink)]">
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
    </SectionContainer>
  );
}
