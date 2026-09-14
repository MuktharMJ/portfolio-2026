import Link from "next/link";
import Arrow from "@/components/ui/Arrow";
import type { Project } from "@/content/types";

export default function CaseNavigation({
  prev,
  next,
}: {
  prev: Project;
  next: Project;
}) {
  return (
    <nav className="case-navigation" aria-label="Project navigation">
      <div className="shell">
        <Link className="previous-project" href={`/work/${prev.slug}`}>
          <span className="eyebrow">← Previous project</span>
          <span>{prev.name}</span>
        </Link>
        <Link className="next-project" href={`/work/${next.slug}`}>
          <span className="eyebrow">Next case study</span>
          <span>
            {next.name}
            <Arrow />
          </span>
        </Link>
      </div>
    </nav>
  );
}
