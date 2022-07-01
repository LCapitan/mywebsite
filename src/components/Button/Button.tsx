import Link from 'next/link';
import cx from 'classnames';

// styles
import styles from './Button.module.scss';

// const styleClass = ['primary', 'secondary'];

interface ButtonProps {
  label: string;
  url?: string;
  secondary?: boolean;
  className?: string;
  onClick?: any;
}

export function Button({ label, url, secondary, onClick, className }: ButtonProps) {
  // const style = `${styleClass[buttonStyle]}`;

  return (
    <>
      {url ? (
        <a href={url} className={cx(styles.button, secondary ? styles.secondary : styles.primary)}>
          {label}
        </a>
      ) : (
        <button
          className={cx(styles.button, secondary ? styles.secondary : styles.primary, className && styles[className])}
          onClick={onClick}>
          {label}
        </button>
      )}
    </>
  );
}
