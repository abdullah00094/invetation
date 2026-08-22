/** Fired when the guest dismisses the opening overlay. */
export const INVITATION_OPEN_EVENT = "Katb Al-Kitab ceremony :invitation-open";

export function dispatchInvitationOpen() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(INVITATION_OPEN_EVENT));
}
