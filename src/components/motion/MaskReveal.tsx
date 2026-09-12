"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE } from "@/lib/motion-tokens";

interface MaskRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Masked scroll reveal: content slides up from behind a clipping mask,
 * so rows emerge progressively rather than fading in place. Reduced
 * motion: instant opacity-only.
 */
export default function MaskReveal({ children, delay = 0, className }: MaskRevealProps) {
  const reduced = useReducedMotion() ?? false;
  return (
    <div className={`motion-mask ${className ?? ""}`}>
      <motion.div
        data-reveal=""
        /* Hydration-safe: initial/whileInView identical on server and client;
           reduced motion only shortens the transition. */
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -32px 0px" }}
        transition={
          reduced
            ? { duration: 0.01 }
            : { duration: DURATION.medium, ease: EASE, delay: reduced ? 0 : delay }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}