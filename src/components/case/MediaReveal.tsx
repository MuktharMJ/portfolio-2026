"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion-tokens";

/**
 * Media reveal: a project-hue tint sweeps across the frame, then lifts to
 * expose the image underneath; the image de-scales from a slight zoom.
 * Falls back to a simple fade for missing/errored media, so the "media
 * pending" state stays designed. Reduced motion: opacity-only.
 */
export default function MediaReveal({
  src,
  alt,
  hue,
  width,
  height,
  className = "",
  delay = 0,
}: {
  src: string;
  alt: string;
  /** Raw project hex for the sweep tint. */
  hue: string;
  width?: number;
  height?: number;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  // Hydration-safe mount gate: the sweep panel is mounted client-side only,
  // so conditional DOM never branches between SSR and hydration. Reduced
  // motion is honoured by skipping the panel in the effect.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!reduced) setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lazy-load: only mount the img once the frame is near the viewport.
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden border border-line ${className}`}>
      <div className="relative aspect-[16/9] w-full bg-bg-1">
        {inView && !failed && (
          <motion.img
            src={src}
            alt={alt}
            width={width}
            height={height}
            onError={() => setFailed(true)}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              opacity: { duration: reduced ? 0.01 : DURATION.medium, ease: EASE, delay },
              scale: { duration: reduced ? 0.01 : DURATION.large, ease: EASE, delay },
            }}
          />
        )}

        {failed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="mono-label">VISUAL — COMING SOON</p>
          </div>
        )}

        {/* Project-hue sweep panel: covers, then lifts away */}
        {mounted && !failed && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundColor: hue }}
            initial={{ y: 0 }}
            whileInView={{ y: "-101%" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: DURATION.large, ease: EASE, delay }}
          />
        )}

        {/* Ambient glow inside the frame (sanctioned media ambience) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(90% 90% at 85% 0%, ${hue}14 0%, transparent 60%)`,
          }}
        />
      </div>
    </div>
  );
}
