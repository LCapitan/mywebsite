import Link from "next/link";
import React, { useContext } from "react";
import { LinkedIn, Instagram, Twitter, Facebook } from "../Icons";

import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">footer</div>
    </footer>
  );
}
