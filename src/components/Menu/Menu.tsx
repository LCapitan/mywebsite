import { useClickOutside } from "@mantine/hooks";
import classnames from "classnames";
import Link from "next/link";
import React, { useContext } from "react";
import UIContext from "../../context/UIContext";
import Hamburger from "../Header/HamburgerButton";
import Image from "next/image";

import { SocialMenu } from "../SocialMenu/SocialMenu";

import styles from "./Menu.module.scss";

export default function Menu() {
  const { menuOpen, setMenuOpen } = useContext(UIContext);
  const ref = useClickOutside(() => setMenuOpen(false));
  // console.log(menuOpen);

  return (
    <nav className={classnames(styles.menu, menuOpen && styles.open)}>
      <div className={styles.container}>
        <ul className={styles.nav}>
          <li onClick={() => setMenuOpen(false)}>
            <Link href="/">home</Link>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Link href="/about" passHref>
              about
            </Link>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Link href="/work">work</Link>
          </li>
          {/* <li onClick={() => setMenuOpen(false)}>
            <Link href="/blog">blog</Link>
          </li> */}
          <li>
            <a href="mailto:austinjamesmelendez@gmail.com">contact</a>
          </li>
        </ul>
        <div className={styles.social}>
          <SocialMenu />
        </div>
      </div>
    </nav>
  );
}
