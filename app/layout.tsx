import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { site } from "@/data/site";
import { VisitTracker } from "@/components/VisitTracker";

function getMetadataBase() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const rawUrl = configuredUrl ?? (vercelUrl ? `https://${vercelUrl}` : undefined);

  if (!rawUrl) return new URL("http://localhost:3000");

  try {
    return new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);
  } catch {
    return new URL("http://localhost:3000");
  }
}

const metadataBase = getMetadataBase();
const hasProductionUrl = Boolean(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL,
);

const ptSerif = localFont({
  variable: "--font-pt-serif",
  src: [
    { path: "./fonts/pt-serif-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/pt-serif-bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const arapey = localFont({
  variable: "--font-arapey",
  src: [
    { path: "./fonts/arapey-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/arapey-italic.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
});

const pinyon = localFont({
  variable: "--font-pinyon",
  src: "./fonts/pinyon-script.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase,
  title: site.meta.title,
  description: site.meta.description,
  ...(hasProductionUrl
    ? { alternates: { canonical: metadataBase } }
    : {}),
  applicationName: `${site.meta.socialTitle} Invitation`,
  openGraph: {
    title: site.meta.socialTitle,
    description: site.meta.description,
    type: "website",
    siteName: `${site.meta.socialTitle} Invitation`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: site.meta.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.socialTitle,
    description: site.meta.description,
    images: [{ url: "/opengraph-image", alt: site.meta.imageAlt }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6eee8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ptSerif.variable} ${arapey.variable} ${pinyon.variable} min-h-[100svh] overflow-x-hidden antialiased`}
      >
        <VisitTracker />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
