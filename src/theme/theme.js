// Theme primitives (no React). The inline script in index.html mirrors
// STORAGE_KEY and resolveTheme() so the right theme is applied before first paint.

const THEMES = ["dark", "light"];

/** What the visitor chose. "system" follows the OS setting. */
export const PREFERENCES = ["system", ...THEMES];

const STORAGE_KEY = "hridoy:theme";

export const SYSTEM_LIGHT_QUERY = "(prefers-color-scheme: light)";

export const readPreference = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return THEMES.includes(stored) ? stored : "system";
  } catch {
    return "system";
  }
};

export const storePreference = (preference) => {
  try {
    if (preference === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    /* storage unavailable (private mode): the choice lasts for this visit only */
  }
};

export const resolveTheme = (preference, systemIsLight) =>
  preference === "system" ? (systemIsLight ? "light" : "dark") : preference;

/**
 * Sets data-theme on <html> and syncs <meta name="theme-color">.
 * Transitions are suspended for one frame so every element switches at once
 * instead of fading at different speeds.
 */
export function applyTheme(theme) {
  const root = document.documentElement;
  if (root.dataset.theme === theme) return;

  const freeze = document.createElement("style");
  freeze.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(freeze);

  root.dataset.theme = theme;

  const background = getComputedStyle(root).getPropertyValue("--background").trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", background);

  requestAnimationFrame(() => requestAnimationFrame(() => freeze.remove()));
}
