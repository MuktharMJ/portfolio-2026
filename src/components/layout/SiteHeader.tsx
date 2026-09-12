"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";

const NAV_ITEMS = [
  { label: "WORK", href: "#work" }, { label: "LAB", href: "#lab" },
  { label: "ABOUT", href: "#about" }, { label: "RESUME", href: "#resume" },
  { label: "CONTACT", href: "#contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const sections = NAV_ITEMS.map(item => document.getElementById(item.href.slice(1)));
    let frame = 0;
    const update = () => {
      frame = 0;
      setCondensed(window.scrollY > 80);
      const band = window.innerHeight * 0.35;
      setActive(sections.find(el => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= band && rect.bottom > band;
      })?.id ?? "");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    const menu = dialog.current;
    if (!menu) return;
    if (open) menu.showModal();
    else menu.close();
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 48rem)");
    const onResize = () => { if (mq.matches) setOpen(false); };
    mq.addEventListener("change", onResize);
    return () => {
      document.documentElement.style.overflow = previous;
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 170, damping: 32, mass: 0.4 });

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${condensed ? "border-b border-line bg-bg-0/90 backdrop-blur-md" : "border-b border-transparent"}`}>
      <motion.div aria-hidden="true" style={{ scaleX: reduced ? scrollYProgress : progress }} className="absolute inset-x-0 top-0 h-px origin-left bg-signal" />
      <div className="shell flex h-20 items-center justify-between">
        <span aria-hidden="true" />
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map(item => (
            <Link key={item.label} href={onHome ? item.href : `/${item.href}`} aria-current={onHome && active === item.href.slice(1) ? "location" : undefined} className="nav-link mono-label inline-flex min-h-11 items-center">
              {item.label}
            </Link>
          ))}
        </nav>
        <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Open menu" className="menu-toggle flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden">
          <span className="h-px w-6 bg-ink" /><span className="h-px w-6 bg-ink" />
        </button>
      </div>
      {/* Native modal supplies focus containment, Escape, background inertness and focus restoration. */}
      <dialog ref={dialog} id="mobile-menu" aria-label="Navigation" className="mobile-dialog" onClose={() => setOpen(false)} onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const targets = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
        const first = targets[0];
        const last = targets[targets.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }}>
        <div className="shell flex h-20 w-full shrink-0 items-center justify-end">
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="menu-toggle relative flex h-11 w-11 items-center justify-center">
            <span className="absolute h-px w-6 rotate-45 bg-ink" /><span className="absolute h-px w-6 -rotate-45 bg-ink" />
          </button>
        </div>
        <nav aria-label="Mobile" className="shell flex w-full flex-1 flex-col justify-center py-6">
          {NAV_ITEMS.map((item, i) => (
            <Link key={item.label} href={onHome ? item.href : `/${item.href}`} onClick={() => setOpen(false)} className="mobile-nav-link flex min-h-14 items-baseline gap-4 border-b border-line py-4">
              <span className="mono-label text-ink-35">{`0${i + 1}`}</span>
              <span className="font-display text-display-m font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="shell flex w-full flex-wrap justify-between gap-3 py-6">
          <p className="mono-label">MUKTHAR M J</p><p className="mono-label">BENGALURU, IN</p>
        </div>
      </dialog>
    </header>
  );
}
