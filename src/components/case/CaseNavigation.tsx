import Link from "next/link";
import GhostNumeral from "@/components/ui/GhostNumeral";
import type { Project } from "@/content/types";
import { getHue } from "@/lib/project-hues";

/**
 * Project-to-project navigation: previous / next flagship, wrapping around,
 * plus back-to-work. Rows fill with the target project's hue on hover.
 * Touch targets ≥44px; hue is ambience only.
 */
export default function CaseNavigation({
  prev,
  next,
  hueClass,
}: {
  prev: Project;
  next: Project;
  /** Text color class of the *current* project's hue for the rail label. */
  hueClass: string;
}) {
  return (
    <nav aria-label="Project navigation" className="border-t border-line">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <ProjectNavLink project={prev} direction="prev" />
        <ProjectNavLink project={next} direction="next" bordered />
      </div>
      <div className="shell border-t border-line py-10">
        <Link
          href="/#work"
          className="mono-label inline-flex min-h-11 items-center gap-3 transition-colors hover:text-signal"
        >
          <span className={hueClass}>&larr;</span> BACK TO ALL WORK
        </Link>
      </div>
    </nav>
  );
}

function ProjectNavLink({
  project,
  direction,
  bordered = false,
}: {
  project: Project;
  direction: "prev" | "next";
  bordered?: boolean;
}) {
  const hue = getHue(project.accent);
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative block min-h-44 overflow-hidden p-6 transition-[background-color] duration-500 md:p-10 ${hue.wash} ${
        bordered ? "border-t border-line sm:border-l sm:border-t-0" : ""
      }`}
    >
      {/* Hairline draw in the target project's hue */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${hue.bar}`}
      />
      <div
        className={`flex h-full min-h-36 flex-col ${direction === "prev" ? "items-start" : "items-end text-right"}`}
      >
        <p className="mono-label text-ink-35">
          {direction === "prev" ? "PREVIOUS PROJECT" : "NEXT PROJECT"}
        </p>
        <div className="mt-6 flex items-baseline gap-4">
          <GhostNumeral fillClass={hue.fill} className="font-display text-3xl leading-none md:text-5xl">
            {project.index}
          </GhostNumeral>
          <span className="font-display text-display-m font-medium text-ink transition-colors duration-300 group-hover:text-ink">
            {project.name}
          </span>
        </div>
        <p className="mono-label mt-4 max-w-xs text-ink-35">{project.tagline}</p>
        <span
          className={`mono-label mt-auto inline-flex items-center gap-2 pt-6 transition-colors duration-300 group-hover:text-signal ${hue.fill}`}
        >
          {direction === "prev" ? "\u2190 OPEN" : "OPEN \u2192"}
        </span>
      </div>
    </Link>
  );
}
