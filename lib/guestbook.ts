import { supabase } from "@/lib/supabase";

export type AttendanceResponse = "yes" | "maybe" | "no";

export type GuestbookWish = {
  id: string;
  clientId: string;
  name: string;
  wish: string;
  attendance: AttendanceResponse;
  createdAt: string;
};

export type SaveWishResult = {
  ok: boolean;
  requestId?: string;
  reason?: "duplicate" | "junk" | "rate_limited" | "invalid" | "server_error";
};

export class WishSaveError extends Error {
  reason: NonNullable<SaveWishResult["reason"]>;
  requestId?: string;

  constructor(
    message: string,
    reason: NonNullable<SaveWishResult["reason"]>,
    requestId?: string,
  ) {
    super(message);
    this.name = "WishSaveError";
    this.reason = reason;
    this.requestId = requestId;
  }
}

/** Maps an HTTP status from the API to a client-facing failure reason. */
function reasonFromStatus(status: number): NonNullable<SaveWishResult["reason"]> {
  if (status === 409) return "duplicate";
  if (status === 422) return "junk";
  if (status === 429) return "rate_limited";
  if (status === 400) return "invalid";
  return "server_error";
}

/** Generates the per-intent idempotency key sent with every submit attempt. */
export function createWishIntentId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(16)}-0000-4000-8000-${Math.floor(Math.random() * 1e12)
    .toString(16)
    .padStart(12, "0")}`;
}

/**
 * Saves a guest's wish through the server route. The route upserts on the
 * client-supplied idempotency key, so retries and concurrent double-clicks
 * collapse into a single row instead of racing into duplicates.
 */
export async function saveGuestbookWish(
  input: Pick<GuestbookWish, "clientId" | "name" | "wish" | "attendance">,
): Promise<SaveWishResult> {
  const response = await fetch("/api/guestbook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId: input.clientId,
      name: input.name.trim(),
      wish: input.wish.trim(),
      attendance: input.attendance,
    }),
  });

  const payload = (await response.json().catch(() => null)) as
    | { ok?: boolean; requestId?: string; error?: string; reason?: SaveWishResult["reason"] }
    | null;

  if (!response.ok || !payload?.ok) {
    const message = payload?.error ?? `Wish request failed with status ${response.status}.`;
    const reason = payload?.reason ?? reasonFromStatus(response.status);
    console.error(
      `[guestbook-client] save failed status=${response.status} reason=${reason} request_id=${payload?.requestId ?? "n/a"}: ${message}`,
    );
    throw new WishSaveError(message, reason, payload?.requestId);
  }

  console.info(
    `[guestbook-client] wish saved request_id=${payload.requestId ?? "n/a"}`,
  );
  return { ok: true, requestId: payload.requestId };
}

/** Direct-write fallback for environments where the API route is unavailable. */
export async function saveGuestbookWishDirect(
  input: Pick<GuestbookWish, "clientId" | "name" | "wish" | "attendance">,
): Promise<void> {
  const { error } = await supabase
    .from("guestbook_wishes")
    .upsert(
      {
        client_id: input.clientId,
        name: input.name.trim(),
        wish: input.wish.trim(),
        attendance: input.attendance,
      },
      { onConflict: "client_id", ignoreDuplicates: true },
    );

  if (error) {
    console.error(`[guestbook-client] direct write failed: ${error.message}`);
    throw new Error(error.message);
  }
}
