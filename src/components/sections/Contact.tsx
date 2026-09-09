import SectionShell from "./SectionShell";
import Reveal from "@/components/motion/Reveal";
import { profile, socials } from "@/content/profile";

/** Links-only contact per brief §19 — email is the hero row, socials follow. */
export default function Contact() {
  return (
    <SectionShell id="contact" index="08" label="CONTACT">
      <Reveal>
        <h2 className="font-display text-display-xl font-medium leading-[1.02] text-ink">
          LET&apos;S BUILD
          <br />
          <span className="accent-serif glow-signal pr-2 text-signal">something.</span>
        </h2>
        <p className="mt-8 max-w-xl leading-relaxed text-ink-60">{profile.contactBody}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <ul className="mt-12 border-t border-line">
          {socials.map((s) => {
            const isEmail = s.href.startsWith("mailto");
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noopener noreferrer"}
                  className="group flex items-center justify-between gap-6 border-b border-line py-6 transition-colors hover:border-signal"
                >
                  <span className="mono-label">{s.label}</span>
                  <span className="flex items-baseline gap-3">
                    <span
                      className={
                        isEmail
                          ? "font-display text-xl font-medium text-ink transition-colors duration-300 group-hover:text-signal md:text-3xl"
                          : "mono-label text-ink-60 transition-colors duration-300 group-hover:text-ink"
                      }
                    >
                      {s.handle}
                    </span>
                    {!isEmail && (
                      <span
                        aria-hidden="true"
                        className="-translate-x-1 mono-label text-signal opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        &rarr;
                      </span>
                    )}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </SectionShell>
  );
}