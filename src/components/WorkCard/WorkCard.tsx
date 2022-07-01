import Image from 'next/image';
import Link from 'next/link';

import { useRef, useState, useEffect } from "react";
import { VideoPlayer } from '../index';

import styles from './WorkCard.module.scss';

interface WorkCardProps {
  imgSrc: string,
  imgAlt?: string,
  cardLink: string,
  title: string,
  content: string,
  tags: Array<string>
}

const WorkCard: React.FC<WorkCardProps> = ({
  imgSrc,
  imgAlt,
  cardLink,
  title,
  content,
  tags
}) => {

  return (
    <a href={cardLink} target="_blank" rel="noreferrer">
      <div className={styles.wrapper}>
        <div className={styles.workItem}>
          <Image src={imgSrc} width='1200' height='1200' alt={imgAlt} layout='responsive' />
          <div className={styles.content}>
            <h2>{title}</h2>
            <div className={styles.popUp}>
              {content}
            </div>
            <div className={styles.tags}>
              {tags && tags.map((tag, i) =>
                <span key={tags[i]}>{tag}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default WorkCard;
