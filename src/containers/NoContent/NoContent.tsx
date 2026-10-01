import Image from "next/image";

import styles from "./NoContent.module.scss";
import { Button } from "../../components";

const NoContent = () => {
  return (
    <div className={styles.noContent}>
      <div className="stars"></div>
      <div className={styles.pageHero}>
        <Image
          src="https://res.cloudinary.com/austinmel/image/upload/v1656704666/fishing_cgnvig.png"
          alt=""
          width={2448}
          height={2448}
          sizes="(max-width: 992px) 100vw, 50vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>
          not sure what you&#39;re looking for, but you probably won&#39;t find
          it here...
        </h2>
        <div className={styles.actions}>
          <Button url="/" label="take me home" />
        </div>
      </div>
    </div>
  );
};

export default NoContent;
