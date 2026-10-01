import Image from "next/image";

import type { WorkItem } from "../../data/work";

import styles from "./WorkCard.module.scss";

type WorkCardProps = Omit<WorkItem, "hidden">;

const WorkCard = ({
  imgSrc,
  imgAlt,
  cardLink,
  title,
  content,
  tags,
}: WorkCardProps) => {
  return (
    <a href={cardLink} target="_blank" rel="noreferrer">
      <div className={styles.wrapper}>
        <div className={styles.workItem}>
          <Image
            src={imgSrc}
            width={1200}
            height={1200}
            alt={imgAlt}
            sizes="(max-width: 992px) 100vw, 50vw"
            className={styles.image}
          />
          <div className={styles.content}>
            <h2>{title}</h2>
            <div className={styles.popUp}>{content}</div>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default WorkCard;
