import type { Social } from "./types";

export const profile = {
  name: "Mukthar M J",
  location: "Bengaluru, IN",
  // Hero signature line — refined wording lives here, not in components.
  heroLines: ["I build things", "that shouldn't feel"],
  heroAccent: "this good",
  heroAccentTail: "to use.",
  // Nameplate metadata (identity block above the statement).
  roleLine: "SOFTWARE ENGINEER · BUILDER",
  portfolioTag: "BENGALURU, IN — 2026",
  // Bench annotation — intentionally count-free: the roster grows over time,
  // so no project count is ever hardcoded into the hero.
  benchLabel: "THE BENCH — SELECTED WORK",
  // Identity metadata.
  studioLine: "FULL-STACK WEB · INTERFACES · AI",
  availability: "OPEN TO WORK & COLLABORATION",
  aboutCore: "I'm Mukthar — a software engineering student who likes turning ideas into things people can actually use.",
  philosophyLine: "Curious about everything. Serious about building.",
  contactHeadline: "LET'S BUILD SOMETHING.",
  contactBody: "Have an idea, project, opportunity, or just want to talk tech?",
  footerLine: "Built with curiosity.",
  footerCopyright: "© 2026",
};

export const socials: Social[] = [
  { label: "Email", href: "mailto:mjmukthar96@gmail.com", handle: "mjmukthar96@gmail.com" },
  { label: "GitHub", href: "https://github.com/MuktharMJ", handle: "github.com/MuktharMJ" },
  { label: "Phone", href: "tel:+919944767042", handle: "+91 9944767042" },
];

/** Contact details sourced from the resume PDF (docs/ — source of truth). */
export const resume = {
  education: "B.Tech CSE (Software Product Engineering)",
  institution: "Alliance University, Bengaluru",
  period: "July 2025 – May 2029",
  // CGPA intentionally omitted from the site (submission decision).
  pdfHref: "/resume.pdf",
  preview: undefined,
};
