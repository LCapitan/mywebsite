import Link from 'next/link';
import Image from "next/image";
import cx from 'classnames';

import { Button } from '../Button/';

// styles
import styles from './BlogItem.module.scss';

interface BlogItemProps {
  imgSrc: string;
  altText: string;
  title: string;
  prevText: string;
  date?: string;
  url: string;
  featured?: boolean;
}

export function BlogItem({ imgSrc, altText, title, prevText, date, url, featured }: BlogItemProps) {

  return (
    <Link href={url} passHref>
      <div className={cx(styles.blogItem, featured && styles.featured)}>
        <div className={styles.inner}>
          <figure className={styles.image}>
            <Image src={imgSrc}
              alt={altText}
              layout="fill"
              objectFit="cover" />
          </figure>
          <div className={styles.details}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.content}>
              {prevText}
            </div>
            <div className={styles.actions}>
              <Button label="read more" url={url} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
