"use client";

import { motion } from "framer-motion";
import { useInvitationAmbientAudio } from "./InvitationAmbientAudio";

export function InvitationGate({ onOpen }: { onOpen: () => void }) {
  const { startAfterOpeningClick } = useInvitationAmbientAudio();

  const handleOpen = () => {
    startAfterOpeningClick();
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-white)]"
    >
      <motion.div 
        className="relative z-10 flex flex-col items-center text-center p-8 max-w-lg mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="font-arapey text-3xl md:text-5xl mb-12 text-[var(--color-blush)] tracking-widest leading-relaxed">
          <span className="block text-xl md:text-2xl tracking-[0.2em]">SOMETHING</span>
          <span className="block text-4xl md:text-6xl my-2">Beautiful</span>
          <span className="block text-xl md:text-2xl tracking-[0.2em]">IS COMING</span>
        </h1>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpen}
          className="relative px-8 py-3 bg-transparent text-[var(--color-rosegold)] text-xs md:text-sm uppercase font-bold tracking-[0.25em] overflow-hidden group transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-rosegold)]"
        >
          {/* Underline decorative effect */}
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-[var(--color-rosegold)]/50 group-hover:w-3/4 transition-all duration-300" />
          TAP HERE
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
