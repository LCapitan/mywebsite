import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// How far an item's leading edge sits from the row's snap position.
function offsetOf(row: HTMLElement, item: Element) {
  const padding = parseFloat(getComputedStyle(row).scrollPaddingLeft) || 0;
  return (
    item.getBoundingClientRect().left -
    row.getBoundingClientRect().left -
    padding
  );
}

export interface Carousel {
  index: number;
  count: number;
  atStart: boolean;
  atEnd: boolean;
  prev: () => void;
  next: () => void;
}

// Tracks a horizontal scroll-snap row (its direct children are the items) and
// steps it one item at a time, for the carousel controls.
export function useCarousel<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState({
    index: 0,
    count: 0,
    atStart: true,
    atEnd: false,
  });
  // The current item, and the item a button press is scrolling to, so quick
  // presses each move one more item instead of measuring mid-scroll.
  const indexRef = useRef(0);
  const targetRef = useRef<number | null>(null);
  const targetTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const row = ref.current;
    if (!row) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const items = Array.from(row.children);
      const max = row.scrollWidth - row.clientWidth;
      const atStart = row.scrollLeft <= 1;
      const atEnd = row.scrollLeft >= max - 1;

      // The last items can't reach the snap position, so the end of the row
      // counts as the last item.
      let index = items.length - 1;
      if (!atEnd || atStart) {
        const distances = items.map((item) => Math.abs(offsetOf(row, item)));
        index = distances.indexOf(Math.min(...distances));
      }

      indexRef.current = index;
      if (index === targetRef.current) targetRef.current = null;

      setState((prev) =>
        prev.index === index &&
        prev.count === items.length &&
        prev.atStart === atStart &&
        prev.atEnd === atEnd
          ? prev
          : { index, count: items.length, atStart, atEnd },
      );
    };
    const onChange = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    row.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    return () => {
      row.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      cancelAnimationFrame(frame);
      clearTimeout(targetTimeout.current);
    };
  }, []);

  // Scrolls one item on from the current (or already targeted) item, skipping
  // any that wouldn't move the row that way (near the end, several items can
  // be in view at once).
  const step = useCallback((direction: 1 | -1) => {
    const row = ref.current;
    if (!row) return;
    const offsets = Array.from(row.children).map((item) =>
      offsetOf(row, item),
    );
    let target = (targetRef.current ?? indexRef.current) + direction;
    while (
      target >= 0 &&
      target < offsets.length &&
      (direction > 0 ? offsets[target] <= 1 : offsets[target] >= -1)
    ) {
      target += direction;
    }
    if (target < 0 || target >= offsets.length) return;

    targetRef.current = target;
    // In case the scroll is interrupted (a swipe) before it gets there.
    clearTimeout(targetTimeout.current);
    targetTimeout.current = setTimeout(() => {
      targetRef.current = null;
    }, 1000);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    row.scrollBy({
      left: offsets[target],
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, []);

  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  const carousel: Carousel = useMemo(
    () => ({ ...state, prev, next }),
    [state, prev, next],
  );
  return [ref, carousel] as const;
}
