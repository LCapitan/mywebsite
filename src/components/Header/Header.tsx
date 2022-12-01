// import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React, { useContext } from "react";
import UIContext from "../../context/UIContext";
import cx from "classnames";
import { Logo } from "../Icons";
import Menu from "../Menu/Menu";
import Hamburger from "./HamburgerButton";

import styles from "./Header.module.scss";

interface HeaderProps {
  isInView?: boolean;
}

export default function Header({ isInView }: HeaderProps) {
  return (
    <header className={cx(styles.header, isInView && styles.light)}>
      <div className={styles.desktop}>
        <ul className={styles.navigation}>
          <li>
            <Link href="/">austin</Link>
          </li>
          <li>
            <Link href="#work">work</Link>
          </li>
          <li>
            <Link href="/blog">blog</Link>
          </li>
          <li>
            <Link href="/">contact</Link>
          </li>
        </ul>
      </div>
      <div className={styles.mobile}>
        <div className={styles.logo}>
          <Link href="/" passHref>
            <a>
              <Logo />
            </a>
          </Link>
        </div>
        <div className={styles.menuToggle}>
          <Hamburger />
        </div>
        <Menu />
      </div>
    </header>
  );
}
