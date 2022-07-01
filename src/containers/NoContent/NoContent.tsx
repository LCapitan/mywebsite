import Link from "next/link";
import classnames from "classnames";
import Image from "next/image";

import styles from './NoContent.module.scss'

interface NoContentProps {
}

const NoContent: React.FC<NoContentProps> = ({
}) => {
  return (
    <div className={styles.noContent}>
      <h1>whoops</h1>

      <div className={styles.content}>
        This content isn't available for viewing at the moment, but check back soon for an update!
      </div>

      <div className={styles.actions}>
        <Link href="/work">
          see my work
        </Link>
      </div>
    </div>
  )
}

export default NoContent;
