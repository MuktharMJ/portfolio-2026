"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

type Theme = "light" | "dark";
const changeEvent = "portfolio-theme-change";
let transitionTimer: ReturnType<typeof setTimeout>;

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme, animate = false) {
  const root = document.documentElement;
  clearTimeout(transitionTimer);
  if (animate) {
    root.dataset.themeTransition = "";
    transitionTimer = setTimeout(
      () => delete root.dataset.themeTransition,
      240,
    );
  } else {
    delete root.dataset.themeTransition;
  }
  root.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#1c1e1b" : "#f4f2ec");
  window.dispatchEvent(new Event(changeEvent));
}

function subscribe(onChange: () => void) {
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  const followSystem = () => {
    if (!document.documentElement.dataset.themeChoice) {
      applyTheme(system.matches ? "dark" : "light");
    }
  };
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
    if (event.newValue === "light" || event.newValue === "dark") {
      document.documentElement.dataset.themeChoice = event.newValue;
      applyTheme(event.newValue);
    } else {
      delete document.documentElement.dataset.themeChoice;
      followSystem();
    }
  };
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", syncStorage);
  system.addEventListener("change", followSystem);
  // Next can recover an error route on the client without executing its inline head script.
  if (!document.documentElement.dataset.theme) {
    let choice;
    try {
      choice = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {}
    if (choice === "light" || choice === "dark") {
      document.documentElement.dataset.themeChoice = choice;
      applyTheme(choice);
    } else {
      followSystem();
    }
  }
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", syncStorage);
    system.removeEventListener("change", followSystem);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "light");
  const label = `Switch to ${theme === "light" ? "dark" : "light"} theme`;

  function toggle() {
    const next = currentTheme() === "light" ? "dark" : "light";
    // Keep the choice for this session even when browser storage is unavailable.
    document.documentElement.dataset.themeChoice = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
    applyTheme(next, true);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <svg
        className="theme-moon"
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.6 14.1A9 9 0 0 1 9.9 3.4a9 9 0 1 0 10.7 10.7Z" />
      </svg>
      <svg
        className="theme-sun"
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </svg>
    </button>
  );
}
