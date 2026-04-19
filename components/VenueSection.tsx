import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeading } from "@/components/SectionHeading";

export function VenueSection() {
  return (
    <SectionContainer id="venue" className="bg-[color-mix(in_oklab,var(--color-surface)_40%,transparent)]">
      <Reveal>
        <SectionHeading
          eyebrow="Where"
          title={site.venue.name}
          subtitle="Warm, welcoming, softly lit — a setting that feels like us."
        />
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mx-auto max-w-lg rounded-[var(--radius-panel)] bg-[var(--color-paper)]/95 p-8 text-center shadow-soft ring-1 ring-[color-mix(in_oklab,var(--color-ink)_5%,transparent)] sm:p-10">
          <address className="not-italic">
            {site.venue.addressLines.map((line) => (
              <p
                key={line}
                className="font-sans text-[0.9375rem] leading-relaxed text-[var(--color-ink)] sm:text-lg"
              >
                {line}
              </p>
            ))}
          </address>
          <p className="mx-auto mt-7 max-w-sm font-sans text-[0.8125rem] leading-[1.75] text-[var(--color-ink-muted)] sm:max-w-md sm:text-sm">
            {site.venue.note}
          </p>
          <div className="mt-9 flex justify-center sm:mt-10">
            <a
              href={site.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full max-w-[16rem] items-center justify-center rounded-full bg-[var(--color-ink)] px-8 text-[0.8125rem] font-medium tracking-[0.08em] text-[var(--color-paper)] shadow-soft transition-[transform,box-shadow,background-color] duration-500 ease-out hover:bg-[color-mix(in_oklab,var(--color-ink)_88%,white)] hover:shadow-soft-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] active:scale-[0.98] sm:w-auto sm:tracking-wide"
            >
              Open map
            </a>
          </div>
        </div>
      </Reveal>
    </SectionContainer>
  );
}
