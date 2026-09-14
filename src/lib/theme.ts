export const THEME_STORAGE_KEY = "mukthar-theme";

/** Runs before the body is painted; light is the fallback when preferences are unavailable. */
export const themeInitializationScript = `(() => {
  let choice;
  try { choice = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}); } catch {}
  const manual = choice === 'light' || choice === 'dark';
  const theme = manual ? choice : (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const root = document.documentElement;
  root.dataset.theme = theme;
  if (manual) root.dataset.themeChoice = choice;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1c1e1b' : '#f4f2ec');
})();`;
