import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/utils/dom";

/** Types, pauses, deletes and cycles through `words`. Shows the first word statically under reduced motion. */
export function useTypewriter(words, { typeMs = 55, deleteMs = 28, holdMs = 1800 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(() => (prefersReducedMotion() ? words[0] : ""));
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const word = words[index % words.length];
    const fullyTyped = !deleting && text === word;
    const delay = fullyTyped ? holdMs : deleting ? deleteMs : typeMs;

    const id = setTimeout(() => {
      if (fullyTyped) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs]);

  return text;
}
