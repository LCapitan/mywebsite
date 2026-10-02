import cx from "classnames";

import { Orbit, Planet } from "../Orbit";

import styles from "./HeroSky.module.scss";

interface HeroSkyProps {
  // bottom: orbits follow the hero's bottom edge (the homepage astronaut).
  // top: orbits stay put at the top of the page.
  anchor: "top" | "bottom";
  planet?: boolean;
}

// The three orbits (and optional planet) in the top-right corner of a hero.
// Desktop only; place inside a positioned hero section.
export function HeroSky({ anchor, planet }: HeroSkyProps) {
  return (
    <div className={cx(styles.sky, styles[anchor])} aria-hidden="true">
      <Orbit
        className={styles.inner}
        tone="light"
        line="dashed"
        strokeWidth={1.5}
        moons={[{ angle: -46, size: 13 }]}
        duration={70}
      />
      <Orbit
        className={styles.middle}
        tone="light"
        strokeWidth={3}
        moons={[{ angle: 161, size: 22 }]}
        duration={110}
        reverse
      />
      <Orbit
        className={styles.outer}
        tone="light"
        strokeWidth={1.5}
        moons={[{ angle: 80, size: 16 }]}
        duration={160}
      />
      {planet && <Planet className={styles.planet} />}
    </div>
  );
}
