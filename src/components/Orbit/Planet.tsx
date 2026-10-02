import { useId } from "react";
import cx from "classnames";

import styles from "./Planet.module.scss";

// Ringed planet (traced from the Figma design, 164x99). The highlights are
// cut out of the body, and the ring's back half is drawn behind the body and
// its front half on top, so it reads as wrapping around the planet.
export function Planet({ className }: { className?: string }) {
  const id = useId();
  const highlights = `${id}-highlights`;
  const ringFront = `${id}-ring-front`;

  return (
    <div aria-hidden="true" className={cx(styles.planet, className)}>
      <svg viewBox="0 0 164 99" className={styles.svg}>
        <defs>
          <mask id={highlights}>
            <rect width="164" height="99" fill="white" />
            <path
              d="M46.5 25C49.5 16.5 58.5 9 70.5 6.5C74.5 6.5 75 10 72.5 11.5C62.5 13.5 53 18 46.5 25Z"
              fill="black"
            />
            <ellipse
              cx="82.5"
              cy="8.5"
              rx="5"
              ry="2.8"
              transform="rotate(-6 82.5 8.5)"
              fill="black"
            />
          </mask>
          {/* The lower half of the ring, in the ring's own tilted frame. */}
          <clipPath id={ringFront}>
            <rect x="0" y="52.5" width="164" height="60" />
          </clipPath>
        </defs>
        <g transform="rotate(-21 80.8 52.5)">
          <ellipse
            className={styles.ring}
            cx="80.8"
            cy="52.5"
            rx="77.6"
            ry="14"
          />
        </g>
        <circle
          className={styles.body}
          cx="80.5"
          cy="48"
          r="48"
          mask={`url(#${highlights})`}
        />
        <g transform="rotate(-21 80.8 52.5)">
          <ellipse
            className={styles.ring}
            cx="80.8"
            cy="52.5"
            rx="77.6"
            ry="14"
            clipPath={`url(#${ringFront})`}
          />
        </g>
      </svg>
    </div>
  );
}
