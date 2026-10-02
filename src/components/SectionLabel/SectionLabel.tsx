import cx from "classnames";
import type { ElementType, ReactNode } from "react";

import { useInView } from "../../hooks/useInView";

import styles from "./SectionLabel.module.scss";

interface SectionLabelProps {
  number: string;
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
}

// "01 ——— LABEL" eyebrow above each section.
export function SectionLabel({
  number,
  as: Tag = "p",
  id,
  className,
  children,
}: SectionLabelProps) {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      id={id}
      className={cx(styles.label, inView && styles.visible, className)}
    >
      <span className={styles.number}>{number}</span>
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.text}>{children}</span>
    </Tag>
  );
}
