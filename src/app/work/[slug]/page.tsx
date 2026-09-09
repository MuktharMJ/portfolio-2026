import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { getHue } from "@/lib/project-hues";
import CaseHero from "@/components/case/CaseHero";
import CaseConcept from "@/components/case/CaseConcept";
import CaseStackTable from "@/components/case/CaseStackTable";
import CaseShowcase from "@/components/case/CaseShowcase";
import CaseNavigation from "@/components/case/CaseNavigation";

/** Pre-render all four case studies at build time. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Case Study | Mukthar M J`,
    description: `${project.tagline} ${project.concept}`,
  };
}

/**
 * One case-study "room": hero → sections in editorial order → full stack
 * table → visual showcase → prev/next navigation. Sections, specs and
 * media render only when the content data supports them.
 */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const hue = getHue(project.accent);
  const flat = projects;
  const i = flat.findIndex((p) => p.slug === project.slug);
  const prev = flat[(i - 1 + flat.length) % flat.length];
  const next = flat[(i + 1) % flat.length];

  return (
    <main id="content" className="relative">
      <CaseHero project={project} hue={hue} />

      {project.caseStudy.sections.map((section, idx) => (
        <CaseConcept
          key={section.label}
          section={section}
          hueClass={hue.fill}
          indexLabel={String(idx + 1).padStart(2, "0")}
        />
      ))}

      <CaseStackTable stack={project.stack} hueClass={hue.fill} />
      <CaseShowcase project={project} hue={hue.glow} />

      <CaseNavigation prev={prev} next={next} hueClass={hue.fill} />
    </main>
  );
}
