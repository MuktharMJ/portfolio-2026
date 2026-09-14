/** Render only source-backed content. Unsupported links and sections are omitted. */
export interface Media {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CaseStudySection {
  kind: "concept" | "capabilities" | "engineering" | "outcome";
  label: string;
  /** Asterisk-delimited words receive the editorial serif treatment. */
  title: string;
  body?: string[];
  capabilities?: string[];
  specs?: { label: string; text: string }[];
}

export interface Project {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  concept: string;
  stack: { category: string; items: string[] }[];
  status?: string;
  caseStudy: { sections: CaseStudySection[] };
  links: { live?: string; source?: string };
  media: Media[];
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export interface Social {
  label: string;
  href: string;
  handle: string;
}
