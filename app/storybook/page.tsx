import type { Metadata } from "next";
import { PrivateStorybook, type StorybookWish } from "@/components/PrivateStorybook";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Our Book of Wishes | Yousra & Abdullah",
  description: "A private keepsake of wedding wishes.",
  robots: { index: false, follow: false, nocache: true },
};

export default async function StorybookPage() {
  let wishes: StorybookWish[] = [];
  let unavailable = false;

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("guestbook_wishes")
      .select("id, name, wish, attendance, created_at")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false });

    if (error) throw error;
    wishes = (data ?? []).flatMap((row) => {
      if (row.attendance !== "yes" && row.attendance !== "maybe" && row.attendance !== "no") return [];
      return [{
        id: String(row.id),
        name: String(row.name),
        wish: String(row.wish),
        attendance: row.attendance,
        createdAt: String(row.created_at),
      }];
    });
  } catch (error) {
    unavailable = true;
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[storybook] Unable to load wishes.",
        error instanceof Error ? error.message : "Unknown error",
      );
    } else {
      console.error("[storybook] WISHES_FETCH_FAILED");
    }
  }

  if (unavailable) {
    return (
      <main className="storybook-error">
        <div className="storybook-page-frame" aria-hidden="true" />
        <p>Our private keepsake</p>
        <h1>The book is resting for a moment</h1>
        <span>Please return a little later. Your guests&rsquo; wishes are safely tucked away.</span>
      </main>
    );
  }

  return <PrivateStorybook wishes={wishes} />;
}
