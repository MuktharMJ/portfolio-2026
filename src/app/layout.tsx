import type { Metadata, Viewport } from "next";
import { clash, instrumentSerif, inter, jetbrainsMono } from "@/lib/fonts";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mukthar M J — Builder & Software Engineer",
  description:
    "Personal portfolio of Mukthar M J — software engineering student, full-stack developer, and AI tinkerer. A digital playground of projects and experiments.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${clash.variable} ${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="page-frame bg-bg-0 text-ink">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-bg-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <div aria-hidden="true" className="grain" />
      </body>
    </html>
  );
}
