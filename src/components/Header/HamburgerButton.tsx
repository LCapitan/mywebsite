import { useContext } from "react";
import UIContext from "../../context/UIContext";
import classnames from "classnames";

import styles from "./HamburgerButton.module.scss";

export default function Hamburger() {
  const { menuOpen, setMenuOpen } = useContext(UIContext);

  return (
    <button
      type="button"
      aria-controls="site-menu"
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen(!menuOpen)}
      className={classnames(styles.hamburger, menuOpen && styles.open)}
    >
      <span className={styles.bar} />
      <span className="srOnly">{menuOpen ? "Close Menu" : "Open Menu"}</span>
    </button>
  );
}
