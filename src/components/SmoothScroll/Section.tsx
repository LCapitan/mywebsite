import React from "react";
import cx from "classnames";

import styles from "./SmoothScroll.module.scss";

interface SectionProps {
  children: any;
  container?: boolean;
}

export default function Section({ children, container }: SectionProps) {
  return <div className={cx(container && "container")}>{children}</div>;
}
