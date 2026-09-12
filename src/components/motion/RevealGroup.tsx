"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer } from "@/lib/motion-tokens";

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Element rendered as the container. Defaults to div. */
  as?: "div" | "ul" | "ol" | "dl";
}

/**
 * Scroll-into-view stagger container. Children using RevealItem cascade in
 * with the NIGHTBENCH hierarchy (brief §22, MEDIUM tier). Reduced motion:
 * no stagger, children fade in instantly.
 */
export default function RevealGroup({ children, className, as = "div" }: RevealGroupProps) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -32px 0px" }}
      variants={reduced ? { hidden: {}, visible: {} } : staggerContainer}
      className={`motion-reveal ${className ?? ""}`}
    >
      {children}
    </Tag>
  );
}