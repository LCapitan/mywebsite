import Link from "next/link";
import { Logo } from "../Icons";
import Menu from "../Menu/Menu";
import Hamburger from "./HamburgerButton";

import { SocialMenu } from "../SocialMenu/SocialMenu";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" aria-label="Home">
          <Logo />
        </Link>
      </div>
      <div className={styles.menuToggle}>
        <Hamburger />
      </div>
      <div className={styles.social}>
        <SocialMenu />
      </div>
      <Menu />
    </header>
  );
};

export default Header;
