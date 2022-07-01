// import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React, { useContext } from 'react';
import UIContext from "../../context/UIContext";
import { LinkedIn, Instagram, Twitter, Facebook, Logo } from '../Icons'
import Menu from "../Menu/Menu";
import Hamburger from './HamburgerButton';

import styles from './Header.module.scss'

const Header = () => {

  return (
    <header className={styles.header}>
      <Link href="/work" passHref>
        <span className={styles.leftSide}>
          my work
        </span>
      </Link>
      <div className={styles.rightSide}>
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/austinmelendez/">
              <LinkedIn />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/shucksworthy/">
              <Instagram />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/austin.j.melendez">
              <Facebook />
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.innerWrapper}>
        <div className={styles.logo}>
          <Link href="/" passHref>
            <a>
              <Logo />
            </a>
          </Link>
        </div>
        <Hamburger />
      </div>
      <Menu />
    </header>
  )
}

export default Header;