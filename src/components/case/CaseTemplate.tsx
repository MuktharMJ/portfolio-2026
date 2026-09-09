"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion-tokens";

/**
 * Case-study transition template: an intro panel tinted with the current
 * project's hue sweeps up when a new case-study room is entered, making
 * homepage → case study feel like walking into a different room of
 * NIGHTBENCH. Session-level per path, so back/forward and refreshes stay
 * fast. Reduced motion: no sweep, no scroll jump — content fades in place.
 */
export default function CaseTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion() ?? false;
  // Track which paths this session has already seen the entrance for.
  // Starts empty on BOTH server and client (hydration-safe); the effect
  // fills it after hydration, so `firstVisit` is only ever flipped
  // client-side and never branches the SSR'd DOM.
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [seenReady, setSeenReady] = useState(false);
  const firstVisit = seenReady && !seen.has(pathname);

  useEffect(() => {
    setSeenReady(true);
    setSeen((prev) => new Set(prev).add(pathname));
  }, [pathname]);

  // Put the reader at the top of the new room on entrance.
  useEffect(() => {
    if (!reduced) {
      window.scrollTo(0, 0);
    }
  }, [pathname, reduced]);

  return (
    <>
      <AnimatePresence mode="wait">
        {firstVisit && !reduced && (
          <motion.div
            key={`${pathname}-intro`}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[65] bg-bg-1"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.large, ease: EASE, delay: 0.05 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        /* Hydration-safe: initial identical on server and client; reduced
           motion shortens the transition instead of branching the DOM. */
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.01 : DURATION.medium, ease: EASE, delay: reduced ? 0 : 0.12 }}
      >
        {children}
      </motion.div>
    </>
  );
}
