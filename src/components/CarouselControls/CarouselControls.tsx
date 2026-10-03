import { useEffect, useRef, useState } from "react";
import cx from "classnames";

import type { Carousel } from "../../hooks/useCarousel";
import { CircleArrow } from "../ArrowButton";

import styles from "./CarouselControls.module.scss";

interface CarouselControlsProps {
  carousel: Carousel;
  // The id of the scrolling row, for aria-controls.
  controls: string;
  // What each item is, for the button labels and announcements ("project").
  itemLabel: string;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

// Previous/next buttons and a position counter for a swipeable row.
export function CarouselControls({
  carousel: { index, count, atStart, atEnd, prev, next },
  controls,
  itemLabel,
  className,
}: CarouselControlsProps) {
  // Announced once the row settles, not for every item it passes on the way,
  // and not on page load.
  const [announcement, setAnnouncement] = useState("");
  const lastIndex = useRef(index);
  useEffect(() => {
    if (!count || index === lastIndex.current) return;
    lastIndex.current = index;
    const timeout = setTimeout(
      () => setAnnouncement(`${itemLabel} ${index + 1} of ${count}`),
      300,
    );
    return () => clearTimeout(timeout);
  }, [index, count, itemLabel]);

  return (
    <div className={cx(styles.controls, className)}>
      <p className={styles.counter} aria-hidden="true">
        {pad(index + 1)} <span>/ {pad(count)}</span>
      </p>
      <p className="srOnly" aria-live="polite">
        {announcement}
      </p>
      <div className={styles.buttons}>
        {/* aria-disabled rather than disabled, so focus isn't dropped when a
            button reaches the end of the row. */}
        <button
          type="button"
          className={styles.button}
          aria-controls={controls}
          aria-disabled={atStart}
          aria-label={`Previous ${itemLabel}`}
          onClick={prev}
        >
          <CircleArrow direction="left" />
        </button>
        <button
          type="button"
          className={styles.button}
          aria-controls={controls}
          aria-disabled={atEnd}
          aria-label={`Next ${itemLabel}`}
          onClick={next}
        >
          <CircleArrow />
        </button>
      </div>
    </div>
  );
}
