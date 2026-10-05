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

// Screen sizes the spacing is checked against (phone, tablet, desktop), since
// stars are placed by percentage.
const SCREENS = [
  [390, 844],
  [768, 1024],
  [1440, 900],
];

// Room for both stars to drift (up to 6px each way) plus a little air.
const DRIFT = 6;
const AIR = 8;

// Places each star clear of the others on every screen size. The sky repeats
// vertically as it scrolls, so the gap also holds across the top and bottom.
function placeStars() {
  const random = seeded(1512);
  const placed: { left: number; top: number; size: number }[] = [];
  for (let tries = 0; placed.length < STAR_COUNT && tries < 20000; tries++) {
    const left = 3 + random() * 94;
    const top = random() * 100;
    const size = 15 + Math.round(random() * 15);
    const clear = placed.every((star) => {
      const wrapped = Math.abs(star.top - top);
      const dyShare = Math.min(wrapped, 100 - wrapped) / 100;
      const dxShare = Math.abs(star.left - left) / 100;
      const needed = (star.size + size) / 2 + DRIFT * 2 + AIR;
      return SCREENS.every(
        ([width, height]) =>
          Math.hypot(dxShare * width, dyShare * height) >= needed,
      );
    });
    if (clear) placed.push({ left, top, size });
  }

  return placed.map((star, i) => ({
    ...star,
    opacity: 0.05 + random() * 0.1,
    // A slow drift of a few px in a random direction.
    duration: 7 + random() * 7,
    delay: -random() * 14,
    dx: (random() * 2 - 1) * DRIFT,
    dy: (random() * 2 - 1) * DRIFT,
    // A brief flicker every few seconds, each star on its own clock.
    twinkle: 3 + random() * 6,
    twinkleDelay: -random() * 9,
    // Phones get a sparser sky.
    desktopOnly: i % 3 === 0,
  }));
}

const stars = placeStars();

// How fast the sky moves relative to the page.
const PARALLAX = 0.15;

// Faint stars fixed behind the page that drift and twinkle in place, and
// scroll with the page at a fraction of its speed. The sky is drawn twice, one copy below the
// other, so stars leaving the top come back in at the bottom.
export function Starfield() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sky = ref.current;
    if (!sky) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const offset = (window.scrollY * PARALLAX) % sky.clientHeight;
      sky.style.setProperty("--offset", `${offset.toFixed(1)}px`);
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

  const renderStars = (copy: number) =>
    stars.map((star, i) => (
      <span
        key={`${copy}-${i}`}
        className={cx(styles.star, star.desktopOnly && styles.desktopOnly)}
        style={
          {
            left: `${star.left}%`,
            top: `${star.top + copy * 100}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            "--duration": `${star.duration}s`,
            "--delay": `${star.delay}s`,
            "--dx": `${star.dx}px`,
            "--dy": `${star.dy}px`,
            "--twinkle": `${star.twinkle}s`,
            "--twinkle-delay": `${star.twinkleDelay}s`,
          } as CSSProperties
        }
      >
        <svg className={styles.glow} viewBox="0 0 23 23">
          <path d={STAR_PATH} />
        </svg>
      </span>
    ));

  return (
    <div ref={ref} className={styles.sky} aria-hidden="true">
      <div className={styles.field}>
        {renderStars(0)}
        {renderStars(1)}
      </div>
    </div>
  );
}
