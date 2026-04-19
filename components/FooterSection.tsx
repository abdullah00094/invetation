import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { SectionContainer } from "@/components/SectionContainer";

export function FooterSection() {
  return (
    <SectionContainer id="thanks" airy={false} className="pb-[max(6rem,env(safe-area-inset-bottom))] pt-4">
      <Reveal>
        <footer className="border-t border-[color-mix(in_oklab,var(--color-ink)_7%,transparent)] pt-16 text-center sm:pt-20">
          <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.38em] text-[var(--color-ink-muted)]">
            {site.footer.line}
          </p>
          <p className="mt-5 font-serif text-[clamp(1.85rem,5vw,2.75rem)] font-medium tracking-tight text-[var(--color-ink)]">
            {site.footer.names}
          </p>
          <p className="mx-auto mt-6 max-w-sm text-pretty font-sans text-[0.9375rem] leading-[1.85] text-[var(--color-ink-muted)] sm:max-w-md sm:text-base">
            {site.footer.closing}
          </p>
          <p
            className="mt-14 font-sans text-[0.6rem] tracking-[0.2em] text-[var(--color-ink-muted)]/80"
            suppressHydrationWarning
          >
            {new Date().getFullYear()}
          </p>
        </footer>
      </Reveal>
    </SectionContainer>
  );
}
