import Link from "next/link";
import cx from "classnames";
import type { MouseEventHandler } from "react";

import { ArrowRight } from "../Icons/ArrowRight";

import styles from "./ArrowButton.module.scss";

interface ArrowButtonProps {
  label: string;
  href: string;
  external?: boolean;
  // light: creme outline and text, for dark backgrounds.
  tone?: "dark" | "light";
  className?: string;
}

// Pill link with an orange arrow circle that floods the button on hover.
// Reserved for the contact section's "Get in touch".
export function ArrowButton({
  label,
  href,
  external,
  tone = "dark",
  className,
}: ArrowButtonProps) {
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
      <Link
        href={href}
        className={cx(
          styles.button,
          tone === "light" && styles.light,
          className,
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={cx(styles.button, tone === "light" && styles.light, className)}
      {...(external && { target: "_blank", rel: "noreferrer" })}
    >
      {content}
    </a>
  );
}

interface CircleArrowProps {
  className?: string;
  direction?: "right" | "down";
}

// Outlined circle with an arrow, used beside text links and on cards.
export function CircleArrow({
  className,
  direction = "right",
}: CircleArrowProps) {
  return (
    <span
      className={cx(
        styles.circle,
        direction === "down" && styles.down,
        className,
      )}
      aria-hidden="true"
    >
      <ArrowRight />
    </span>
  );
}

interface CircleArrowLinkProps {
  label: string;
  href: string;
  direction?: "right" | "down";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

// The standard button: an uppercase label beside a circle arrow.
export function CircleArrowLink({
  label,
  href,
  direction,
  onClick,
  className,
}: CircleArrowLinkProps) {
  const content = (
    <>
      {label}
      <CircleArrow direction={direction} />
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cx(styles.circleLink, className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={cx(styles.circleLink, className)}
    >
      {content}
    </a>
  );
}
