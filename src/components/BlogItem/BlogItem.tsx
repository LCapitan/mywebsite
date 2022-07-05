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
  url?: string;
  featured?: boolean;
  comingSoon?: boolean;
}

export function BlogItem({ imgSrc, altText, title, prevText, date, url, featured, comingSoon }: BlogItemProps) {
  const link = `/post${url}`;
  return (
    <>
      {
        url ? (
          <Link href={link} passHref>
            <div className={cx(styles.blogItem, featured && styles.featured)}>
              <div className={styles.inner}>
                {featured &&
                  <div className={styles.featuredTag}>
                    featured post
                  </div>
                }
                <figure className={styles.image}>
                  <Image src={imgSrc}
                    alt={altText}
                    layout="fill"
                    objectFit="cover" />
                </figure>
                <div className={styles.details}>
                  <div>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.content}>
                      {prevText}
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <a href={link} className="link">
                      read more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className={cx(styles.blogItem)}>
            <div className={styles.inner}>
              {comingSoon &&
                <div className={styles.comingSoon}>
                  coming soon
                </div>
              }
              <figure className={styles.image}>
                <Image src={imgSrc}
                  alt={altText}
                  layout="fill"
                  objectFit="cover" />
              </figure>
              <div className={styles.details}>
                <div>
                  <h2 className={styles.title}>{title}</h2>
                  <div className={styles.content}>
                    {prevText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}
