import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Button, WorkCard } from "../../components";

import styles from './WorkContent.module.scss';

const WorkContent = () => {
  return (
    <div className={styles.work}>
      <div className={styles.pageHeading}>
        <h1 className={styles.pageTitle}>work</h1>
        <h2 className={styles.subtitle}>Here are a few of the most recent sites I&#39;ve worked on or built. (Feel free to reach out to view other various projects).</h2>
        <div className={styles.actions}>
          <Button url="mailto:austinjamesmelendez@gmail.com" label="let's chat" />
        </div>
      </div>

      <ul className={styles.workList}>
        <li>
          <WorkCard
            imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1649263364/honsbuns_hxjmxq.jpg"
            imgAlt="an illustration of beautiful bunny"
            cardLink="https://www.honsbuns.com/"
            title="hon's buns"
            content="the baddest bunny-themed NFTs on the scene"
            tags={[
              'ui/ux',
              'web3',
              'crypto',
              'branding',
              'strategy',
              'illustration',
              'accessibility',
            ]}
          />
        </li>
        <li>
          <WorkCard
            imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656677596/Cover_cwto4r.png"
            imgAlt="nifty's logo"
            cardLink="https://niftys.com/"
            title="nifty's"
            content="the nft marketplace"
            tags={[
              'ui/ux',
              'web3',
              'crypto',
              'branding',
              'strategy',
              'illustration',
              'product design',
              'react',
              'next.js'
            ]}
          />
        </li>
        <li>
          <WorkCard
            imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656677342/pittt_etmsrj.png"
            imgAlt="a photo of upitt celebrating at a college game"
            cardLink="https://www.pitt.edu/"
            title="upitt"
            content="the university of pittsburgh"
            tags={[
              'ui/ux',
              'website redesign',
              'HTML5',
              'CSS3',
              'javascript'
            ]}
          />
        </li>
        <li>
          <WorkCard
            imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656677312/curry_nrh65v.jpg"
            imgAlt="curry college"
            cardLink="https://www.curry.edu/"
            title="curry college"
            content=""
            tags={[
              'ui/ux',
              'website redesign',
              'HTML5',
              'CSS3',
              'javascript',
              'ingeniux'
            ]}
          />
        </li>
        <li>
          <WorkCard
            imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656677311/tukhs_gcph7g.jpg"
            imgAlt="tukhs"
            cardLink="https://www.kansashealthsystem.com/"
            title="tukhs"
            content="the university of kansas health system"
            tags={[
              'ui/ux',
              'website redesign',
              'HTML5',
              'CSS3',
              'javascript',
              'sitecore'
            ]}
          />
        </li>
        <li>
          <WorkCard
            imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656678415/astro_iie61u.jpg"
            imgAlt="my artwork"
            cardLink="https://www.instagram.com/shucksworthy/"
            title="my artwork"
            content="take a peek if you want to see some of my artwork"
            tags={[
              'illustration',
              'procreate',
              'drawing',
              'hobby'
            ]}
          />
        </li>
      </ul>
    </div>
  );
}

export default WorkContent;