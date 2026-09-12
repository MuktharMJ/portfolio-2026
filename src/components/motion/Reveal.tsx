"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE } from "@/lib/motion-tokens";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Scroll-into-view reveal. Lift-and-fade under normal motion,
 * opacity-only under prefers-reduced-motion. Runs once.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      data-reveal=""
      /* Hydration-safe: same initial on server and client; reduced motion
         collapses the transition rather than branching rendered DOM. */
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -32px 0px" }}
      transition={{ duration: reduced ? 0.01 : DURATION.medium, ease: EASE, delay: reduced ? 0 : delay }}
      className={`motion-reveal ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
