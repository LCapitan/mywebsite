import Link from 'next/link';
import cx from 'classnames';

// styles
import styles from './Button.module.scss';

const styleClass = ['primary', 'secondary'];

interface ButtonProps {
  label: string;
  url?: string;
  buttonStyle?: 0 | 1;
  className?: string;
  onClick?: any;
}

export function Button({ label, url, buttonStyle, onClick, className }: ButtonProps) {
  const style = `${styleClass[buttonStyle]}`;

  return (
    <>
      {url ? (
        <a href={url} className={cx(styles.button, styles[style])}>
          {label}
        </a>
      ) : (
        <button
          className={cx(styles.button, styles[style], className && styles[className])}
          onClick={onClick}>
          {label}
        </button>
      )}
    </>
  );
}
