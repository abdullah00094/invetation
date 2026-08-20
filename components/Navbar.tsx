"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "Our Story", href: "#story" },
    { label: "Details", href: "#details" },
    { label: "Gallery", href: "#gallery" },
    { label: "RSVP", href: "#rsvp" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-[var(--color-black-elevated)]/90 backdrop-blur-md border-b border-[var(--color-gold-muted)]/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[var(--container-xl)] mx-auto px-6 h-20 flex items-center justify-between">
          <a
            href="#hero"
            className="text-2xl font-serif text-[var(--color-gold)] tracking-widest hover:text-[var(--color-gold-highlight)] transition-colors"
          >
            {site.couple.first[0]} & {site.couple.second[0]}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-beige)] hover:text-[var(--color-gold)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`block w-6 h-px bg-[var(--color-gold)] transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-[var(--color-gold)] transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block w-6 h-px bg-[var(--color-gold)] transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[var(--color-black)] flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col gap-8 text-center">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-serif text-[var(--color-beige)] hover:text-[var(--color-gold)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
