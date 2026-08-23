import { supabase } from "@/lib/supabase";

export type GuestbookWish = {
  id: string;
  name: string;
  wish: string;
  createdAt: string;
};

/** Saves a guest's wish in the shared Supabase guest book. */
export async function saveGuestbookWish(
  input: Pick<GuestbookWish, "name" | "wish">,
): Promise<void> {
  const { error } = await supabase
    .from("guestbook_wishes")
    .insert({
      name: input.name.trim(),
      wish: input.wish.trim(),
    });

  if (error) {
    throw new Error(error.message);
  }
}
