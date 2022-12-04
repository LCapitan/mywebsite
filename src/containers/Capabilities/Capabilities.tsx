import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./Capabilities.module.scss";

import { WorkBg } from "../../components";

const Capabilities = () => {
  return (
    <div className={styles.capabilities}>
      <div className={styles.inner}>
        <h2>what I can help you with</h2>
        <div className={styles.content}>
          <ul>
            <li>branding</li>
            <li>/</li>
            <li>design</li>
            <li>/</li>
            <li>ui & ux</li>
            <li>/</li>
            <li>mobile & web</li>
            <li>/</li>
            <li>development</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Capabilities;
