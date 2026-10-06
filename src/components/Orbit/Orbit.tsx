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
  // night: for dark backgrounds.
  tone?: "light" | "dark" | "night";
  // A tilted ellipse instead of a circle, like a ring seen at an angle (the
  // section orbits). The width sets its long axis.
  ellipse?: boolean;
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
  ellipse,
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
        ellipse && styles.ellipse,
        inView && styles.visible,
        className,
      )}
    >
      {/* Stretched to the box, so it draws the ellipse; the stroke stays
          even (non-scaling). */}
      <svg
        className={styles.path}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={strokeWidth ? { strokeWidth } : undefined}
      >
        <circle cx="50" cy="50" r="50" vectorEffect="non-scaling-stroke" />
      </svg>
      {ellipse ? (
        // Moons travel the ellipse itself, so they stay round instead of
        // being squashed along with it.
        <div className={styles.track}>
          {moons.map(({ angle, size }) => (
            <span
              key={angle}
              className={cx(
                styles.moon,
                styles.pathMoon,
                reverse && styles.reverse,
              )}
              style={{
                width: size,
                height: size,
                animationDuration: `${duration}s`,
                // Starts the moon partway around (the path begins at 12
                // o'clock; angles count from 3 o'clock).
                animationDelay: `${-(((angle + 90 + 360) % 360) / 360) * duration}s`,
              }}
            />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}
