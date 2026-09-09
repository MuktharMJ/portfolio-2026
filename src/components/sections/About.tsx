import SectionShell from "./SectionShell";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";

const PILLARS = [
  { title: "BUILD", body: "Full-stack applications, interactive experiences, APIs and products." },
  { title: "EXPLORE", body: "AI, LLMs, developer tooling and emerging technologies." },
  { title: "DESIGN", body: "Interfaces that feel intentional rather than assembled." },
  { title: "LEARN", body: "Constantly experimenting with new technologies and approaches." },
];

/** About — personal, not a LinkedIn biography (brief §8). */
export default function About() {
  return (
    <SectionShell id="about" index="04" label="ABOUT">
      <Reveal>
        <h2 className="max-w-2xl font-display text-display-m font-medium leading-snug text-ink">
          I&apos;m Mukthar &mdash; a software engineering student who likes turning ideas into
          things people can actually <span className="accent-serif text-signal">use</span>.
        </h2>
      </Reveal>
      <RevealGroup className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
        {PILLARS.map((p, i) => (
          <RevealItem key={p.title} className="bg-bg-0 p-7">
            <p className="mono-label text-signal">{`0${i + 1}`}</p>
            <h3 className="mt-3 font-display text-xl font-medium text-ink">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-ink-60">{p.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}