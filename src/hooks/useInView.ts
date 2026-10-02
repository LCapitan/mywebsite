import { useEffect, useRef, useState } from "react";

interface InViewOptions {
  rootMargin?: string;
  threshold?: number;
}

// Flips to true the first time the element scrolls into view, then stays true.
export function useInView<T extends Element>({
  // No bottom inset: content at the very end of a page has to be able to
  // trigger even though the page can't scroll any further.
  rootMargin = "0px",
  threshold = 0.15,
}: InViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return [ref, inView] as const;
}
