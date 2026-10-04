import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Where the row's scrollLeft rests for each item: its leading edge at the
// snap position, clamped to how far the row can scroll (the last few items
// can't reach it, so they share the end).
function snapPositions(row: HTMLElement) {
  const padding = parseFloat(getComputedStyle(row).scrollPaddingLeft) || 0;
  const max = row.scrollWidth - row.clientWidth;
  const rowLeft = row.getBoundingClientRect().left;
  return Array.from(row.children).map((item) => {
    const left =
      row.scrollLeft + item.getBoundingClientRect().left - rowLeft - padding;
    return Math.min(Math.max(left, 0), max);
  });
}

// The item resting nearest the current scroll position. Items that share the
// end of the row resolve to the last one.
function nearestIndex(positions: number[], scrollLeft: number) {
  let nearest = 0;
  positions.forEach((position, i) => {
    if (
      Math.abs(position - scrollLeft) <=
      Math.abs(positions[nearest] - scrollLeft)
    ) {
      nearest = i;
    }
  });
  return nearest;
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

// How long a button press takes to glide to the next item, in ms.
const DURATION = 500;

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
  // The glide a button press started, if it's still running. The row glides
  // itself rather than using smooth scrolling, which fights scroll snapping
  // (mobile Safari stops short or lands between items).
  const glide = useRef<{ frame: number; target: number } | null>(null);

  const stopGlide = useCallback(() => {
    const row = ref.current;
    if (glide.current) cancelAnimationFrame(glide.current.frame);
    glide.current = null;
    if (row) row.style.scrollSnapType = "";
  }, []);

  useEffect(() => {
    const row = ref.current;
    if (!row) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const positions = snapPositions(row);
      const max = row.scrollWidth - row.clientWidth;
      const index = nearestIndex(positions, row.scrollLeft);
      const atStart = row.scrollLeft <= 1;
      const atEnd = row.scrollLeft >= max - 1;

      setState((prev) =>
        prev.index === index &&
        prev.count === positions.length &&
        prev.atStart === atStart &&
        prev.atEnd === atEnd
          ? prev
          : { index, count: positions.length, atStart, atEnd },
      );
    };
    const onChange = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    row.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    // A swipe or wheel scroll takes over from a glide; snapping comes back on
    // and settles the row wherever the person leaves it.
    row.addEventListener("touchstart", stopGlide, { passive: true });
    row.addEventListener("wheel", stopGlide, { passive: true });
    return () => {
      row.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      row.removeEventListener("touchstart", stopGlide);
      row.removeEventListener("wheel", stopGlide);
      cancelAnimationFrame(frame);
      stopGlide();
    };
  }, [stopGlide]);

  // Glides to the next item from the current one, or from the one a glide is
  // already heading to, so quick presses each move one more item.
  const step = useCallback(
    (direction: 1 | -1) => {
      const row = ref.current;
      if (!row) return;
      const positions = snapPositions(row);
      const from =
        glide.current?.target ?? nearestIndex(positions, row.scrollLeft);

      // Skip items resting at the same spot (at the end of the row).
      let target = from + direction;
      while (
        target >= 0 &&
        target < positions.length &&
        Math.abs(positions[target] - positions[from]) <= 1
      ) {
        target += direction;
      }
      if (target < 0 || target >= positions.length) return;

      const to = positions[target];
      stopGlide();
      row.style.scrollSnapType = "none";
      const start = row.scrollLeft;
      const startTime = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - startTime) / DURATION, 1);
        row.scrollLeft = start + (to - start) * easeOutCubic(t);
        if (t < 1) {
          glide.current = { frame: requestAnimationFrame(tick), target };
        } else {
          stopGlide();
        }
      };
      glide.current = { frame: requestAnimationFrame(tick), target };
    },
    [stopGlide],
  );

  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  const carousel: Carousel = useMemo(
    () => ({ ...state, prev, next }),
    [state, prev, next],
  );
  return [ref, carousel] as const;
}
