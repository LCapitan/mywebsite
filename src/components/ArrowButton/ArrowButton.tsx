import Link from "next/link";
import cx from "classnames";

import { ArrowRight } from "../Icons/ArrowRight";

import styles from "./ArrowButton.module.scss";

interface ArrowButtonProps {
  label: string;
  href: string;
  external?: boolean;
  className?: string;
}

// Pill link with an orange arrow circle that floods the button on hover.
export function ArrowButton({ label, href, external, className }: ArrowButtonProps) {
  const content = (
    <>
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
      <span className={styles.icon}>
        <ArrowRight />
      </span>
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cx(styles.button, className)}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={cx(styles.button, className)}
      {...(external && { target: "_blank", rel: "noreferrer" })}
    >
      {content}
    </a>
  );
}

// Outlined circle with an arrow, used beside text links and on cards.
export function CircleArrow({ className }: { className?: string }) {
  return (
    <span className={cx(styles.circle, className)} aria-hidden="true">
      <ArrowRight />
    </span>
  );
}
