import React from "react";

import styles from "./SmoothScroll.module.scss";

interface SectionProps {
  children: any;
}

export default function Section({ children }: SectionProps) {
  return <div className={styles.section}>{children}</div>;
}
