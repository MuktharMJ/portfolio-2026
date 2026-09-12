import SectionShell from "./SectionShell";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { resume } from "@/content/profile";

export default function ResumeSection() {
  return (
    <SectionShell id="resume" index="07" label="RESUME">
      <Reveal>
        <h2 className="font-display text-display-l font-medium text-ink">The paper trail.</h2>
        <p className="mt-6 max-w-xl leading-relaxed text-ink-60">
          One page. What I&apos;m studying, what I&apos;ve built, how I work.
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <dl className="mt-10 max-w-xl border-t border-line">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6 border-b border-line py-5">
            <dt className="mono-label">EDUCATION</dt>
            <dd className="sm:text-right font-medium text-ink">{resume.education}</dd>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6 border-b border-line py-5">
            <dt className="mono-label">INSTITUTION</dt>
            <dd className="sm:text-right text-ink-60">{resume.institution}</dd>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6 border-b border-line py-5">
            <dt className="mono-label">PERIOD</dt>
            <dd className="sm:text-right text-ink-60">{resume.period}</dd>
          </div>
        </dl>
      </Reveal>
      <Reveal delay={0.12}>
        <div className="mt-8 flex flex-wrap gap-4">
          {resume.pdfHref ? (
            <Button href={resume.pdfHref} external>Download PDF</Button>
          ) : (
            <Button href="#" disabled>Download PDF &mdash; coming soon</Button>
          )}
        </div>
      </Reveal>
    </SectionShell>
  );
}