import { EndCelebration } from "@/components/EndCelebration";
import { FooterSection } from "@/components/FooterSection";
import { HeroSection } from "@/components/HeroSection";
import { InvitationSection } from "@/components/InvitationSection";
import { NamesDateRevealSection } from "@/components/NamesDateRevealSection";
import { OpeningBalloonsScene } from "@/components/OpeningBalloonsScene";
import { VenueSection } from "@/components/VenueSection";

/**
 * Story sequence:
 * 1–3 OpeningBalloonsScene — floating forms, “Tap to Open”, click → balloons drift away
 * 4–6 HeroSection — names, subtitle, scroll arrow
 * 7 NamesDateRevealSection — scroll: names + date
 * 8 InvitationSection — invitation copy
 * 9 VenueSection — location
 * 10 FooterSection — closure (+ EndCelebration when #thanks is in view)
 */
export default function Home() {
  return (
    <>
      <OpeningBalloonsScene />
      <main>
        <HeroSection />
        <NamesDateRevealSection />
        <InvitationSection />
        <VenueSection />
        <FooterSection />
      </main>
      <EndCelebration />
    </>
  );
}
