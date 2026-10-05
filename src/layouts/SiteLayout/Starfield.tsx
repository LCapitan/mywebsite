import { useEffect, useRef, type CSSProperties } from "react";
import cx from "classnames";

import styles from "./Starfield.module.scss";

// A small seeded random generator (mulberry32), so the server and the browser
// draw the same sky, and it's the same on every visit.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A four-pointed star with curved sides.
const STAR_PATH =
  "M0 11.3137C0 11.3137 5.87304 10.7544 8.31371 8.31372C10.7544 5.87306 11.3137 0 11.3137 0C11.3137 0 11.873 5.87306 14.3137 8.31372C16.7544 10.7544 22.6274 11.3137 22.6274 11.3137C22.6274 11.3137 16.7544 11.8731 14.3137 14.3137C11.873 16.7544 11.3137 22.6274 11.3137 22.6274C11.3137 22.6274 10.7544 16.7544 8.31371 14.3137C5.87304 11.8731 0 11.3137 0 11.3137Z";

const STAR_COUNT = 18;

// Fixed drift directions (drift0 to drift5 in the stylesheet). Fixed
// keyframes, rather than per-star values, let the browser run the drift off
// the main thread.
const DRIFT_PATHS = 6;

// How far the page scrolls while a star makes one trip from the center of the
// screen to its edge, in px.
const TRIP = 1100;

// Each star flies out along its own ray from the center. Golden-angle rays
// spread them evenly around the circle, and staggered starting points keep
// them from arriving together.
const random = seeded(1512);
const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
  angle: ((i * 137.508 + random() * 16) * Math.PI) / 180,
  // How far out the ray runs, relative to the screen's corner.
  reach: 0.8 + random() * 0.4,
  // Where along its trip the star is at the top of the page (0 to 1).
  phase: (i + random() * 0.6) / STAR_COUNT,
  size: 15 + Math.round(random() * 15),
  opacity: 0.05 + random() * 0.1,
  drift: Math.floor(random() * DRIFT_PATHS),
  duration: 7 + random() * 7,
  delay: -random() * 14,
  // A brief flicker every few seconds, each star on its own clock.
  twinkle: 3 + random() * 6,
  twinkleDelay: -random() * 9,
  // Phones get a sparser sky.
  desktopOnly: i % 3 === 0,
}));

type Star = (typeof stars)[number];

// A star partway through its trip (t from 0 at the center to 1 at the edge).
// It speeds up and grows as it nears, like something rushing past, and fades
// in as it leaves the center.
function tripFrame(star: Star, t: number, corner: number) {
  const distance = star.reach * corner * t * t;
  const x = (Math.cos(star.angle) * distance).toFixed(1);
  const y = (Math.sin(star.angle) * distance).toFixed(1);
  return {
    transform: `translate(${x}px, ${y}px) scale(${(0.3 + t).toFixed(3)})`,
    opacity: Math.min(t / 0.25, 1),
  };
}

// The same trip as keyframes, sampled finely enough to follow the curve.
function tripKeyframes(star: Star, corner: number) {
  return Array.from({ length: 13 }, (_, i) => {
    const t = i / 12;
    return { offset: t, ...tripFrame(star, t, corner) };
  });
}

// Faint stars behind the page that drift and twinkle in place. Scrolling
// carries them out from the center of the screen, as if traveling deeper into
// space; new ones fade in at the center as others leave the edges, and
// scrolling back up reverses the trip.
export function Starfield() {
  const ref = useRef<HTMLDivElement>(null);
  const tripRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const sky = ref.current;
    if (!sky) return;
    const root = document.documentElement;
    const corner = () => Math.hypot(sky.clientWidth, sky.clientHeight) / 2;
    const scrollable = () => root.scrollHeight - window.innerHeight;

    // Tied to the page's scroll position by the browser itself, so the stars
    // move in step with scrolling without any work per frame. Each trip takes
    // TRIP px of scroll, so a longer page means more trips. Rebuilt when the
    // page or window changes size.
    if ("ScrollTimeline" in globalThis) {
      let animations: Animation[] = [];
      const build = () => {
        animations.forEach((animation) => animation.cancel());
        const range = scrollable();
        // A page that can't scroll has no timeline to follow; the stars just
        // hold their starting positions.
        if (range < 1) {
          animations = stars.map((star, i) =>
            tripRefs.current[i]!.animate(
              [tripFrame(star, star.phase, corner())],
              { fill: "both" },
            ),
          );
          return;
        }
        const timeline = new ScrollTimeline({ source: root, axis: "block" });
        animations = stars.map((star, i) =>
          tripRefs.current[i]!.animate(tripKeyframes(star, corner()), {
            fill: "both",
            iterations: range / TRIP,
            iterationStart: star.phase,
            timeline,
          }),
        );
      };
      build();
      const observer = new ResizeObserver(build);
      observer.observe(document.body);
      window.addEventListener("resize", build);
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", build);
        animations.forEach((animation) => animation.cancel());
      };
    }

    // Fallback: place the stars on scroll.
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = window.scrollY / TRIP;
      stars.forEach((star, i) => {
        const el = tripRefs.current[i];
        if (!el) return;
        const t = (progress + star.phase) % 1;
        const { transform, opacity } = tripFrame(star, t, corner());
        el.style.transform = transform;
        el.style.opacity = String(opacity);
      });
    };
    const onChange = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={styles.sky} aria-hidden="true">
      {stars.map((star, i) => (
        <span
          key={i}
          className={cx(styles.star, star.desktopOnly && styles.desktopOnly)}
          style={{ width: star.size, height: star.size, opacity: star.opacity }}
        >
          <span
            ref={(el) => {
              tripRefs.current[i] = el;
            }}
            className={styles.trip}
          >
            <span
              className={cx(styles.glow, styles[`drift${star.drift}`])}
              style={
                {
                  "--duration": `${star.duration}s`,
                  "--delay": `${star.delay}s`,
                  "--twinkle": `${star.twinkle}s`,
                  "--twinkle-delay": `${star.twinkleDelay}s`,
                } as CSSProperties
              }
            >
              <svg viewBox="0 0 23 23">
                <path d={STAR_PATH} />
              </svg>
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}
