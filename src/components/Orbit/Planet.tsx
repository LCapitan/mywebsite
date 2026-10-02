import cx from "classnames";

import styles from "./Planet.module.scss";

// Ringed planet for the hero. The ring's back half is drawn behind the body
// and its front half on top, so it reads as wrapping around the planet.
export function Planet({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cx(styles.planet, className)}>
      <svg viewBox="0 0 100 70" className={styles.svg}>
        <defs>
          <clipPath id="planet-ring-front">
            <rect x="0" y="35" width="100" height="35" />
          </clipPath>
        </defs>
        <g transform="rotate(-14 50 35)">
          <ellipse className={styles.ring} cx="50" cy="35" rx="47" ry="9" />
          <circle className={styles.body} cx="50" cy="35" r="30" />
          <path className={styles.shine} d="M31 27 A20 20 0 0 1 47 14" />
          <ellipse
            className={styles.ring}
            cx="50"
            cy="35"
            rx="47"
            ry="9"
            clipPath="url(#planet-ring-front)"
          />
        </g>
      </svg>
    </div>
  );
}
