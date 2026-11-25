import { useRef } from "react";
import { useEventListener } from "./useEventListener";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

/** Calls `onUnlock` when the Konami code (↑↑↓↓←→←→BA) is typed anywhere on the page. */
export function useKonami(onUnlock) {
  const pos = useRef(0);
  useEventListener("keydown", (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos.current = key === SEQUENCE[pos.current] ? pos.current + 1 : key === SEQUENCE[0] ? 1 : 0;
    if (pos.current === SEQUENCE.length) {
      pos.current = 0;
      onUnlock();
    }
  });
}
