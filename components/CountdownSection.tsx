"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/data/site";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const diff = new Date(targetIso).getTime() - new Date().getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(site.eventDateIso));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(site.eventDateIso));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (num: number) => String(num).padStart(2, "0");

  if (!mounted) return null;

  return (
    <section className="py-20 md:py-32 bg-[var(--color-white)] flex flex-col justify-center items-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-4xl px-6 flex flex-col items-center"
      >
        <h2 className="font-pt-serif font-bold text-[var(--color-brown)] uppercase tracking-[0.25em] text-lg md:text-2xl mb-16 text-center">
          UNTILL OUR DAY
        </h2>

        <div className="flex flex-row justify-center items-center w-full gap-x-4 md:gap-x-12">
          
          <TimeBlock value={pad(timeLeft.days)} label="DAYS" />
          
          <TimeBlock value={pad(timeLeft.hours)} label="HOURS" />
          
          <TimeBlock value={pad(timeLeft.minutes)} label="MINUTES" />
          
          <TimeBlock value={pad(timeLeft.seconds)} label="SECONDS" />
        </div>
      </motion.div>
    </section>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="font-sans font-medium text-4xl md:text-6xl text-[var(--color-rosegold)] tabular-nums tracking-widest drop-shadow-sm mb-4">
        {value}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--color-terracotta)] font-bold">
        {label}
      </span>
    </div>
  );
}
