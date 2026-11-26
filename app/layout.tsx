import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Blade — Software Developer",
  description: "Software developer building digital products across mobile, web, and backend systems. Explore projects, engineering interests, and current learning.",
  keywords: ["software developer", "Flutter developer", "mobile development", "Next.js", "portfolio", "application developer"],
  openGraph: { title: "Blade — Software Developer", description: "Building digital products with code & curiosity.", type: "website", siteName: "Blade Portfolio" },
  twitter: { card: "summary_large_image", title: "Blade — Software Developer", description: "Building digital products with code & curiosity." },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
