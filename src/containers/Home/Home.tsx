import React from "react";
import cx from 'classnames';
import Link from "next/link";
import Image from "next/image";

import { Button } from '../../components';
import { HomeBg } from '../../components/Icons/';

import styles from './Home.module.scss'

interface HomeProps { }

export function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <h1 className={styles.title}>austin<br />melendez</h1>
        <h2 className={styles.subtitle}>artist, designer, and developer from Richmond, VA.</h2>
        <div className={styles.actions}>
          <Button url="/work" label="see my work" />
          <Button url="/about" label="meet me" secondary />
        </div>
      </div>
      <div className={styles.pageBg}>
        <HomeBg />
      </div>
      <figure className={styles.pageHero}>
        <Image src="https://res.cloudinary.com/austinmel/image/upload/v1656674282/austin-computer_m9bpcz.png"
          layout="responsive"
          alt="an illustration of me using the computer"
          width="1604"
          height="1515" />
      </figure>
    </div>
  );
}