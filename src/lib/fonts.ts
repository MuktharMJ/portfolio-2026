import localFont from "next/font/local";

export const instrumentSerif = localFont({
  src: [
    {
      path: "../../public/fonts/InstrumentSerif-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument",
  display: "swap",
});
export const inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter-latin.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});
export const jetbrainsMono = localFont({
  src: [
    {
      path: "../../public/fonts/JetBrainsMono-latin.woff2",
      weight: "100 800",
      style: "normal",
    },
  ],
  variable: "--font-jbmono",
  display: "swap",
});
