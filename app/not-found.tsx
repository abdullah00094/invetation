import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Yousra & Abdullah",
  description: "This invitation page could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="not-found-paper">
      <div className="not-found-frame" aria-hidden="true" />
      <div className="not-found-botanical" aria-hidden="true">
        <span className="not-found-stem" />
        <i className="not-found-leaf not-found-leaf--one" />
        <i className="not-found-leaf not-found-leaf--two" />
        <i className="not-found-petal not-found-petal--one" />
        <i className="not-found-petal not-found-petal--two" />
        <i className="not-found-petal not-found-petal--three" />
      </div>
      <section className="not-found-content" aria-labelledby="not-found-title">
        <p className="not-found-code" aria-label="Error 404">404</p>
        <div className="not-found-rule" aria-hidden="true"><span>✦</span></div>
        <h1 id="not-found-title">This page wandered away</h1>
        <p className="not-found-copy">
          The invitation is waiting for you at our home page.
        </p>
        <Link className="story-button not-found-link" href="/">
          Return to the invitation
        </Link>
      </section>
      <div className="not-found-seal" aria-hidden="true"><span>YA</span></div>
    </main>
  );
}
