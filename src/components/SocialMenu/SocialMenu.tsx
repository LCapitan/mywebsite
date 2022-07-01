import Link from 'next/link';
import cx from 'classnames';

// styles
import styles from './SocialMenu.module.scss';

// Icons
import { LinkedIn, Instagram, Facebook, GitHub } from '../Icons'

interface SocialMenuProps {
  className?: string;
}

export function SocialMenu({ className }: SocialMenuProps) {

  return (
    <div className={cx(styles.socialMenu, className && styles[className])}>
      <ul>
        <li>
          <a href="https://github.com/LCapitan" target="_blank" rel="noreferrer">
            <GitHub />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/austinmelendez/" target="_blank" rel="noreferrer">
            <LinkedIn />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/shucksworthy/" target="_blank" rel="noreferrer">
            <Instagram />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/austin.j.melendez" target="_blank" rel="noreferrer">
            <Facebook />
          </a>
        </li>
      </ul>
    </div>
  );
}
