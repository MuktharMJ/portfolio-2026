import localFont from "next/font/local";

/**
 * Self-hosted font stack — NIGHTBENCH design system.
 * All files are latin-subset WOFF2 in /public/fonts.
 */

/** Display face — headlines, big statements. */
export const clash = localFont({
  src: [
    { path: "../../public/fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

/** Editorial accent — single italic serif for signature words. */
export const instrumentSerif = localFont({
  src: [{ path: "../../public/fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" }],
  variable: "--font-instrument",
  display: "swap",
});

/** Body text. */
export const inter = localFont({
  src: [{ path: "../../public/fonts/Inter-latin.woff2", weight: "400 500", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
});

/** Annotation layer — mono micro-labels. */
export const jetbrainsMono = localFont({
  src: [{ path: "../../public/fonts/JetBrainsMono-latin.woff2", weight: "400 500", style: "normal" }],
  variable: "--font-jbmono",
  display: "swap",
});
