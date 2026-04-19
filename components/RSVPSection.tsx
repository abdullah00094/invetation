"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { site } from "@/data/site";
import type { AttendanceValue } from "@/data/site";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeading } from "@/components/SectionHeading";
import { submitRsvpClient, validateRsvp, type RsvpPayload } from "@/lib/rsvp";

const initial: RsvpPayload = {
  name: "",
  attendance: "",
  message: "",
};

export function RSVPSection() {
  const [form, setForm] = useState<RsvpPayload>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const attendanceOptions = useMemo(() => site.rsvp.attendanceOptions, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validateRsvp(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      // Replace with fetch("/api/rsvp", { method: "POST", body: JSON.stringify(form) })
      await submitRsvpClient(form);
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionContainer id="rsvp">
      <Reveal>
        <SectionHeading
          eyebrow="RSVP"
          title={site.rsvp.heading}
          subtitle="Your reply helps us plan — take your time."
        />
      </Reveal>

      <Reveal delay={0.06}>
        {success ? (
          <div
            className="mx-auto max-w-xl rounded-[var(--radius-panel)] bg-[var(--color-surface)] px-8 py-14 text-center shadow-soft ring-1 ring-[color-mix(in_oklab,var(--color-rose)_28%,transparent)] sm:py-16"
            role="status"
            aria-live="polite"
          >
            <p className="font-serif text-[clamp(1.75rem,5vw,2.25rem)] font-medium tracking-tight text-[var(--color-ink)]">
              {site.rsvp.successTitle}
            </p>
            <p className="mx-auto mt-5 max-w-md font-sans text-[0.9375rem] leading-[1.8] text-[var(--color-ink-muted)]">
              {site.rsvp.successMessage}
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto max-w-xl space-y-7 rounded-[var(--radius-panel)] bg-[var(--color-paper)]/95 p-8 shadow-soft ring-1 ring-[color-mix(in_oklab,var(--color-ink)_5%,transparent)] sm:space-y-8 sm:p-10"
            noValidate
          >
            <div>
              <label
                htmlFor="rsvp-name"
                className="block font-sans text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-muted)]"
              >
                Your name
              </label>
              <input
                id="rsvp-name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-2.5 w-full rounded-2xl border-0 bg-[var(--color-surface)] px-4 py-3.5 font-sans text-base text-[var(--color-ink)] outline-none ring-1 ring-[color-mix(in_oklab,var(--color-ink)_6%,transparent)] transition-shadow focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-rose)_45%,transparent)]"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "rsvp-name-error" : undefined}
              />
              {errors.name ? (
                <p id="rsvp-name-error" className="mt-2 text-sm text-[var(--color-rose-deep)]">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <fieldset>
              <legend className="block font-sans text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
                Will you join us?
              </legend>
              <div className="mt-3.5 space-y-2.5">
                {attendanceOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex min-h-[3.25rem] cursor-pointer items-center gap-3 rounded-2xl bg-[var(--color-surface)] px-4 py-3 ring-1 ring-[color-mix(in_oklab,var(--color-ink)_5%,transparent)] transition-[background-color,ring-color] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[color-mix(in_oklab,var(--color-rose)_40%,transparent)]"
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value={opt.value}
                      checked={form.attendance === opt.value}
                      onChange={() =>
                        setForm((f) => ({
                          ...f,
                          attendance: opt.value as AttendanceValue,
                        }))
                      }
                      className="size-4 accent-[var(--color-rose-deep)]"
                    />
                    <span className="font-sans text-[0.9375rem] text-[var(--color-ink)]">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.attendance ? (
                <p className="mt-2 text-sm text-[var(--color-rose-deep)]">
                  {errors.attendance}
                </p>
              ) : null}
            </fieldset>

            <div>
              <label
                htmlFor="rsvp-message"
                className="block font-sans text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-muted)]"
              >
                A note for us{" "}
                <span className="font-normal normal-case tracking-normal text-[var(--color-ink-muted)]">
                  (optional)
                </span>
              </label>
              <textarea
                id="rsvp-message"
                name="message"
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="mt-2.5 w-full resize-y rounded-2xl border-0 bg-[var(--color-surface)] px-4 py-3.5 font-sans text-base text-[var(--color-ink)] outline-none ring-1 ring-[color-mix(in_oklab,var(--color-ink)_6%,transparent)] transition-shadow focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-rose)_45%,transparent)]"
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "rsvp-message-error" : undefined}
              />
              {errors.message ? (
                <p
                  id="rsvp-message-error"
                  className="mt-2 text-sm text-[var(--color-rose-deep)]"
                >
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="pt-1">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send response"}
              </Button>
            </div>
          </form>
        )}
      </Reveal>
    </SectionContainer>
  );
}
