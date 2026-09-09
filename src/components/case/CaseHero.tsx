"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { DURATION, EASE } from "@/lib/motion-tokens";
import type { Project } from "@/content/types";
import type { ProjectHue } from "@/lib/project-hues";

function Line({
  children,
  delay,
  reduced,
}: {
  children: React.ReactNode;
  delay: number;
  reduced: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ opacity: 0, y: "110%" }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduced ? 0.01 : DURATION.large, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Case-study opening: breadcrumb rail, project numeral + name, the existing
 * tagline/concept copy, stack metadata and verifiable status. Entrance is
 * choreographed (masked lines + staggered meta) and reduced-motion aware.
 * The project hue appears only as environmental ambience, never body text.
 */
export default function CaseHero({ project, hue }: { project: Project; hue: ProjectHue }) {
  const reduced = useReducedMotion() ?? false;
  const base = 0.12;
  const step = 0.09;
  const glow = hue.glow;

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.01 : DURATION.medium, ease: EASE, delay },
  });

  return (
    <header className="relative overflow-hidden">
      {/* Room ambience — project-hue lamp, slow drift */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${hue.room}`}
      />
      {/* Ghost numeral watermark */}
      <span
        aria-hidden="true"
        className="ghost-numeral pointer-events-none absolute -right-4 top-16 select-none font-display text-[38vw] font-semibold leading-none md:text-[24vw]"
        style={{ WebkitTextStroke: `1px ${glow}26` }}
      >
        {project.index}
      </span>

      <div className="shell relative z-10 pb-[var(--spacing-section)] pt-36 md:pt-44">
        {/* Breadcrumb rail */}
        <motion.nav
          aria-label="Breadcrumb"
          {...fade(base)}
          className="flex items-center gap-3"
        >
          <Link
            href="/#work"
            className="mono-label inline-flex min-h-11 items-center transition-colors hover:text-signal"
          >
            WORK
          </Link>
          <span aria-hidden="true" className="mono-label text-ink-35">/</span>
          <span aria-current="page" className="mono-label text-ink-60">
            {project.index}
          </span>
        </motion.nav>

        {/* Index + status annotations */}
        <motion.div {...fade(base + step)} className="mt-14 flex items-baseline justify-between gap-4">
          <p className="mono-label" style={{ color: glow }}>
            PROJECT {project.index}
          </p>
          {project.status && <p className="mono-label text-right">{project.status}</p>}
        </motion.div>

        {/* Name — masked line entrance */}
        <h1 className="mt-4 font-display text-display-xl font-medium text-ink">
          <Line delay={base + step} reduced={reduced}>
            {project.name}
          </Line>
        </h1>

        {/* Existing description — no invented copy */}
        <motion.div {...fade(base + step * 3)} className="mt-8 max-w-2xl">
          <p className="font-display text-display-m font-medium text-ink">{project.tagline}</p>
          <p className="mt-6 max-w-xl leading-relaxed text-ink-60">{project.concept}</p>
        </motion.div>

        {/* Stack / metadata — spec-sheet rail */}
        <motion.dl
          {...fade(base + step * 4)}
          className="mt-12 grid grid-cols-1 gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {project.stack.map((group) => (
            <div key={group.category}>
              <dt className="mono-label" style={{ color: glow }}>
                {group.category}
              </dt>
              <dd className="mt-2 font-mono text-xs leading-relaxed text-ink-60">
                {group.items.join(" · ")}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Links only when real URLs exist */}
        {(project.links.live || project.links.source) && (
          <motion.div {...fade(base + step * 5)} className="mt-10 flex flex-wrap gap-4">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label inline-flex min-h-11 items-center bg-signal px-6 text-bg-0 transition-all hover:-translate-y-px hover:brightness-110"
              >
                LIVE EXPERIENCE &nearr;
              </a>
            )}
            {project.links.source && (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label inline-flex min-h-11 items-center border border-line px-6 transition-colors hover:border-signal hover:text-signal"
              >
                SOURCE CODE &nearr;
              </a>
            )}
          </motion.div>
        )}
      </div>
    </header>
  );
}
