import React, { useContext } from 'react';
import UIContext from '../../context/UIContext';
import classnames from "classnames";

import styles from './HamburgerButton.module.scss'

export default function Hamburger() {
  const { menuOpen, setMenuOpen } = useContext(UIContext);

  return (
    <div id="hamburger" onClick={() => setMenuOpen(!menuOpen)} className={classnames(styles.hamburger, menuOpen && styles.open)}>
      <div>
        {menuOpen ?
          <span className="srOnly">
            Close Menu
          </span> :
          <span className="srOnly">
            Open Menu
          </span>
        }
      </div>
    </div>
  )
}
