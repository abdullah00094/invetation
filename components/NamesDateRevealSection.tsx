import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { SectionContainer } from "@/components/SectionContainer";

/** Step 6 — scroll: names + date only, stronger editorial treatment before invitation copy */
export function NamesDateRevealSection() {
  return (
    <SectionContainer id="names-date" className="bg-[color-mix(in_oklab,var(--color-surface)_35%,transparent)]">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-balance font-serif text-[clamp(2.25rem,7.5vw,3.75rem)] font-medium leading-[1.06] tracking-tight text-[var(--color-ink)]">
            {site.couple.names[0]}
            <span className="mx-2.5 inline-block bg-gradient-to-r from-[var(--color-rose)] to-[color-mix(in_oklab,var(--color-rose)_72%,var(--color-gold))] bg-clip-text font-light text-transparent sm:mx-3.5">
              {site.couple.joiner}
            </span>
            {site.couple.names[1]}
          </p>
          <div className="mx-auto mt-12 max-w-xs sm:max-w-md">
            <div
              className="mx-auto h-px w-28 bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--color-gold)_52%,transparent)] to-transparent sm:w-36"
              aria-hidden
            />
            <p className="mt-10 font-serif text-[clamp(1.35rem,4.5vw,2.25rem)] font-medium tracking-[0.02em] text-[var(--color-ink)]">
              {site.displayDate}
            </p>
          </div>
        </div>
      </Reveal>
    </SectionContainer>
  );
}
