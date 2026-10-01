import Link from "next/link";
import Image from "next/image";
import cx from "classnames";

// styles
import styles from "./BlogItem.module.scss";

interface BlogItemProps {
  imgSrc: string;
  altText: string;
  title: string;
  prevText: string;
  url?: string;
  featured?: boolean;
  comingSoon?: boolean;
}

export function BlogItem({
  imgSrc,
  altText,
  title,
  prevText,
  url,
  featured,
  comingSoon,
}: BlogItemProps) {
  const inner = (
    <div className={styles.inner}>
      {featured && <div className={styles.featuredTag}>featured post</div>}
      {comingSoon && <div className={styles.comingSoon}>coming soon</div>}
      <figure className={styles.image}>
        <Image
          src={imgSrc}
          alt={altText}
          fill
          sizes="(max-width: 992px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </figure>
      <div className={styles.details}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.content}>{prevText}</div>
        </div>
        {url && (
          <div className={styles.actions}>
            <span className="link">read more</span>
          </div>
        )}
      </div>
    </div>
  );

  if (url) {
    return (
      <Link
        href={`/post${url}`}
        className={cx(styles.blogItem, featured && styles.featured)}
      >
        {inner}
      </Link>
    );
  }

  return <div className={styles.blogItem}>{inner}</div>;
}
