import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import {
  GUEST_NAME_MAX,
  GUEST_NAME_MIN,
  GUEST_WISH_MAX,
  GUEST_WISH_MIN,
  isGuestAttendance,
  isJunkWish,
} from "@/lib/guestbook-validation";

export const runtime = "nodejs";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DEDUPE_LOOKBACK_HOURS = 48;

/** Normalizes a wish for duplicate comparison: lowercase, collapse whitespace,
 * stripemoji/punctuation so "Alf mabrouuk!!!" ≈ "alf mabrouuk". */
function dedupeKey(wish: string) {
  return wish
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type FailureReason =
  | "invalid_payload"
  | "validation_failed"
  | "rate_limited"
  | "insert_failed"
  | "unhandled_error";

type RequestContext = {
  requestId: string;
  ip: string;
  userAgent: string;
};

type ValidatedWish = {
  clientId: string;
  name: string;
  wish: string;
  attendance: "yes" | "maybe" | "no";
};

const recentIps = new Map<string, number[]>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const context: RequestContext = {
    requestId,
    ip:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")?.trim()
      || "",
    userAgent: request.headers.get("user-agent")?.slice(0, 500) || "unknown",
  };

  try {
    const raw = await request.json().catch(() => null);
    if (!raw || typeof raw !== "object") {
      return logAndReject(context, "invalid_payload", "Request body is not JSON.", 400);
    }

    const body = raw as Record<string, unknown>;
    const clientId = typeof body.clientId === "string" ? body.clientId : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const wish = typeof body.wish === "string" ? body.wish.trim() : "";
    const attendance = typeof body.attendance === "string" ? body.attendance : "";

    const validation: Record<string, string> = {};
    if (!UUID_PATTERN.test(clientId)) validation.clientId = "missing";
    if (name.length < GUEST_NAME_MIN || name.length > GUEST_NAME_MAX) validation.name = "length";
    if (wish.length < GUEST_WISH_MIN || wish.length > GUEST_WISH_MAX) validation.wish = "length";
    if (!isGuestAttendance(attendance)) validation.attendance = "unknown";

    if (Object.keys(validation).length > 0) {
      return logAndReject(
        context,
        "validation_failed",
        `Validation failed: ${JSON.stringify(validation)}`,
        422,
        { clientId, name, attendance, wishLength: wish.length },
        "invalid",
      );
    }

    if (isJunkWish(wish)) {
      return logAndReject(context, "validation_failed", "Junk wish rejected.", 422, {
        clientId,
        name,
        attendance,
        wishLength: wish.length,
      }, "junk");
    }

    if (isRateLimited(context.ip)) {
      return logAndReject(context, "rate_limited", "Too many requests from this IP.", 429, {
        clientId,
        name,
        attendance,
        wishLength: wish.length,
      });
    }

    const validated: ValidatedWish = {
      clientId,
      name,
      wish,
      attendance: attendance as ValidatedWish["attendance"],
    };

    const supabase = createSupabaseAdmin();

    // Duplicate-text dedupe: reject if an identical (normalized) wish was
    // already saved recently — even from a different device/client id.
    const lookbackIso = new Date(Date.now() - DEDUPE_LOOKBACK_HOURS * 3_600_000).toISOString();
    const { data: recentWishes, error: recentError } = await supabase
      .from("guestbook_wishes")
      .select("wish")
      .gte("created_at", lookbackIso)
      .order("created_at", { ascending: false })
      .limit(200);

    if (recentError) {
      console.error(
        `[guestbook] dedupe lookup failed request_id=${requestId}: ${recentError.message} (proceeding with insert)`,
      );
    } else {
      const incomingKey = dedupeKey(wish);
      if (incomingKey.length >= 10 && recentWishes?.some((row) => dedupeKey(row.wish) === incomingKey)) {
        return logAndReject(context, "validation_failed", "Duplicate wish text rejected.", 409, {
          clientId,
          name,
          attendance,
          wishLength: wish.length,
        });
      }
    }

    const { error } = await supabase
      .from("guestbook_wishes")
      .upsert(
        {
          client_id: validated.clientId,
          name: validated.name,
          wish: validated.wish,
          attendance: validated.attendance,
        },
        { onConflict: "client_id", ignoreDuplicates: true },
      );

    if (error) {
      return logAndReject(
        context,
        "insert_failed",
        `Supabase upsert failed: ${error.message}`,
        502,
        { clientId: validated.clientId, name: validated.name, attendance: validated.attendance, wishLength: validated.wish.length },
      );
    }

    console.info(
      `[guestbook] wish saved request_id=${requestId} client_id=${validated.clientId} attendance=${validated.attendance}`,
    );
    return NextResponse.json({ ok: true, requestId }, { status: 201 });
  } catch (error) {
    console.error(
      `[guestbook] unhandled error request_id=${requestId}`,
      error instanceof Error ? error.stack : error,
    );
    logFailure(context, "unhandled_error", error instanceof Error ? error.message : String(error)).catch(() => {});
    return NextResponse.json(
      { ok: false, requestId, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}

function isRateLimited(ip: string) {
  if (!ip) return false;
  const now = Date.now();
  const hits = (recentIps.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  recentIps.set(ip, hits);
  if (recentIps.size > 10_000) {
    for (const [key, times] of recentIps) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) recentIps.delete(key);
    }
  }
  return hits.length > RATE_LIMIT_MAX;
}

type FailureContext = {
  clientId?: string;
  name?: string;
  attendance?: string;
  wishLength?: number;
};

type PublicFailureReason = "duplicate" | "junk" | "rate_limited" | "invalid" | "server_error";

function logAndReject(
  context: RequestContext,
  reason: FailureReason,
  message: string,
  status: number,
  failure: FailureContext = {},
  publicReason?: PublicFailureReason,
) {
  console.error(`[guestbook] ${reason} request_id=${context.requestId}: ${message}`);
  logFailure(context, reason, message, failure).catch(() => {});
  return NextResponse.json(
    {
      ok: false,
      requestId: context.requestId,
      reason: publicReason ?? reasonFromFailureStatus(status),
      error: "We couldn't save your wish. Please try again.",
    },
    { status },
  );
}

function reasonFromFailureStatus(status: number): PublicFailureReason {
  if (status === 409) return "duplicate";
  if (status === 429) return "rate_limited";
  if (status === 400 || status === 422) return "invalid";
  return "server_error";
}

async function logFailure(
  context: RequestContext,
  reason: FailureReason,
  message: string,
  failure: FailureContext = {},
) {
  try {
    const supabase = createSupabaseAdmin();
    await supabase.from("guestbook_failure_logs").insert({
      request_id: context.requestId,
      reason,
      client_id: failure.clientId && UUID_PATTERN.test(failure.clientId) ? failure.clientId : null,
      payload_name: failure.name?.slice(0, GUEST_NAME_MAX) ?? null,
      payload_attendance: failure.attendance?.slice(0, 20) ?? null,
      payload_wish_length: typeof failure.wishLength === "number" ? failure.wishLength : null,
      error_message: message.slice(0, 1000),
      ip_address: context.ip || null,
      user_agent: context.userAgent,
    });
  } catch (logError) {
    console.error(
      `[guestbook] failure-log write also failed request_id=${context.requestId}`,
      logError instanceof Error ? logError.message : logError,
    );
  }
}
