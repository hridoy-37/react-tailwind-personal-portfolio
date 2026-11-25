import { useEffect, useRef, useState } from "react";

/** Returns [ref, inView]. With `once`, stays true after the first time the element is seen. */
export function useInView({ threshold = 0.12, rootMargin, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!once) return setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
