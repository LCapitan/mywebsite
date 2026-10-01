import cx from "classnames";

import { RESUME_URL } from "../../config";

// styles
import styles from "./SocialMenu.module.scss";

// icons
import { LinkedIn, GitHub, Pdf } from "../Icons";

const links = [
  { label: "GitHub", href: "https://github.com/LCapitan", Icon: GitHub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/austinmelendez/",
    Icon: LinkedIn,
  },
  { label: "Resume (PDF)", href: RESUME_URL, Icon: Pdf },
];

interface SocialMenuProps {
  className?: string;
}

export function SocialMenu({ className }: SocialMenuProps) {
  return (
    <div className={cx(styles.socialMenu, className && styles[className])}>
      <ul>
        {links.map(({ label, href, Icon }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
