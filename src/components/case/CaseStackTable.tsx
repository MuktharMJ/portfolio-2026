import RevealGroup from "@/components/motion/RevealGroup";
import RevealItem from "@/components/motion/RevealItem";

/**
 * Full stack rendered as a spec-sheet table — the operational record of
 * everything the project actually uses, straight from the content data.
 */
export default function CaseStackTable({
  stack,
  hueClass,
}: {
  stack: { category: string; items: string[] }[];
  hueClass: string;
}) {
  return (
    <section className="shell border-t border-line py-[var(--spacing-section)]">
      <RevealGroup as="dl" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group) => (
          <RevealItem key={group.category} className="border-b border-line py-6 sm:pr-8">
            <dt className="mono-label">
              <span className={hueClass}>{group.category}</span>
            </dt>
            <dd className="mt-3 font-mono text-xs leading-loose text-ink-60">
              {group.items.join(" · ")}
            </dd>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
