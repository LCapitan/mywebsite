import Link from "next/link";
import classnames from "classnames";
import Image from "next/image";

import styles from "./NoContent.module.scss";
import { Button } from "../../components";
import { Moon, Logo } from "../../components/Icons/";

interface NoContentProps {}

const NoContent: React.FC<NoContentProps> = ({}) => {
  return (
    <div className={styles.noContent}>
      <div className="stars"></div>
      <div className={styles.pageHero}>
        <Image
          src="https://res.cloudinary.com/austinmel/image/upload/v1656704666/fishing_cgnvig.png"
          layout="responsive"
          alt=""
          width="2448"
          height="2448"
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
