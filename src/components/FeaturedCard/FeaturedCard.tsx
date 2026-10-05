import Image from "next/image";
import Link from "next/link";
import cx from "classnames";

import type { WorkItem } from "../../data/work";
import { caseStudyLinkProps } from "../../lib/pageTransition";
import { CircleArrow } from "../ArrowButton";

import styles from "./FeaturedCard.module.scss";

interface FeaturedCardProps {
  item: WorkItem;
  index: number;
  // The homepage shows the first three tags, on desktop only; the work page
  // shows them all, everywhere.
  allTags?: boolean;
  titleAs?: "h2" | "h3";
  className?: string;
  // Opens the project's case study, if it has one, instead of the live site.
  openCaseStudy?: boolean;
}

export function FeaturedCard({
  item,
  index,
  allTags,
  titleAs: Title = "h3",
  className,
  openCaseStudy,
}: FeaturedCardProps) {
  const tags = allTags ? item.tags : item.tags.slice(0, 3);
  // Experimental: only the work page opens case studies for now.
  const caseStudy = openCaseStudy ? item.caseStudy : undefined;

  const content = (
    <>
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
        <Title className={styles.title}>{item.title}</Title>
        {item.content && <p className={styles.description}>{item.content}</p>}
        <ul className={cx(styles.tags, !allTags && styles.desktopTags)}>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {/* Phones and tablets: a small button under the details in place of
            the arrow beside them. */}
        <span className={styles.cta}>
          {caseStudy ? "View case study" : "View website"}
          <CircleArrow className={styles.ctaArrow} />
        </span>
      </div>
      <CircleArrow className={styles.arrow} />
    </>
  );

  // Projects with a case study open it; the rest link to the live site.
  return caseStudy ? (
    <Link
      {...caseStudyLinkProps(caseStudy.slug)}
      className={cx(styles.card, className)}
    >
      {content}
    </Link>
  ) : (
    <a
      href={item.cardLink}
      target="_blank"
      rel="noreferrer"
      className={cx(styles.card, className)}
    >
      {content}
    </a>
  );
}
