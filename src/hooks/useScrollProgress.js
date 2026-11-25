import { useState } from "react";
import { useEventListener } from "./useEventListener";

const readProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
};

/** 0–100 scroll position of the page, like vim's ruler percentage. */
export function useScrollProgress() {
  const [pct, setPct] = useState(readProgress);
  const update = () => setPct(readProgress());
  useEventListener("scroll", update, { passive: true });
  useEventListener("resize", update);
  return pct;
}
