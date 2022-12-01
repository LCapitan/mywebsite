import Image from "next/image";
import Link from "next/link";
import cx from "classnames";

import { useRef, useState, useEffect } from "react";
import { VideoPlayer } from "../index";

import styles from "./WorkCard.module.scss";

interface WorkCardProps {
  imgSrc: string;
  imgAlt?: string;
  cardLink: string;
  title: string;
  tags: Array<string>;
  small?: boolean;
}

const WorkCard: React.FC<WorkCardProps> = ({
  imgSrc,
  imgAlt,
  cardLink,
  title,
  tags,
  small,
}) => {
  return (
    <a href={cardLink} target="_blank" rel="noreferrer">
      <div className={cx(styles.wrapper, small && styles.smaller)}>
        <div className={styles.workItem}>
          <Image
            src={imgSrc}
            width="1200"
            height="1200"
            alt={imgAlt}
            layout="responsive"
          />
          <div className={styles.content}>
            <div className={styles.tags}>
              {tags && tags.map((tag, i) => <span key={tags[i]}>{tag}</span>)}
            </div>
            <h2>{title}</h2>
          </div>
        </div>
      </div>
    </a>
  );
};

export default WorkCard;
