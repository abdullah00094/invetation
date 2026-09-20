export const GUEST_NAME_MIN = 2;
export const GUEST_NAME_MAX = 80;
export const GUEST_WISH_MIN = 3;
export const GUEST_WISH_MAX = 2000;

export const GUEST_ATTENDANCE_VALUES = ["yes", "maybe", "no"] as const;
export type GuestAttendance = (typeof GUEST_ATTENDANCE_VALUES)[number];

export function isGuestAttendance(value: string): value is GuestAttendance {
  return (GUEST_ATTENDANCE_VALUES as readonly string[]).includes(value);
}

/** Rejects long repeated runs and messages dominated by one character. */
export function isJunkWish(wish: string) {
  const compact = wish.replace(/\s+/g, "");
  if (compact.length < GUEST_WISH_MIN) return false;
  if (/(.)\1{15,}/.test(compact)) return true;

  const counts = new Map<string, number>();
  for (const char of compact.toLowerCase()) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }

  return Math.max(...counts.values()) / compact.length > 0.8;
}
