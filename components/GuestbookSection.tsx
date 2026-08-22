"use client";

import { FormEvent, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { saveGuestbookWish } from "@/lib/guestbook";

type Errors = { name?: string; wish?: string };

export function GuestbookSection() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validate(name: string, wish: string) {
    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter at least 2 characters.";
    else if (name.length > 80) next.name = "Please keep your name under 80 characters.";
    if (wish.length < 3) next.wish = "Please leave a wish of at least 3 characters.";
    else if (wish.length > 500) next.wish = "Please keep your wish under 500 characters.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const wish = String(formData.get("wish") ?? "").trim();
    const nextErrors = validate(name, wish);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    saveGuestbookWish({ name, wish });
    setSubmitted(true);
    setSubmitting(false);
    form.reset();
  }

  return (
    <section className="story-paper guestbook-paper" aria-labelledby="guestbook-heading">
      <div className="story-frame" aria-hidden />
      <div className="story-floral story-floral--guestbook" aria-hidden><i/><i/><i/><b/></div>
      <div className="story-section-inner guestbook-inner">
        <Reveal withScale={false}>
          <p className="story-kicker">Guest book</p>
          <div className="story-rule" aria-hidden><span>♡</span></div>
          <h2 id="guestbook-heading" className="story-title">Wish us well</h2>
          <p className="guestbook-intro">Leave a little love for the road ahead.</p>
        </Reveal>

        <Reveal className="guestbook-stationery" delay={0.08}>
          {submitted ? (
            <div className="guestbook-success" role="status" aria-live="polite">
              <span aria-hidden>♡</span>
              <p>Your kind words are part of our story now.</p>
              <button type="button" className="story-text-button" onClick={() => { setSubmitted(false); setErrors({}); }}>
                Write another wish
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="guestbook-field">
                <label htmlFor="guest-name">Your name</label>
                <input id="guest-name" name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "guest-name-error" : undefined} />
                {errors.name && <p className="field-error" id="guest-name-error">{errors.name}</p>}
              </div>
              <div className="guestbook-field">
                <label htmlFor="guest-wish">Leave us a wish</label>
                <textarea id="guest-wish" name="wish" rows={5} minLength={3} maxLength={500} required aria-invalid={Boolean(errors.wish)} aria-describedby={errors.wish ? "guest-wish-error" : undefined} />
                {errors.wish && <p className="field-error" id="guest-wish-error">{errors.wish}</p>}
              </div>
              <button className="story-button" type="submit" disabled={submitting}>
                {submitting ? "Sending…" : "Send your wish"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
