import Reveal from "@/components/motion/Reveal";
import type { CaseStudySection } from "@/content/types";

function Title({ title }: { title: string }) {
  return title
    .split(/\*([^*]+)\*/g)
    .map((part, i) => (i % 2 === 1 ? <i key={i}>{part}</i> : part));
}

export default function CaseConcept({
  section,
}: {
  section: CaseStudySection;
}) {
  return (
    <section className={`case-chapter chapter-${section.kind}`}>
      <p className="eyebrow">{section.label}</p>
      <Reveal>
        <h2>
          <Title title={section.title} />
        </h2>
        {section.body && (
          <div className="case-prose">
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
        {section.capabilities && (
          <ul className="case-capabilities">
            {section.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {section.specs && (
          <dl className="case-specs">
            {section.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="eyebrow">{spec.label}</dt>
                <dd>{spec.text}</dd>
              </div>
            ))}
          </dl>
        )}
      </Reveal>
    </section>
  );
}
