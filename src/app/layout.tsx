import type { Metadata, Viewport } from "next";
import { instrumentSerif, inter, jetbrainsMono } from "@/lib/fonts";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { themeInitializationScript } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mukthar M J — Software Engineering & Selected Work",
  description:
    "Mukthar M J builds React, Next.js and TypeScript interfaces. Explore CODEVERSE, Zenugo AI, Schedura, DevMap, GearPilot and collaborative Flutter work on MachineTrack.",
};
export const viewport: Viewport = { themeColor: "#f4f2ec" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
      </head>
      <body>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
