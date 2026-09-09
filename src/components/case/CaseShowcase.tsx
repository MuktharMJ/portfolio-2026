import Reveal from "@/components/motion/Reveal";
import MediaReveal from "@/components/case/MediaReveal";
import type { Project } from "@/content/types";

/**
 * Visual showcase. When real media exists in the content data it renders
 * with the sweep reveal treatment; until then this is an honest, designed
 * "visuals pending" slot — no fabricated screenshots (brief §26).
 */
export default function CaseShowcase({ project, hue }: { project: Project; hue: string }) {
  return (
    <section className="shell border-t border-line py-[var(--spacing-section)]">
      <Reveal>
        <p className="mono-label">
          <span className="text-ink-35">04 /</span> VISUAL SHOWCASE
        </p>
        <h2 className="mt-6 font-display text-display-l font-medium text-ink">
          Inside the <span className="accent-serif">build</span>.
        </h2>
      </Reveal>

      {project.media.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
          {project.media.map((item, i) => (
            <Reveal
              key={item.src}
              delay={i * 0.06}
              className={i % 3 === 0 ? "md:col-span-7" : "md:col-span-5"}
            >
              <MediaReveal src={item.src} alt={item.alt} hue={hue} width={item.width} height={item.height} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal delay={0.08}>
          <div className="mt-12 flex min-h-44 items-center justify-center border border-dashed border-line">
            <p className="mono-label px-6 py-6 text-center">
              VISUALS IN CAPTURE — THIS SLOT RESERVES SPACE FOR REAL SCREENSHOTS
            </p>
          </div>
        </Reveal>
      )}
    </section>
  );
}
