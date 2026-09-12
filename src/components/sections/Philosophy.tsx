import SectionShell from "./SectionShell";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";

const INTERESTS = ["AI", "WEB", "3D", "SYSTEMS", "DESIGN", "DEV TOOLS", "PRODUCTS"];

/** Building philosophy / interests — curiosity, not claims (brief §17). */
export default function Philosophy() {
  return (
    <SectionShell id="philosophy" index="06" label="INTERESTS">
      <Reveal>
        <h2 className="max-w-2xl font-display text-display-m font-medium text-ink">
          Curious about <span className="accent-serif text-signal">everything</span>.
          Serious about <span className="accent-serif text-signal">building</span>.
        </h2>
      </Reveal>
      <RevealGroup className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 md:grid-cols-4">
        {INTERESTS.map((topic, i) => (
          <RevealItem key={topic} className="bg-bg-0 p-6">
            <p className="mono-label text-ink-35">{`0${i + 1}`}</p>
            <p className="mt-6 font-display text-2xl font-medium text-ink">
              {topic}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}