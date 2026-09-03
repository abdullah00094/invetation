import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const VISITOR_COOKIE = "invitation_visitor_id";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-vercel-forwarded-for")
    || request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || "";
}

function getLocation(request: NextRequest) {
  const encodedCity = request.headers.get("x-vercel-ip-city") || "";
  let city = encodedCity;
  try {
    city = decodeURIComponent(encodedCity);
  } catch {
    // Keep the original header if it contains malformed escape sequences.
  }

  return {
    countryCode: request.headers.get("x-vercel-ip-country") || null,
    region: request.headers.get("x-vercel-ip-country-region") || null,
    city: city || null,
  };
}

function getDeviceType(userAgent: string) {
  if (/tablet|ipad/i.test(userAgent)) return "tablet";
  if (/mobile|iphone|android/i.test(userAgent)) return "mobile";
  return "desktop";
}

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => ({}));
  const event = payload?.event === "invitation_open" ? "invitation_open" : "visit";
  const existingId = request.cookies.get(VISITOR_COOKIE)?.value;
  const visitorId = existingId && UUID_PATTERN.test(existingId)
    ? existingId
    : randomUUID();
  const userAgent = request.headers.get("user-agent")?.slice(0, 500) || "unknown";
  const ipAddress = getClientIp(request);
  const location = getLocation(request);

  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.rpc("record_site_visit", {
      p_visitor_id: visitorId,
      p_ip_address: ipAddress,
      p_user_agent: userAgent,
      p_device_type: getDeviceType(userAgent),
      p_event: event,
      p_country_code: location.countryCode,
      p_region: location.region,
      p_city: location.city,
    });

    if (error) throw error;
  } catch (error) {
    console.error("Unable to record site visit", error);
    return NextResponse.json({ error: "Unable to record visit." }, { status: 500 });
  }

  const response = new NextResponse(null, { status: 204 });
  response.cookies.set(VISITOR_COOKIE, visitorId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}
