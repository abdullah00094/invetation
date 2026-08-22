"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/data/site";

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
    <section id="countdown" className="countdown-paper relative isolate flex min-h-svh items-center overflow-hidden">
      <div className="countdown-floral countdown-floral--top" aria-hidden><i/><i/><i/><b/></div>
      <div className="countdown-floral countdown-floral--bottom" aria-hidden><i/><i/><i/><b/></div>
      <div className="countdown-inner">
        <motion.p className="countdown-kicker" initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }}>Until our day</motion.p>
        <div className="countdown-rule" aria-hidden><span>♡</span></div>
        <h2 className="countdown-title">Counting the moments</h2>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}>
          {remaining.done ? (
            <p className="countdown-arrived">
              The day has arrived — we are celebrating with full hearts.
            </p>
          ) : (
            <div className="countdown-values" aria-label="Time remaining until Sunday, October 4, 2026 at 7:00 PM" role="timer">
              {values.map((value, i) => (
                <div className="countdown-unit" key={labels[i]}><p>{String(value).padStart(2, "0")}</p><span>{labels[i]}</span></div>
              ))}
            </div>
          )}
        </motion.div>
        <div className="countdown-date"><p>Sunday · October 4 · 2026</p><span>7:00 PM · Cairo</span></div>
        <p className="countdown-closing">Yousra <span>&amp;</span> Abdullah</p>
      </div>
    </section>
  );
}
