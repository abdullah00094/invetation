"use client";

import { useState } from "react";
import { CountdownSection } from "@/components/CountdownSection";
import { CurtainOpeningScene } from "@/components/CurtainOpeningScene";
import { GardenStory } from "@/components/GardenStory";
import { GuestbookSection } from "@/components/GuestbookSection";
import { LocationSection } from "@/components/LocationSection";

/** Shared temporary experience used by both the root and catch-all routes. */
export function CountdownGate() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CurtainOpeningScene onOpen={() => setIsOpen(true)} />
      <main aria-hidden={!isOpen} {...(!isOpen ? { inert: true } : {})}>
        <GardenStory />
        <CountdownSection />
        <LocationSection />
        <GuestbookSection />
      </main>
    </>
  );
}
