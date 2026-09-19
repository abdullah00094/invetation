"use client";

import { FormEvent, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  type AttendanceResponse,
  createWishIntentId,
  saveGuestbookWish,
  WishSaveError,
} from "@/lib/guestbook";

type Errors = {
  name?: string;
  attendance?: string;
  wish?: string;
  submit?: string;
};

const WISH_MAX = 2000;

/** Catches junk wishes: a single character repeated run after run, or one
 * character dominating the whole message (e.g. "kkkkk…" x 2000). */
function isJunkWish(wish: string) {
  const compact = wish.replace(/\s+/g, "");
  if (compact.length < 3) return false;
  if (/(.)\1{15,}/.test(compact)) return true;
  const counts = new Map<string, number>();
  for (const char of compact.toLowerCase()) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }
  const maxShare = Math.max(...counts.values()) / compact.length;
  return maxShare > 0.8;
}

const attendanceOptions: ReadonlyArray<{
  value: AttendanceResponse;
  label: string;
}> = [
  { value: "yes", label: "Definitely attending" },
  { value: "maybe", label: "Maybe" },
  { value: "no", label: "Unable to attend" },
];

export function GuestbookSection() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // One idempotency key per intent: created when the user starts a reply and
  // reused on retries, so a re-click or flaky network can't double-insert.
  // Regenerated after a successful submit ("Write another wish").
  const intentId = useRef<string>(createWishIntentId());

  function validate(
    name: string,
    attendance: string,
    wish: string,
  ) {
    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter at least 2 characters.";
    else if (name.length > 80) next.name = "Please keep your name under 80 characters.";
    if (!attendanceOptions.some((option) => option.value === attendance)) {
      next.attendance = "Please let us know if you can join us.";
    }
    if (wish.length < 3) next.wish = "Please leave a wish of at least 3 characters.";
    else if (wish.length > WISH_MAX) next.wish = `Please keep your wish under ${WISH_MAX} characters.`;
    else if (isJunkWish(wish)) next.wish = "That wish looks a little empty — please write a few kind words.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const attendance = String(formData.get("attendance") ?? "");
    const wish = String(formData.get("wish") ?? "").trim();
    const nextErrors = validate(name, attendance, wish);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);

    try {
      await saveGuestbookWish({
        clientId: intentId.current,
        name,
        wish,
        attendance: attendance as AttendanceResponse,
      });
      setSubmitted(true);
      form.reset();
      intentId.current = createWishIntentId();
    } catch (error) {
      console.error(
        "[guestbook-form] submit failed",
        error instanceof Error ? error.stack : error,
      );
      const reason = error instanceof WishSaveError ? error.reason : null;
      const requestId = error instanceof WishSaveError ? error.requestId : undefined;
      const copy = reason === "duplicate"
        ? "That wish was already posted just now — no need to post it twice."
        : reason === "junk"
          ? "That wish looks a little empty — please write a few kind words."
          : reason === "rate_limited"
            ? "A few wishes came from here just now — please wait a minute and try again."
            : requestId
              ? `We couldn't save your wish. Reference: ${requestId}`
              : "We couldn't save your wish. Please check your connection and try again.";
      setErrors({ submit: copy });
    } finally {
      setSubmitting(false);
    }
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
              <button type="button" className="story-text-button" onClick={() => { setSubmitted(false); setErrors({}); intentId.current = createWishIntentId(); }}>
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
              <fieldset
                className="guestbook-attendance"
                aria-describedby={errors.attendance ? "guest-attendance-error" : undefined}
              >
                <legend>Will you be joining us?</legend>
                <div className="guestbook-attendance-options">
                  {attendanceOptions.map((option) => (
                    <label key={option.value} className="guestbook-attendance-option">
                      <input
                        type="radio"
                        name="attendance"
                        value={option.value}
                        required
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.attendance && (
                  <p className="field-error" id="guest-attendance-error">
                    {errors.attendance}
                  </p>
                )}
              </fieldset>
              <div className="guestbook-field">
                <label htmlFor="guest-wish">Leave us a wish</label>
                <textarea id="guest-wish" name="wish" rows={5} minLength={3} maxLength={WISH_MAX} required aria-invalid={Boolean(errors.wish)} aria-describedby={errors.wish ? "guest-wish-error" : undefined} />
                {errors.wish && <p className="field-error" id="guest-wish-error">{errors.wish}</p>}
              </div>
              <button className="guestbook-submit" type="submit" disabled={submitting}>
                {submitting ? "Sending…" : "Send your wish"}
              </button>
              {errors.submit && (
                <p className="field-error" role="alert">
                  {errors.submit}
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
