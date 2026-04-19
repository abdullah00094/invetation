import Image from "next/image";
import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeading } from "@/components/SectionHeading";

export function GallerySection() {
  return (
    <SectionContainer id="gallery">
      <Reveal>
        <SectionHeading
          eyebrow="Moments"
          title="A quiet gallery"
          subtitle="Soft light, small joys — a glimpse of us."
        />
      </Reveal>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
        {site.gallery.map((item, i) => (
          <Reveal key={item.src} delay={0.04 * i} withScale={false} className="group">
            <figure className="overflow-hidden rounded-[var(--radius-panel)] bg-[var(--color-surface)] shadow-soft ring-1 ring-[color-mix(in_oklab,var(--color-ink)_4%,transparent)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 46vw, 22vw"
                  className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </figure>
          </Reveal>
        ))}
      </div>
    </SectionContainer>
  );
}
