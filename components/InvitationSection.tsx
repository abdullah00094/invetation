import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeading } from "@/components/SectionHeading";

export function InvitationSection() {
  return (
    <SectionContainer id="invitation" className="bg-[color-mix(in_oklab,var(--color-surface)_40%,transparent)]">
      <Reveal>
        <SectionHeading eyebrow="Invitation" title={site.invitation.heading} />
      </Reveal>
      <Reveal delay={0.06} className="mx-auto max-w-lg space-y-8 text-center sm:max-w-xl sm:space-y-9">
        {site.invitation.paragraphs.map((p) => (
          <p
            key={p}
            className="text-pretty font-sans text-[0.9375rem] leading-[1.9] text-[var(--color-ink-muted)] sm:text-[1.0625rem] sm:leading-[1.88]"
          >
            {p}
          </p>
        ))}
      </Reveal>
    </SectionContainer>
  );
}
