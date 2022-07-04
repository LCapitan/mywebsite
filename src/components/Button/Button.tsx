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
  external?: boolean;
}

export function Button({ label, url, secondary, onClick, className, external }: ButtonProps) {

  if (url && external) {
    return (
      <a href={url} className={cx(styles.button, secondary ? styles.secondary : styles.primary)} target="blank" rel="noreferrer">
        {label}
      </a>
    );
  } else if (url) {
    return (
      <a href={url} className={cx(styles.button, secondary ? styles.secondary : styles.primary)}>
        {label}
      </a>
    );
  } else {
    return (
      <button
        className={cx(styles.button, secondary ? styles.secondary : styles.primary, className && styles[className])}
        onClick={onClick}>
        {label}
      </button>
    )
  }

}
