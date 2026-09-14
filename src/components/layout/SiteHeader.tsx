"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";

const items = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Capabilities", id: "capabilities" },
  { label: "Résumé", id: "resume" },
  { label: "Contact", id: "contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const href = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .reverse();
    let frame = 0;
    const update = () => {
      frame = 0;
      const band = window.innerHeight * 0.4;
      setActive(
        elements.find(
          (el) =>
            el &&
            el.getBoundingClientRect().top <= band &&
            el.getBoundingClientRect().bottom > band,
        )?.id ?? "",
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
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
    if (!open) {
      if (menu.open) menu.close();
      return;
    }
    menu.showModal();
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 800px)");
    const resize = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", resize);
    return () => {
      document.documentElement.style.overflow = previous;
      mq.removeEventListener("change", resize);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="wordmark" aria-label="Mukthar M J — home">
          mukthar<span aria-hidden="true">.</span>
        </Link>
        <div className="header-actions">
          <nav className="desktop-nav" aria-label="Primary">
            {items.map((item) => (
              <Link
                key={item.id}
                href={href(item.id)}
                aria-current={
                  pathname === "/" && active === item.id
                    ? "location"
                    : undefined
                }
              >
                {item.label}
                {item.id === "contact" && <span aria-hidden="true">↗</span>}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <button
            ref={trigger}
            type="button"
            className="menu-toggle"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            Menu <span aria-hidden="true">☰</span>
          </button>
        </div>
        <dialog
          ref={dialog}
          id="mobile-menu"
          className="mobile-dialog"
          aria-label="Navigation"
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const targets =
              event.currentTarget.querySelectorAll<HTMLElement>(
                "button, a[href]",
              );
            const first = targets[0];
            const last = targets[targets.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }}
          onClose={() => {
            setOpen(false);
            trigger.current?.focus({ preventScroll: true });
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="mobile-menu-top">
            <span className="wordmark">mukthar.</span>
            <div className="header-actions">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                Close ×
              </button>
            </div>
          </div>
          <nav aria-label="Mobile">
            {items.map((item, index) => (
              <Link
                key={item.id}
                href={href(item.id)}
                onClick={() => {
                  // Unlock scrolling and restore focus before Next follows the anchor.
                  flushSync(() => setOpen(false));
                }}
              >
                <span className="eyebrow">0{index + 1}</span>
                {item.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          <p className="eyebrow">Mukthar M J · Selected portfolio</p>
        </dialog>
      </div>
    </header>
  );
}
