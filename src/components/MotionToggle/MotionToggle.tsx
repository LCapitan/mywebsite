import { useSyncExternalStore } from "react";
import cx from "classnames";

import styles from "./MotionToggle.module.scss";

// Pauses the site's animations for visitors who want them still: the looping
// ones (orbits, stars, planet, floating mockups) and the scroll-driven ones
// (the starfield's travel, orbit parallax, the hero zoom). Motion is on by
// default. Sets
// data-motion="paused" on the root, which those animations' styles watch, and
// remembers the choice in this browser (_document restores it on load).
// The root's data-motion attribute is the source of truth: the toggle reads
// it (and updates if anything else changes it) rather than keeping a copy.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  return () => observer.disconnect();
}

const isPaused = () => document.documentElement.dataset.motion === "paused";

export function MotionToggle({ className }: { className?: string }) {
  const paused = useSyncExternalStore(subscribe, isPaused, () => false);

  const toggle = () => {
    const next = !paused;
    if (next) document.documentElement.dataset.motion = "paused";
    else delete document.documentElement.dataset.motion;
    try {
      if (next) localStorage.setItem("motion", "paused");
      else localStorage.removeItem("motion");
    } catch {
      // Storage can be unavailable (private windows); the toggle still works
      // for this visit.
    }
  };

  return (
    <button
      type="button"
      className={cx(styles.toggle, className)}
      aria-pressed={paused}
      onClick={toggle}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        {paused ? (
          <path d="M4 2.5v11l9.5-5.5z" />
        ) : (
          <>
            <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
            <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
          </>
        )}
      </svg>
      {paused ? "Play motion" : "Pause motion"}
    </button>
  );
}
