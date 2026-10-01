import Link from "next/link";
import cx from "classnames";
import type { MouseEventHandler } from "react";

// styles
import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  url?: string;
  secondary?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  external?: boolean;
}

export function Button({
  label,
  url,
  secondary,
  onClick,
  className,
  external,
}: ButtonProps) {
  const classes = cx(
    styles.button,
    secondary ? styles.secondary : styles.primary,
    className && styles[className],
  );

  if (url && external) {
    return (
      <a href={url} className={classes} target="_blank" rel="noreferrer">
        {label}
      </a>
    );
  }

  if (url?.startsWith("/")) {
    return (
      <Link href={url} className={classes}>
        {label}
      </Link>
    );
  }

  if (url) {
    return (
      <a href={url} className={classes}>
        {label}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {label}
    </button>
  );
}
