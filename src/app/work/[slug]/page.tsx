import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import CaseHero from "@/components/case/CaseHero";
import CaseConcept from "@/components/case/CaseConcept";
import CaseNavigation from "@/components/case/CaseNavigation";

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

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const i = projects.findIndex((p) => p.slug === project.slug);
  return (
    <main id="content" className="case-page">
      <CaseHero project={project} />
      <div className="shell case-body">
        {project.caseStudy.sections.map((section) => (
          <CaseConcept key={section.label} section={section} />
        ))}
      </div>
      <CaseNavigation
        prev={projects[(i - 1 + projects.length) % projects.length]}
        next={projects[(i + 1) % projects.length]}
      />
    </main>
  );
}
