import Image from "next/image";

import type { WorkItem } from "../../data/work";
import { CircleArrow } from "../ArrowButton";

import styles from "./FeaturedCard.module.scss";

interface FeaturedCardProps {
  item: WorkItem;
  index: number;
}

export function FeaturedCard({ item, index }: FeaturedCardProps) {
  return (
    <a
      href={item.cardLink}
      target="_blank"
      rel="noreferrer"
      className={styles.card}
    >
      <Image
        src={item.imgSrc}
        alt={item.imgAlt}
        fill
        sizes="(max-width: 1099px) 85vw, 420px"
        className={styles.image}
      />
      <span className={styles.number} aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>
      <div className={styles.body}>
        <h3 className={styles.title}>{item.title}</h3>
        {item.content && <p className={styles.description}>{item.content}</p>}
        <ul className={styles.tags}>
          {item.tags.slice(0, 3).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <CircleArrow className={styles.arrow} />
    </a>
  );
}
