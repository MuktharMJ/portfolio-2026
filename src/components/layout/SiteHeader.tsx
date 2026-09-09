"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { EASE, DURATION } from "@/lib/motion-tokens";

const NAV_ITEMS = [
  { label: "WORK", href: "#work" },
  { label: "LAB", href: "#lab" },
  { label: "ABOUT", href: "#about" },
  { label: "RESUME", href: "#resume" },
  { label: "CONTACT", href: "#contact" },
];

export default function SiteHeader() {
  // From case-study pages the section anchors live on the homepage,
  // so nav links resolve to "/#work" etc.; on the homepage they stay bare.
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Condense the bar after 80px of travel + scroll-spy: the nav link whose
  // section spans the 35%-of-viewport line is the active one.
  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.href.slice(1));
    const onScroll = () => {
      setCondensed(window.scrollY > 80);
      const band = window.innerHeight * 0.35;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= band && rect.bottom > band) {
          current = id;
          break;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Scroll lock + ESC close while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Page progress — a thin amber hairline along the very top
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        condensed
          ? "border-b border-line bg-bg-0/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      {/* Page progress hairline — rendered unconditionally (hydration-safe:
          never branch DOM on prefers-reduced-motion). It is scroll-driven,
          i.e. a direct reflection of user input, not autonomous motion. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-signal"
      />

      <div className="shell flex h-20 items-center justify-between">
        {/* Wordmark intentionally removed for submission — nav owns the bar.
            The right-side nav keeps its layout via justify-between. */}
        <span aria-hidden="true" className="select-none" />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const id = item.href.slice(1);
            const isActive = onHome && active === id;
            const href = onHome ? item.href : `/${item.href}`;
            return (
              <Link
                key={item.label}
                href={href}
                aria-current={isActive ? "true" : undefined}
                className={`mono-label relative transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-signal ${
                  isActive ? "text-signal after:scale-x-100" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile burger — two hairlines morphing to an X */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span
            className={`absolute h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-[3.5px]"
            }`}
          />
          <span
            className={`absolute h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-[3.5px]"
            }`}
          />
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceSafe(), ease: EASE }}
            className="fixed inset-0 top-20 z-40 flex flex-col bg-bg-0 md:hidden"
          >
            <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: DURATION.medium, delay: 0.08 + i * 0.06, ease: EASE }}
                  className="border-b border-line"
                >
                  <Link
                    href={onHome ? item.href : `/${item.href}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-5"
                  >
                    <span className="mono-label text-ink-35">{`0${i + 1}`}</span>
                    <span className="font-display text-display-m font-medium text-ink transition-colors group-hover:text-signal">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="shell flex items-center justify-between py-8">
              <p className="mono-label">MUKTHAR M J</p>
              <p className="mono-label">BENGALURU, IN</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Reduced-motion-aware transition duration. */
function reduceSafe() {
  return 0.25;
}