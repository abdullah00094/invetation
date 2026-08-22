import Image from "next/image";
import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function LocationSection() {
  return (
    <section className="story-paper venue-paper" aria-labelledby="location-heading">
      <div className="story-frame" aria-hidden />
      <div className="story-floral story-floral--venue" aria-hidden><i/><i/><i/><b/></div>
      <div className="story-petal story-petal--one" aria-hidden />
      <div className="story-petal story-petal--two" aria-hidden />
      <div className="story-section-inner">
        <Reveal withScale={false}>
          <p className="story-kicker">The celebration</p>
          <div className="story-rule" aria-hidden><span>♡</span></div>
          <h2 id="location-heading" className="story-title">Location</h2>
          <p className="venue-name">{site.venue.name}</p>
        </Reveal>

        {/* <Reveal className="venue-map-wrap" delay={0.08}>
          <div className="venue-map-frame">
            <Image
              src="/el-mwasah-venue-map.png"
              alt="Satellite map showing El Mwasah Wedding Venue & Elderly Care and its location pin"
              width={1280}
              height={720}
              sizes="(max-width: 768px) 92vw, 800px"
              className="venue-map-image"
            />
          </div>
        </Reveal> */}

        <Reveal delay={0.14} withScale={false}>
          <a className="story-button" href={site.venue.mapUrl} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </a>
        </Reveal>
      </div>
    </section>
  );
}
