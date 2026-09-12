"use client";

import { useSyncExternalStore } from "react";

let media: MediaQueryList | undefined;
function preference() {
  return media ??= window.matchMedia("(prefers-reduced-motion: reduce)");
}
function subscribe(update: () => void) {
  const query = preference();
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}
const snapshot = () => preference().matches;
const serverSnapshot = () => false;

/** Hydration-stable and reactive to OS preference changes during the session. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
