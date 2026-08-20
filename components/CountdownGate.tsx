"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { InvitationGate } from "./InvitationGate";
import { HeroSection } from "./HeroSection";
import { CountdownSection } from "./CountdownSection";
import { EventDetails } from "./EventDetails";

/** 
 * Serves as the main page coordinator, managing the opening sequence
 * and rendering the full invitation structure once opened.
 */
export function CountdownGate() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <InvitationGate onOpen={() => setIsOpen(true)} />
        )}
      </AnimatePresence>
      
      <main aria-hidden={!isOpen} {...(!isOpen ? { inert: true } : {})}>
        {isOpen && (
          <>
            <HeroSection />
            <CountdownSection />
            <EventDetails />
          </>
        )}
      </main>
    </>
  );
}
