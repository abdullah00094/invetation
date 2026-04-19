/** Fired when the guest dismisses the opening overlay — hero atmosphere listens for this. */
export const INVITATION_OPEN_EVENT = "engagement:invitation-open";

export function dispatchInvitationOpen() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(INVITATION_OPEN_EVENT));
}
