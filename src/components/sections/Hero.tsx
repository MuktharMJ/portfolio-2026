"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/content/profile";
import { DURATION, EASE } from "@/lib/motion-tokens";
import Button from "@/components/ui/Button";

/**
 * The 3D machine is decorative, heavy, and below the fold on mobile —
 * load it as a client-only chunk after the page renders.
 */
const HeroMachine = dynamic(() => import("@/components/three/HeroMachine"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-signal" />
    </div>
  ),
});

/** Staggered mask-reveal for a single statement line. */
function Line({ children, delay, reduced }: { children: React.ReactNode; delay: number; reduced: boolean }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="motion-reveal block"
        /* Hydration-safe: initial state is identical on server and client;
           reduced motion collapses the transition to ~0 duration instead
           of branching the rendered DOM. */
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduced ? 0.01 : DURATION.large, ease: EASE, delay: reduced ? 0 : delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Fade-up for mount-staggered hero furniture. */
function FadeUp({ children, delay, reduced, className }: { children: React.ReactNode; delay: number; reduced: boolean; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.01 : DURATION.medium, ease: EASE, delay: reduced ? 0 : delay }}
      className={`motion-reveal ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion() ?? false;
  const base = 0.15;
  const step = 0.09;

  // Restrained scroll choreography: the statement drifts and dims as the
  // hero leaves, the identity strip trails slightly behind. Disabled under
  // reduced motion (transforms resolve to identity values).
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const statementY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 28]);
  const statementOpacity = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.75]);
  const identityY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 12]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* Ambient lamp glow — pure CSS depth, drifts slowly */}
      <div aria-hidden="true" className="hero-ambience" />

      <div className="hero-shell shell relative z-10 flex w-full flex-1 flex-col pt-24 md:pt-32">
        {/* Nameplate — identity leads; the statement answers it */}
        <FadeUp delay={0.1} reduced={reduced}>
          <p className="font-display text-4xl font-semibold tracking-wide text-ink md:text-5xl">
            {profile.name.toUpperCase()}
          </p>
          <div className="mt-2.5 flex items-center justify-between gap-6">
            <p className="mono-label">{profile.roleLine}</p>
            <p className="mono-label hidden shrink-0 sm:block">{profile.portfolioTag}</p>
          </div>
          <div className="mt-4 h-px w-full bg-line" />
        </FadeUp>

        {/* Two-zone composition. Desktop: asymmetric grid — statement and
            CTA own the left seven columns, the machine the right five.
            Mobile: the machine stacks below the statement, above the CTA. */}
        <div className="mt-8 flex flex-1 flex-col lg:mt-6 lg:grid lg:grid-cols-12 lg:gap-x-10">
          {/* Zone 1 — the statement. Deliberately narrower than the page
              so the first viewport reads as a composed page. */}
          <motion.div
            style={{ y: statementY, opacity: statementOpacity }}
            className="motion-reveal hero-statement lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:self-center"
          >
            <h1 className="pt-6 font-display text-display-hero font-medium text-ink lg:pt-0">
              <Line delay={base} reduced={reduced}>{profile.heroLines[0]}</Line>
              <Line delay={base + step} reduced={reduced}>{profile.heroLines[1]}</Line>
              <Line delay={base + step * 2} reduced={reduced}>
                <span className="accent-serif hero-glyph-glow text-signal">{profile.heroAccent}</span>
                {` ${profile.heroAccentTail}`}
              </Line>
            </h1>
          </motion.div>

          {/* Zone 2 — the machine. Absolute-height block on mobile (never
              squeezed beside the headline), full column height on lg. */}
          <div
            aria-hidden="true"
            className="hero-machine relative mt-2 h-64 w-full sm:h-80 lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-2 lg:mt-0 lg:h-full lg:min-h-[28rem]"
          >
            <HeroMachine reduced={reduced} />
          </div>

          {/* Primary affordance — the single action the hero points at */}
          <FadeUp
            delay={0.7}
            reduced={reduced}
            className="mt-8 lg:col-start-1 lg:col-span-7 lg:row-start-2 lg:mt-4"
          >
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#work">Explore my work &darr;</Button>
              <Button href="#resume" variant="ghost">Resume</Button>
            </div>
          </FadeUp>
        </div>

        {/* Identity strip — minimal metadata, count-free bench pointer */}
        <motion.div
          style={{ y: identityY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0.01 : DURATION.medium, ease: EASE, delay: reduced ? 0 : 1 }}
          className="motion-reveal hero-identity mt-8 border-t border-line pt-5 pb-8 md:mt-10 md:pt-6 md:pb-10"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="mono-label">{profile.studioLine}</p>
            <p className="mono-label flex items-center gap-2.5">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
              {profile.availability}
            </p>
            <p className="mono-label text-ink-35 md:order-first">{profile.benchLabel}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
