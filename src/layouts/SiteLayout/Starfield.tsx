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

// How quickly the stars catch up once scrolling stops, in ms: the time to
// cover about two-thirds of the remaining distance. They glide in over
// roughly three times this, like a ship slowing down.
const SETTLE = 300;

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
// space; new ones fade in at the center as others leave the edges, scrolling
// back up reverses the trip, and they glide to a stop after the page does.
export function Starfield() {
  const ref = useRef<HTMLDivElement>(null);
  const tripRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const sky = ref.current;
    if (!sky) return;
    const corner = () => Math.hypot(sky.clientWidth, sky.clientHeight) / 2;

    // Each star's trip as a paused animation where 1ms stands for 1px of
    // scroll, so setting its time to a scroll position puts the star in
    // place. Rebuilt when the window changes size.
    let position = window.scrollY;
    let animations: Animation[] = [];
    const build = () => {
      animations.forEach((animation) => animation.cancel());
      animations = stars.map((star, i) => {
        const animation = tripRefs.current[i]!.animate(
          tripKeyframes(star, corner()),
          {
            duration: TRIP,
            fill: "both",
            iterations: Infinity,
            iterationStart: star.phase,
          },
        );
        animation.pause();
        animation.currentTime = position;
        return animation;
      });
    };

    // The stars trail the scroll and glide toward it, easing in after
    // scrolling stops instead of halting with it. Runs only while they're
    // catching up.
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      const elapsed = last ? Math.min(now - last, 100) : 16;
      last = now;
      const target = window.scrollY;
      position += (target - position) * (1 - Math.exp(-elapsed / SETTLE));
      if (Math.abs(target - position) < 0.5) position = target;
      animations.forEach((animation) => (animation.currentTime = position));

      if (position !== target) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
        last = 0;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    build();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", build);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", build);
      cancelAnimationFrame(frame);
      animations.forEach((animation) => animation.cancel());
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
