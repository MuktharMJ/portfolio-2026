import Image from "next/image";
import Link from "next/link";
import SectionShell from "./SectionShell";
import Reveal from "@/components/motion/Reveal";
import MaskReveal from "@/components/motion/MaskReveal";
import GhostNumeral from "@/components/ui/GhostNumeral";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { getHue, type ProjectHue } from "@/lib/project-hues";

/**
 * Featured Work — the current roster, each linking to its case study at
 * /work/<slug>. Intentionally count-free: rows are data-driven, so new
 * projects can be added without touching this section. Rows emerge behind
 * a mask, each carrying its project hue as ambience: numeral fill, row
 * wash, draw hairline, stack rail, and an atmosphere panel (the
 * case-study cover slot — no fabricated media).
 */
export default function FeaturedWork() {
  return (
    <SectionShell id="work" index="02" label="FEATURED WORK">
      <Reveal>
        <p className="mono-label text-ink-35">FROM THE BENCH</p>
        <h2 className="mt-4 font-display text-display-l font-medium text-ink">
          The bench.
          <br />
          <span className="text-ink-35">Built to be used.</span>
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-ink-60">
          Each project gets its own treatment, its own atmosphere. Open a project to enter its
          case study.
        </p>
      </Reveal>

      <ul className="mt-14">
        {projects.map((p) => (
          <li key={p.slug} id={`work-${p.slug}`} className="scroll-mt-24">
            <MaskReveal>
              <ProjectRow project={p} hue={getHue(p.accent)} />
            </MaskReveal>
          </li>
        ))}
      </ul>

      <Reveal delay={0.1}>
        <p className="mono-label mt-8">SELECT A PROJECT TO OPEN ITS CASE STUDY</p>
      </Reveal>
    </SectionShell>
  );
}

function ProjectRow({ project, hue }: { project: Project; hue: ProjectHue }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${project.name} — open case study`}
      className="project-row group relative block border-b border-line"
    >
      {/* Ambient hue wash on hover/focus */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 ${hue.wash}`}
      />
      {/* Hairline that draws in from the left with the project hue */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100 ${hue.bar}`}
      />

      <div className="relative grid grid-cols-12 items-center gap-x-4 gap-y-6 py-10 md:py-14">
        <div className="col-span-2 md:col-span-1">
          <GhostNumeral fillClass={hue.fill} className="font-display text-3xl leading-none md:text-5xl">
            {project.index}
          </GhostNumeral>
        </div>

        <div className="col-span-10 md:col-span-6">
          <h3 className="font-display text-display-m font-medium text-ink">
            {project.name}
          </h3>
          <p className="mt-3 hidden max-w-lg leading-relaxed text-ink-60 md:block">{project.concept}</p>
        </div>

        {/* Mobile meta — stacked, no desktop interaction required */}
        <div className="col-span-12 flex flex-col items-start gap-2 md:hidden">
          <p className="mono-label">{project.tagline}</p>
          <p className={`mono-label transition-colors duration-300 group-hover:text-ink group-focus-within:text-ink`}>
            OPEN CASE STUDY <span aria-hidden="true">&rarr;</span>
          </p>
        </div>

        {/* Existing screenshots anchor each row on both touch and desktop. */}
        <div className="col-span-12 min-w-0 md:col-span-5">
          <div className="relative aspect-video overflow-hidden bg-bg-1">
            {project.media[0] && <Image src={project.media[0].src} alt={project.media[0].alt} fill sizes="(max-width: 767px) 90vw, (max-width: 1280px) 30vw, 340px" className="project-image object-cover" />}
          </div>
          <p className="mono-label mt-3 hidden items-center justify-between md:flex">
            OPEN CASE STUDY <span aria-hidden="true" className="project-arrow">&rarr;</span>
          </p>
        </div>
      </div>

      {/* Stack preview — spec-sheet rail */}
      <div className="relative hidden flex-wrap items-baseline gap-x-8 gap-y-2 border-t border-line py-4 sm:flex md:ml-[8.333%]">
        {project.stack.map((group) => (
          <p key={group.category} className="mono-label text-ink-35">
            <span className="text-signal">{group.category}</span>
            <span className="mx-2 text-ink-35">&mdash;</span>
            {group.items.join(", ")}
          </p>
        ))}
      </div>
    </Link>
  );
}
