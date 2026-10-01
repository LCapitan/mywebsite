import classnames from "classnames";
import Link from "next/link";
import { useContext } from "react";
import UIContext from "../../context/UIContext";
import { CONTACT_EMAIL, SHOW_BLOG } from "../../config";

import { SocialMenu } from "../SocialMenu/SocialMenu";

import styles from "./Menu.module.scss";

export default function Menu() {
  const { menuOpen, setMenuOpen } = useContext(UIContext);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      id="site-menu"
      className={classnames(styles.menu, menuOpen && styles.open)}
      inert={!menuOpen}
    >
      <div className={styles.container}>
        <ul className={styles.nav}>
          <li>
            <Link href="/" onClick={closeMenu}>
              home
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={closeMenu}>
              about
            </Link>
          </li>
          <li>
            <Link href="/work" onClick={closeMenu}>
              work
            </Link>
          </li>
          {SHOW_BLOG && (
            <li>
              <Link href="/blog" onClick={closeMenu}>
                blog
              </Link>
            </li>
          )}
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`} onClick={closeMenu}>
              contact
            </a>
          </li>
        </ul>
        <div className={styles.social}>
          <SocialMenu />
        </div>
      </div>
    </nav>
  );
}
