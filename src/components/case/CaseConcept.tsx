import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import type { CaseStudySection } from "@/content/types";

/**
 * Editorial case-study section renderer. Layout per kind:
 * - concept:      asymmetric — label rail left, prose right
 * - capabilities: numbered capability ledger (structured, operational feel)
 * - engineering:  prose + spec-sheet rows
 * - outcome:      centered closing statement
 * Serif accent words come from *asterisks* in the title. Sections render
 * only what the content data supports.
 */
export default function CaseConcept({
  section,
  hueClass,
  indexLabel,
}: {
  section: CaseStudySection;
  /** Tailwind text color class for the project hue (rail + numerals). */
  hueClass: string;
  /** Zero-padded section number for the rail annotation. */
  indexLabel: string;
}) {
  const heading = (
    <h2 className="font-display text-display-l font-medium text-ink">
      {renderTitle(section.title)}
    </h2>
  );

  const numeral = (
    <p className="mono-label">
      <span className={hueClass} aria-hidden="true">
        {indexLabel}
      </span>
      <span className="mx-2 text-ink-35" aria-hidden="true">/</span>
      {section.label}
    </p>
  );

  if (section.kind === "capabilities" && section.capabilities?.length) {
    return (
      <section className="shell border-t border-line py-[var(--spacing-section)]">
        {numeral}
        <Reveal className="mt-6">{heading}</Reveal>
        <RevealGroup as="ol" className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {section.capabilities.map((capability, i) => (
            <RevealItem
              key={capability}
              as="li"
              className="group flex min-h-11 items-baseline gap-4 border-b border-line py-4"
            >
              <span className={`mono-label shrink-0 ${hueClass}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-ink-60">{capability}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    );
  }

  if (section.kind === "outcome") {
    return (
      <section className="shell border-t border-line py-[var(--spacing-section)]">
        {numeral}
        <Reveal className="mx-auto mt-10 max-w-2xl text-center">
          {heading}
          <div className="mt-8 space-y-5 leading-relaxed text-ink-60">
            {(section.body ?? []).map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </section>
    );
  }

  // concept + engineering: asymmetric label rail / wide field
  return (
    <section className="shell border-t border-line py-[var(--spacing-section)]">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <Reveal>
            <div className="md:sticky md:top-28">{numeral}</div>
          </Reveal>
        </div>
        <div className="md:col-span-9">
          <Reveal>{heading}</Reveal>
          <div className="mt-8 max-w-2xl space-y-5 leading-relaxed text-ink-60">
            {(section.body ?? []).map((paragraph) => (
              <Reveal key={paragraph.slice(0, 32)}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
          {section.specs && section.specs.length > 0 && (
            <RevealGroup as="dl" className="mt-12 border-t border-line">
              {section.specs.map((spec) => (
                <RevealItem
                  key={spec.label}
                  className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <dt className="mono-label">
                    <span className={hueClass}>{spec.label}</span>
                  </dt>
                  <dd className="font-mono text-xs leading-relaxed text-ink-60">{spec.text}</dd>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </div>
    </section>
  );
}

/** Renders a section title, setting *asterisked* words in Instrument Serif. */
function renderTitle(title: string) {
  const parts = title.split(/\*([^*]+)\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="accent-serif">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
