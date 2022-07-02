import React from "react";
import cx from 'classnames';
import Link from "next/link";
import Image from "next/image";

import { Button } from '../../components';
import { HomeBg, Logo } from '../../components/Icons/';

import styles from './Home.module.scss'

interface HomeProps { }

export function Home() {
  return (
    <div className={styles.home}>
      <div className='stars'></div>
      <div className={styles.pageHero}>
        <Image src="https://res.cloudinary.com/austinmel/image/upload/v1656750239/astro-dunk_ltgeiq.png"
          layout="responsive"
          alt="an illustration of me using the computer"
          width="2048"
          height="2048" />
      </div>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <h1 className={styles.title}>austin<br />melendez</h1>
        <h2 className={styles.subtitle}>an artist, designer, and developer, in love with hiking and twizzlers, with my head in the clouds.</h2>
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