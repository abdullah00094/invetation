"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeading } from "@/components/SectionHeading";
import { softTransition } from "@/lib/motion";

export function TimelineSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionContainer id="timeline" className="bg-[color-mix(in_oklab,var(--color-surface)_40%,transparent)]">
      <Reveal>
        <SectionHeading
          eyebrow="The evening"
          title="A gentle rhythm"
          subtitle="An unhurried evening in three movements."
        />
      </Reveal>

      <div className="relative mx-auto max-w-xl">
        <div
          aria-hidden
          className="absolute left-[0.4375rem] top-3 bottom-3 w-px bg-[color-mix(in_oklab,var(--color-ink)_8%,transparent)] sm:left-3"
        />
        <ol className="relative space-y-8 sm:space-y-10">
          {site.timeline.map((item, index) => (
            <motion.li
              key={item.title}
              className="grid grid-cols-[auto_1fr] gap-4 sm:gap-7"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ ...softTransition, delay: 0.05 * index }}
            >
              <div className="relative z-[1] flex flex-col items-center pt-1.5">
                <span className="size-2.5 rounded-full bg-[var(--color-rose)]/85 ring-[3px] ring-[var(--color-paper)] sm:size-3" />
              </div>
              <div className="rounded-[var(--radius-panel)] bg-[var(--color-paper)]/90 p-6 shadow-soft ring-1 ring-[color-mix(in_oklab,var(--color-ink)_5%,transparent)] sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-serif text-xl font-medium tracking-tight text-[var(--color-ink)] sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[0.8125rem] font-medium tabular-nums tracking-wide text-[var(--color-rose-deep)]">
                    {item.time}
                  </p>
                </div>
                <p className="mt-3 font-sans text-[0.875rem] leading-relaxed text-[var(--color-ink-muted)] sm:text-[0.9375rem] sm:leading-[1.75]">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </SectionContainer>
  );
}
