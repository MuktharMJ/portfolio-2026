import SectionShell from "./SectionShell";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import { labItems } from "@/content/lab";
import type { LabItem } from "@/content/types";

/**
 * The Lab — a workbench wall (brief §15). Undocumented slots render as an
 * honest empty-state: bench tag, reserved marker, status. Nothing is
 * fabricated; entries land here as they get documented.
 */
export default function TheLab() {
  return (
    <SectionShell id="lab" index="03" label="THE LAB">
      <Reveal>
        <h2 className="max-w-2xl font-display text-display-m font-medium leading-snug text-ink">
          Small things. Weird ideas. Things I built because I wanted to know if I could.
        </h2>
        <p className="mono-label mt-6 text-ink-35">
          10 BENCH SLOTS RESERVED &mdash; DOCUMENTATION IN PROGRESS
        </p>
      </Reveal>

      <RevealGroup as="ul" className="mt-12 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
        {labItems.map((item, i) => (
          <RevealItem as="li" key={item.slug} className="group border-b border-line py-8">
            {item.status === "undocumented" ? (
              <UndocumentedCell id={item.id} mirrored={i % 2 === 1} />
            ) : (
              <DocumentedCell item={item} />
            )}
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mono-label mt-10">10+ BUILDS &mdash; MORE IN THE DRAWER</p>
      </Reveal>
    </SectionShell>
  );
}

/** Honest empty state: bench tag, reserved slot marker, status. */
function UndocumentedCell({ id, mirrored }: { id: string; mirrored: boolean }) {
  return (
    <>
      <div className={`flex items-baseline justify-between gap-4 ${mirrored ? "sm:flex-row-reverse" : ""}`}>
        <span className="mono-label text-ink-35">{id}</span>
        <span className="mono-label text-ink-35">UNDOCUMENTED</span>
      </div>
      <div className={`mt-6 flex items-center gap-4 ${mirrored ? "sm:flex-row-reverse" : ""}`}>
        <span
          aria-hidden="true"
          className="h-9 w-9 shrink-0 border border-line transition-colors duration-300 group-hover:border-signal"
        />
        <p className="mono-label text-ink-60">Details coming soon.</p>
      </div>
    </>
  );
}

/** Documented entry — rendered once real Lab data lands. */
function DocumentedCell({ item }: { item: LabItem }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <span className="mono-label text-ink-35">{item.id}</span>
        {item.tech.length > 0 && (
          <span className="mono-label text-ink-35">{item.tech.join(" · ")}</span>
        )}
      </div>
      <h3 className="mt-4 font-display text-2xl font-medium text-ink">{item.name}</h3>
      <p className="mt-2 leading-relaxed text-ink-60">{item.description}</p>
    </>
  );
}