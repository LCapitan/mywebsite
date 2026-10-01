import Image from "next/image";

import styles from "./BlogPost.module.scss";

interface PostHeroProps {
  src: string;
  alt: string;
}

export function PostHero({ src, alt }: PostHeroProps) {
  return (
    <div className={styles.heroImg}>
      <div className={styles.desktop}>
        <Image
          src={src}
          alt={alt}
          width={1902}
          height={1047}
          sizes="(max-width: 1300px) 100vw, 1300px"
          style={{ width: "100%", height: "auto" }}
          preload
        />
      </div>
      <div className={styles.mobile}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
