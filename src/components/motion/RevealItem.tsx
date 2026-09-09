"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE, revealItem } from "@/lib/motion-tokens";

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  /** Element rendered. Defaults to div. */
  as?: "div" | "li" | "dt" | "dd";
}

/**
 * Child of RevealGroup — masked lift-and-reveal with the NIGHTBENCH
 * signature ease. Reduced motion: instant opacity-only fade.
 */
export default function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as] as typeof motion.div;
  /* Hydration-safe: the hidden variant (SSR inline styles) must be
     identical on server and client — reduced motion only shortens the
     visible transition, never branches the rendered DOM. */
  const variants = {
    ...revealItem,
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.01 : DURATION.medium, ease: EASE },
    },
  };
  return (
    <Tag variants={variants} className={className}>
      {children}
    </Tag>
  );
}