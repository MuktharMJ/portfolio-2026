import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/ui/Arrow";
import type { Project } from "@/content/types";

export default function CaseHero({ project }: { project: Project }) {
  return (
    <header className={`case-hero shell project-${project.slug}`}>
      <Link href="/#work" className="text-link case-back">
        <span aria-hidden="true">←</span> All work
      </Link>
      <div className="case-heading-meta">
        <p className="eyebrow">Selected work / {project.index}</p>
        {project.status && <p className="eyebrow">{project.status}</p>}
      </div>
      <h1>{project.name}</h1>
      <div className="case-intro">
        <p>{project.tagline}</p>
        <div>
          <p>{project.concept}</p>
          {(project.links.live || project.links.source) && (
            <div className="case-links">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Visit live project <Arrow />
                </a>
              )}
              {project.links.source && (
                <a
                  href={project.links.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Source code <Arrow />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <dl className="case-stack">
        {project.stack.map((group) => (
          <div key={group.category}>
            <dt className="eyebrow">{group.category}</dt>
            <dd>{group.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
      <div className="case-media">
        {project.media.map((media, i) => (
          <figure key={media.src}>
            <Image
              src={media.src}
              alt={media.alt}
              width={media.width ?? 1920}
              height={media.height ?? 1080}
              sizes={
                project.slug === "gearpilot"
                  ? "(max-width: 560px) 83vw, (max-width: 1000px) 80vw, 792px"
                  : "(max-width: 560px) 83vw, (max-width: 1200px) 80vw, 972px"
              }
              quality={90}
              priority={i === 0}
            />
            <figcaption>
              <span>{project.name}</span>
              <a href={media.src} target="_blank" rel="noopener noreferrer">
                View full image <Arrow />
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </header>
  );
}
