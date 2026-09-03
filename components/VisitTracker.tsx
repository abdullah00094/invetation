"use client";

import { useEffect } from "react";

let trackedThisPageLoad = false;
let visitRequest: Promise<void> | null = null;

type TrackingEvent = "visit" | "invitation_open";

async function recordEvent(event: TrackingEvent) {
  const response = await fetch("/api/track-visit", {
    method: "POST",
    credentials: "same-origin",
    keepalive: true,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ event }),
  });

  if (!response.ok) throw new Error("Visit tracking request failed.");
}

/** Records an intentional invitation-open after the initial visit cookie exists. */
export function trackInvitationOpen() {
  void (visitRequest ?? Promise.resolve())
    .catch(() => undefined)
    .then(() => recordEvent("invitation_open"))
    .catch(() => {
      // Analytics must never interrupt the opening animation.
    });
}

/** Records one visit per full page load; failures never interrupt the invitation. */
export function VisitTracker() {
  useEffect(() => {
    if (trackedThisPageLoad) return;
    trackedThisPageLoad = true;

    visitRequest = recordEvent("visit");
    void visitRequest.catch(() => {
      // Analytics must remain invisible and non-blocking for guests.
    });
  }, []);

  return null;
}
