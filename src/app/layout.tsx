import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Robin Keim | IT Consulting",
  description:
    "Technical advisory for founders, professionals, and teams who need clarity and a working system fast.",
  openGraph: {
    title: "Robin Keim | IT Consulting",
    description:
      "Fast, practical IT consulting that turns technical uncertainty into clear execution.",
    url: siteUrl,
    siteName: "Robin Consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robin Keim | IT Consulting",
    description:
      "Fast, practical IT consulting that turns technical uncertainty into clear execution.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
