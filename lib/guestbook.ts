export type GuestbookWish = {
  id: string;
  name: string;
  wish: string;
  createdAt: string;
};

export const GUESTBOOK_STORAGE_KEY = "yousra-abdullah:guestbook-wishes:v1";

/**
 * Saves a wish locally for now. Storage failures are intentionally non-fatal:
 * the form is a warm acknowledgement until this is replaced by a real API.
 */
export function saveGuestbookWish(input: Pick<GuestbookWish, "name" | "wish">) {
  const entry: GuestbookWish = {
    ...input,
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    createdAt: new Date().toISOString(),
  };

  try {
    const stored = window.localStorage.getItem(GUESTBOOK_STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    const wishes = Array.isArray(parsed) ? parsed : [];
    window.localStorage.setItem(
      GUESTBOOK_STORAGE_KEY,
      JSON.stringify([...wishes, entry]),
    );
  } catch {
    // Private browsing, quotas, and malformed legacy data must not block thanks.
  }

  return entry;
}
