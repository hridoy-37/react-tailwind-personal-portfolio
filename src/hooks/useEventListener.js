import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Subscribes to a DOM event for the component's lifetime.
 * The latest `handler` is always called, so callers don't need to memoize it.
 */
export function useEventListener(event, handler, { target, enabled = true, passive = false } = {}) {
  const handlerRef = useRef(handler);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!enabled) return;
    const el = target ?? window;
    const listener = (e) => handlerRef.current(e);
    el.addEventListener(event, listener, { passive });
    return () => el.removeEventListener(event, listener);
  }, [event, target, enabled, passive]);
}
