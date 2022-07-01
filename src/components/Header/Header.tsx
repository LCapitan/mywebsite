// import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React, { useContext } from 'react';
import UIContext from "../../context/UIContext";
import { LinkedIn, Instagram, Twitter, Facebook, Logo, GitHub } from '../Icons'
import Menu from "../Menu/Menu";
import Hamburger from './HamburgerButton';

import styles from './Header.module.scss'

const Header = () => {

  return (
    <header className={styles.header}>
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
      <div className={styles.socialMenu}>
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
      <Menu />
    </header>
  )
}

export default Header;