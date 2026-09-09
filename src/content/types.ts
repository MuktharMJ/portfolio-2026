/**
 * Content model — single source of truth for the portfolio.
 * RULE (brief §26): never fabricate content. Missing information stays
 * undefined / placeholder and renders as a designed "details soon" state.
 */

export type LayoutVariant = "cosmic" | "calm" | "structured" | "data";

export interface Media {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Metric {
  value: string;
  label: string;
  /** Only true when the number is verifiable. Unverified metrics are never rendered. */
  verified: boolean;
}

/**
 * One editorial chapter of a case study. Sections render in array order;
 * omit a section entirely when the source data doesn't support it.
 */
export interface CaseStudySection {
  /** Drives the layout treatment. */
  kind: "concept" | "capabilities" | "engineering" | "outcome";
  /** Mono rail annotation, e.g. "CONTEXT / CONCEPT". */
  label: string;
  /** Display heading. Wrap one word in *asterisks* to set it in Instrument Serif. */
  title: string;
  /** Editorial paragraphs. Optional only for capabilities sections. */
  body?: string[];
  /** Capability list for `capabilities` sections. */
  capabilities?: string[];
  /** Spec-sheet rows (label + text). Only rendered when supplied. */
  specs?: { label: string; text: string }[];
}

export interface CaseStudy {
  sections: CaseStudySection[];
}

export interface Project {
  slug: string;
  /** Zero-padded index used by the annotation layer: 01–04. */
  index: string;
  name: string;
  tagline: string;
  concept: string;
  /** Drives the per-project visual treatment (§6 of the design direction). */
  layoutVariant: LayoutVariant;
  /** Ambient hue token name, e.g. "project-codeverse". */
  accent: string;
  stack: { category: string; items: string[] }[];
  /** Verifiable project state, e.g. "SHIPPED — PRODUCTION DEPLOYMENT". Undefined = unsupported by source. */
  status?: string;
  caseStudy: CaseStudy;
  links: { live?: string; source?: string };
  media: Media[];
  metrics?: Metric[];
}

export interface LabItem {
  slug: string;
  /** Bench-tag identifier, e.g. "EXP-01". */
  id: string;
  name: string;
  description: string;
  tech: string[];
  status: "shipped" | "prototype" | "experiment" | "undocumented";
  links?: { demo?: string; source?: string };
  visual?: Media;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export interface Social {
  label: string;
  href: string;
  /** Mono annotation shown in nav/footer rails. */
  handle?: string;
}

export interface ResumeInfo {
  education: string;
  institution: string;
  period: string;
  /** CGPA intentionally omitted from the site. */
  pdfHref?: string;
  preview?: Media;
}
