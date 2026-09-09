import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import GhostNumeral from "@/components/ui/GhostNumeral";

interface SectionShellProps {
  id: string;
  /** Zero-padded section index for the annotation rail: "00"–"09". */
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Shared section scaffolding: hairline rule, ghost-numeral rail,
 * asymmetric 12-column rhythm (narrow rail / wide field). The numeral
 * fills amber when anything inside the section is hovered or focused.
 */
export default function SectionShell({ id, index, label, children, className = "" }: SectionShellProps) {
  return (
    <section id={id} className={`group scroll-mt-24 border-t border-line ${className}`}>
      <div className="shell grid grid-cols-1 gap-10 py-[var(--spacing-section)] md:grid-cols-12">
        <div className="md:col-span-3">
          <Reveal>
            <div className="flex items-baseline gap-4 md:sticky md:top-28 md:block">
              <GhostNumeral
                fillClass="text-signal"
                className="font-display text-4xl leading-none md:text-display-l"
              >
                {index}
              </GhostNumeral>
              <p className="mono-label md:mt-4">{label}</p>
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-9 md:border-l md:border-line md:pl-8">{children}</div>
      </div>
    </section>
  );
}