import { supabase } from "@/lib/supabase";

export type AttendanceResponse = "yes" | "maybe" | "no";

export type GuestbookWish = {
  id: string;
  name: string;
  wish: string;
  attendance: AttendanceResponse;
  createdAt: string;
};

/** Saves a guest's wish in the shared Supabase guest book. */
export async function saveGuestbookWish(
  input: Pick<GuestbookWish, "name" | "wish" | "attendance">,
): Promise<void> {
  const { error } = await supabase
    .from("guestbook_wishes")
    .insert({
      name: input.name.trim(),
      wish: input.wish.trim(),
      attendance: input.attendance,
    });

  if (error) {
    throw new Error(error.message);
  }
}
