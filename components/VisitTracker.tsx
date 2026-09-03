"use client";

import { useEffect } from "react";

let trackedThisPageLoad = false;

/** Records one visit per full page load; failures never interrupt the invitation. */
export function VisitTracker() {
  useEffect(() => {
    if (trackedThisPageLoad) return;
    trackedThisPageLoad = true;

    void fetch("/api/track-visit", {
      method: "POST",
      credentials: "same-origin",
      keepalive: true,
    }).catch(() => {
      // Analytics must remain invisible and non-blocking for guests.
    });
  }, []);

  return null;
}
