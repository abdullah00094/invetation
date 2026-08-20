"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { site, AttendanceValue } from "@/data/site";
import { GoldDivider } from "./GoldDivider";

export function RSVPSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section id="rsvp" className="py-24 md:py-32 bg-[var(--color-black)] relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute left-0 top-0 w-64 h-64 bg-[var(--color-gold-muted)] opacity-5 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-[var(--color-gold-muted)] opacity-5 blur-[120px] pointer-events-none" />

      <div className="max-w-[var(--container-md)] mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] block mb-4">
            JOIN US
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-ivory)] mb-6">
            {site.rsvp.heading}
          </h2>
          <p className="text-[var(--color-beige)] text-lg">
            {site.rsvp.subtitle}
          </p>
        </motion.div>

        {status === "success" ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-12 border border-[var(--color-gold)]/30 bg-[var(--color-charcoal)]"
          >
            <h3 className="font-serif text-3xl text-[var(--color-gold)] mb-4">{site.rsvp.successTitle}</h3>
            <p className="text-[var(--color-ivory)] leading-relaxed">{site.rsvp.successMessage}</p>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6 md:space-y-8 bg-[var(--color-charcoal)] p-8 md:p-12 border border-[var(--color-gold-muted)]/20 shadow-[var(--shadow-soft-lg)]"
          >
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-[0.15em] text-[var(--color-gold-muted)] mb-3">
                Full Name
              </label>
              <input 
                id="name"
                required
                type="text" 
                className="w-full bg-transparent border-b border-[var(--color-gold-muted)]/30 py-3 text-[var(--color-ivory)] focus:outline-none focus:border-[var(--color-gold)] transition-colors placeholder:text-[var(--color-text-muted)]"
                placeholder="Jane & John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="attendance" className="block text-xs uppercase tracking-[0.15em] text-[var(--color-gold-muted)] mb-3">
                Attendance
              </label>
              <div className="space-y-3">
                {site.rsvp.attendanceOptions.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="radio" 
                        name="attendance" 
                        value={opt.value} 
                        required
                        className="peer appearance-none w-5 h-5 border border-[var(--color-gold-muted)] rounded-full checked:border-[var(--color-gold)] transition-colors cursor-pointer"
                      />
                      <div className="absolute w-2.5 h-2.5 bg-[var(--color-gold)] rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <span className="text-[var(--color-beige)] group-hover:text-[var(--color-ivory)] transition-colors">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="dietary" className="block text-xs uppercase tracking-[0.15em] text-[var(--color-gold-muted)] mb-3">
                Dietary Requirements / Note (Optional)
              </label>
              <textarea 
                id="dietary"
                rows={2}
                className="w-full bg-transparent border-b border-[var(--color-gold-muted)]/30 py-3 text-[var(--color-ivory)] focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none placeholder:text-[var(--color-text-muted)]"
                placeholder="Any special requests..."
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-[var(--color-gold)] text-[var(--color-black)] text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[var(--color-gold-highlight)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
