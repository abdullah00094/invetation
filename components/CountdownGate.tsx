import { CountdownSection } from "@/components/CountdownSection";
import { OpeningBalloonsScene } from "@/components/OpeningBalloonsScene";

/**
 * Temporary public gate: the opening scene reveals only the event countdown.
 * Keep this shared between the root and catch-all routes so every public path
 * has the same experience while the full invitation remains unpublished.
 */
export function CountdownGate() {
  return (
    <>
      <OpeningBalloonsScene />
      <main>
        <CountdownSection />
      </main>
    </>
  );
}
