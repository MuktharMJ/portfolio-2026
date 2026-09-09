/**
 * Per-project ambience bundles. Static class strings so Tailwind's JIT
 * compiler sees every token; raw hex is for inline glow/ambience styling.
 * Project hues are environmental identity only — never body text (brief §4).
 *
 * Identity sources (verified from the live product sites, adapted to the
 * NIGHTBENCH dark stage — environmental signals, never large solids):
 *  · codeverse  — violet (system original)
 *  · zenugo     — cyan #22d3ee, from the product's real --accent-secondary
 *                 #06b6d4 inside its indigo→cyan ambient gradient
 *  · schedura   — gold #fbbf24, from the product's real --brand-amber
 *                 #f59e0b (its glow-shadow token)
 *  · gearpilot  — blue (system original)
 *
 * Every hover treatment carries a matching `group-focus-within:` variant,
 * so keyboard focus and pointer hover receive the same project identity.
 * The global portfolio signal stays amber #FFB65C — untouched.
 */
export interface ProjectHue {
  /** Numeral / accent text fill. */
  fill: string;
  /** Ambient wash — used at very low opacity. */
  wash: string;
  /** Hairline draw color. */
  bar: string;
  /** Border hover/focus color. */
  borderHover: string;
  /** Raw hex for inline glow/watermark styling. */
  glow: string;
  /** CSS custom-property group, e.g. `case-room-codeverse`. */
  room: string;
}

export const projectHues: Record<string, ProjectHue> = {
  "project-codeverse": {
    fill: "text-project-codeverse",
    wash: "bg-project-codeverse/[0.05] group-focus-within:bg-project-codeverse/[0.05]",
    bar: "bg-project-codeverse group-focus-within:bg-project-codeverse",
    borderHover: "group-hover:border-project-codeverse group-focus-within:border-project-codeverse",
    glow: "#8f7bff",
    room: "case-room-codeverse",
  },
  "project-zenugo": {
    fill: "text-project-zenugo",
    wash: "bg-project-zenugo/[0.05] group-focus-within:bg-project-zenugo/[0.05]",
    bar: "bg-project-zenugo group-focus-within:bg-project-zenugo",
    borderHover: "group-hover:border-project-zenugo group-focus-within:border-project-zenugo",
    glow: "#22d3ee",
    room: "case-room-zenugo",
  },
  "project-schedura": {
    fill: "text-project-schedura",
    wash: "bg-project-schedura/[0.05] group-focus-within:bg-project-schedura/[0.05]",
    bar: "bg-project-schedura group-focus-within:bg-project-schedura",
    borderHover: "group-hover:border-project-schedura group-focus-within:border-project-schedura",
    glow: "#fbbf24",
    room: "case-room-schedura",
  },
  "project-gearpilot": {
    fill: "text-project-gearpilot",
    wash: "bg-project-gearpilot/[0.05] group-focus-within:bg-project-gearpilot/[0.05]",
    bar: "bg-project-gearpilot group-focus-within:bg-project-gearpilot",
    borderHover: "group-hover:border-project-gearpilot group-focus-within:border-project-gearpilot",
    glow: "#62b6ff",
    room: "case-room-gearpilot",
  },
};

export function getHue(accent: string): ProjectHue {
  return projectHues[accent] ?? projectHues["project-codeverse"];
}
