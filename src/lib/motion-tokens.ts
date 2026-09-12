/**
 * NIGHTBENCH motion tokens — three-tier motion hierarchy (brief §22).
 * Durations in seconds; easing is the system-wide signature curve.
 */
import type { Transition, Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  micro: 0.18,
  medium: 0.45,
  large: 0.85,
} as const;

export const STAGGER = 0.045;

export const springSoft: Transition = { type: "spring", stiffness: 220, damping: 26 };

/** Parent container: staggers children in. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER, delayChildren: 0.03 },
  },
};

/** Child: masked lift-and-reveal. Degrades to opacity-only under reduced motion. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.medium, ease: EASE },
  },
};

export const fadeItem: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.medium, ease: EASE } },
};

/** Shared props helper: animate on scroll into view, once. */
export const inViewProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
} as const;
