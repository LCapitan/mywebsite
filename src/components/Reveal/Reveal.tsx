import cx from "classnames";
import type { CSSProperties, ElementType, ReactNode } from "react";

import { useInView } from "../../hooks/useInView";

import styles from "./Reveal.module.scss";

type Delay = { "--reveal-delay": string };

const delayStyle = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as CSSProperties & Delay;

interface RevealProps {
  as?: ElementType;
  // up: rise and fade in. fade: fade only. clip: wipe up from the bottom (images).
  variant?: "up" | "fade" | "clip";
  delay?: number;
  className?: string;
  id?: string;
  children: ReactNode;
}

// Animates its content in the first time it scrolls into view.
export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  id,
  children,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      id={id}
      className={cx(
        styles.reveal,
        styles[variant],
        inView && styles.visible,
        className,
      )}
      style={delayStyle(delay)}
    >
      {children}
    </Tag>
  );
}

interface RevealLinesProps {
  as?: ElementType;
  lines: ReactNode[];
  delay?: number;
  stagger?: number;
  className?: string;
}

// Slides each line up from behind a mask, one after another.
export function RevealLines({
  as: Tag = "h1",
  lines,
  delay = 0,
  stagger = 110,
  className,
}: RevealLinesProps) {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={cx(styles.lines, inView && styles.visible, className)}
    >
      {lines.map((line, i) => (
        <span key={i} className={styles.line}>
          {/* Keeps a space between lines for screen readers. */}
          {i > 0 && " "}
          <span
            className={styles.lineInner}
            style={delayStyle(delay + i * stagger)}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
