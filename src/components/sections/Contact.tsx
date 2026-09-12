import SectionShell from "./SectionShell";
import Reveal from "@/components/motion/Reveal";
import CopyEmail from "@/components/ui/CopyEmail";
import { profile, socials } from "@/content/profile";

export default function Contact() {
  return (
    <SectionShell id="contact" index="08" label="CONTACT">
      <Reveal>
        <h2 className="font-display text-display-xl font-medium leading-[1.02] text-ink">LET&apos;S BUILD<br /><span className="accent-serif glow-signal pr-2 text-signal">something.</span></h2>
        <p className="mt-8 max-w-xl leading-relaxed text-ink-60">{profile.contactBody}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <ul className="mt-12 border-t border-line">
          {socials.map(s => {
            const email = s.href.startsWith("mailto:");
            const external = s.href.startsWith("https:");
            return (
              <li key={s.label} className="border-b border-line py-4">
                <a href={s.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="contact-link group flex min-h-14 flex-col items-start justify-between gap-2 py-2 sm:flex-row sm:items-center sm:gap-6">
                  <span className="mono-label shrink-0">{s.label}</span>
                  <span className={`contact-handle min-w-0 break-words ${email ? "font-display text-xl font-medium text-ink md:text-3xl" : "font-mono text-xs text-ink-60"}`}>
                    {s.handle}<span aria-hidden="true" className="ml-2 inline-block text-sm text-ink-60">{external ? "↗" : ""}</span>
                  </span>
                </a>
                {email && <CopyEmail email={s.href.slice(7)} />}
              </li>
            );
          })}
        </ul>
      </Reveal>
    </SectionShell>
  );
}
