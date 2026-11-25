/** Smooth-scrolls to an element by id. No-op if it doesn't exist. */
export const scrollToSection = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/** Triggers a browser download for a same-origin file. */
export const downloadFile = (href, filename) => {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.click();
};

export const openExternal = (url) => window.open(url, "_blank", "noopener,noreferrer");

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
