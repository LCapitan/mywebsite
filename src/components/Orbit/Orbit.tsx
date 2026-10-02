import cx from "classnames";

import { useInView } from "../../hooks/useInView";

import styles from "./Orbit.module.scss";

interface Moon {
  // Starting position in degrees, clockwise from 3 o'clock.
  angle: number;
  // Diameter in px.
  size: number;
}

interface OrbitProps {
  // Positions the orbit's center with left/top and sets its diameter with width.
  className?: string;
  moons?: Moon[];
  // Seconds per lap.
  duration?: number;
  reverse?: boolean;
  line?: "solid" | "dashed" | "dotted";
  // Orbit line thickness in px.
  strokeWidth?: number;
  // light: pale moons (hero). dark: olive moons (sections).
  tone?: "light" | "dark";
}

// A decorative orbit line with moons slowly travelling around it.
export function Orbit({
  className,
  moons = [],
  duration = 120,
  reverse,
  line = "solid",
  strokeWidth,
  tone = "dark",
}: OrbitProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0 });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cx(
        styles.orbit,
        styles[tone],
        styles[line],
        inView && styles.visible,
        className,
      )}
    >
      <svg
        className={styles.path}
        viewBox="0 0 100 100"
        style={strokeWidth ? { strokeWidth } : undefined}
      >
        <circle cx="50" cy="50" r="50" vectorEffect="non-scaling-stroke" />
      </svg>
      <div
        className={cx(styles.track, reverse && styles.reverse)}
        style={{ animationDuration: `${duration}s` }}
      >
        {moons.map(({ angle, size }) => {
          const radians = (angle * Math.PI) / 180;
          return (
            <span
              key={angle}
              className={styles.moon}
              style={{
                left: `${50 + 50 * Math.cos(radians)}%`,
                top: `${50 + 50 * Math.sin(radians)}%`,
                width: size,
                height: size,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
