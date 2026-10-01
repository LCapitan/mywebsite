import Image from "next/image";

import { Button } from "../../components";
import { HomeBg, Logo } from "../../components/Icons";

import styles from "./Home.module.scss";

export function Home() {
  return (
    <div className={styles.home}>
      <div className="stars"></div>
      <div className={styles.pageHero}>
        <Image
          src="https://res.cloudinary.com/austinmel/image/upload/v1656750239/astro-dunk_ltgeiq.png"
          alt="an illustration of me using the computer"
          width={2048}
          height={2048}
          sizes="(max-width: 992px) 100vw, 50vw"
          style={{ width: "100%", height: "auto" }}
          preload
        />
      </div>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <h1 className={styles.title}>
          austin
          <br />
          melendez
        </h1>
        <h2 className={styles.subtitle}>
          a front-end developer who loves turning good ideas and great designs into digital experiences that feel just as good as they look.
        </h2>
        <div className={styles.actions}>
          <Button url="/work" label="see my work" />
          <Button url="/about" label="about me" secondary />
        </div>
      </div>
      <div className={styles.pageBg}>
        <HomeBg />
      </div>
    </div>
  );
}
