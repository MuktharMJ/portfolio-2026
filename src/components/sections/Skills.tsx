import SectionShell from "./SectionShell";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";
import { skillGroups } from "@/content/skills";

/** Static capability index — grouped, editorial, technical (brief §16). */
export default function Skills() {
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <SectionShell id="skills" index="05" label="CAPABILITIES">
      <Reveal>
        <h2 className="font-display text-display-l font-medium text-ink">
          Grouped by what
          <br />
          <span className="text-ink-35">they make possible.</span>
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid grid-cols-1 gap-x-12 md:grid-cols-2">
        {skillGroups.map((group, i) => (
          <RevealItem
            key={group.id}
            className={i === skillGroups.length - 1 ? "md:col-span-2" : ""}
          >
            <div className="border-t border-line pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="mono-label">
                  <span className="text-signal">{`0${i + 1}`}</span>&nbsp;&nbsp;{group.title.toUpperCase()}
                </h3>
                <p className="mono-label text-ink-35">{group.skills.length}</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-60">
                {group.skills.join(" · ")}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mono-label mt-10">
          <span className="text-signal">{total}</span> CAPABILITIES ACROSS {skillGroups.length} GROUPS
        </p>
      </Reveal>
    </SectionShell>
  );
}