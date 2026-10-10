import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import Arrow from "@/components/ui/Arrow";
import Reveal from "@/components/motion/Reveal";

// Match the editorial gallery's actual media widths, including the small GearPilot entry.
const imageSizes: Record<string, string> = {
  codeverse:
    "(max-width: 560px) 82vw, (max-width: 799px) 80vw, (max-width: 1100px) 56vw, (max-width: 1552px) 57vw, 870px",
  "zenugo-ai":
    "(max-width: 560px) 79vw, (max-width: 799px) 43vw, (max-width: 1552px) 46vw, 730px",
  schedura:
    "(max-width: 560px) 73vw, (max-width: 799px) 31vw, (max-width: 1552px) 32vw, 520px",
  gearpilot: "(max-width: 560px) 30vw, 252px",
  devmap: "(max-width: 560px) 80vw, (max-width: 1000px) 40vw, 540px",
};

export default function FeaturedWork() {
  return (
    <section id="work" className="work shell" aria-labelledby="work-title">
      <div className="section-heading">
        <h2 id="work-title">
          Selected <i>work</i>
          <span className="work-count">({String(projects.length).padStart(2, "0")})</span>
        </h2>
        <p className="eyebrow">A few ideas made real</p>
      </div>
      <div className="project-grid">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            className={`project project-${project.slug}`}
          >
            <article>
              {project.media[0] && <Link
                href={`/work/${project.slug}`}
                className="project-media"
                aria-label={`Explore ${project.name} case study`}
              >
                <div className="project-media-top">
                  <span>
                    {project.index} / {project.name}
                  </span>
                  <span aria-hidden="true">↗</span>
                </div>
                <div className="project-screen">
                  <Image
                    src={project.media[0].src}
                    alt={project.media[0].alt}
                    width={project.media[0].width ?? 1920}
                    height={project.media[0].height ?? 1080}
                    sizes={imageSizes[project.slug]}
                    quality={90}
                    priority={i === 0}
                  />
                </div>
                <span className="project-open">
                  View case study <Arrow />
                </span>
              </Link>}
              <div className="project-caption">
                <div>
                  <p className="eyebrow">{project.category}</p>
                  <h3>
                    <Link href={`/work/${project.slug}`}>
                      {project.name} <Arrow />
                    </Link>
                  </h3>
                </div>
                <p className="project-summary">{project.tagline}</p>
                <p className="project-proof">{project.proof}</p>
                <div className="project-destinations">
                  <Link href={`/work/${project.slug}`}>Case study <Arrow /></Link>
                  {project.links.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} live application`}>Live <Arrow /></a>}
                  {project.links.source && <a href={project.links.source} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} source code`}>Source <Arrow /></a>}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
