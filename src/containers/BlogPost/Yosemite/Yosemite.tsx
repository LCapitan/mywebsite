import React from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import { Button } from '../../../../src/components'

// Styles
import styles from '../BlogPost.module.scss';

const Yosemite = () => {
  return (
    <div className={styles.blogPost}>
      <div className='stars'></div>
      <div className={styles.heroImg}>
        <div className={styles.desktop}>
          <Image src="https://res.cloudinary.com/austinmel/image/upload/v1656806131/IMG_1793_e9ykky.jpg"
            layout="responsive"
            alt="me hiking in Zion National Park"
            width="1902"
            height="1047" />
        </div>
        <div className={styles.mobile}>
          <Image src="https://res.cloudinary.com/austinmel/image/upload/v1656806131/IMG_1793_e9ykky.jpg"
            layout="fill"
            alt="me hiking in Zion National Park"
            objectFit="cover" />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.pageHeading}>
          <h1 className={styles.pageTitle}>yosemite valley</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.paragraph}>
            A life-changing trip. Honestly. My first ever hike was in Yosemite, which was quite an experience since Yosemite is considered to be one of the most beautiful parks in the United States.
          </div>

          <div className={styles.paragraph}>
            In January of 2019, I called one of my buddies - who loves hiking - and asked if he was plannin any trips that year because I wanted to try hiking for the first time. And he told me he was actually planning a trip to hike the John Muir Trail in California. It meant nothing to me, but the thought of visiting California for the first time was enough to get me excited. I immediately said yes and told him to just tell me what I needed and I would be ready.
          </div>

          <div className={styles.paragraph}>
            I was not ready. I lived in Florida at the time, which is very hot and completely flat (if you don&#39;t already know), compared to Yosemite Valley which - even in the summer - is freezing at night and has some pretty extreme elevation.
          </div>

          <div className={styles.paragraph}>
            Despite the challenges of hiking 11,000+ foot passes and summits and dealing with snow-covered trails, I enjoyed every second of the hike. I got to spend weeks outside in the wilderness without any technology in front of me aside from a compass and/or GPS (when needed) and got to experience a world away from society. I fell in love with hiking during this trip and also learned a lot about myself and about life in general.
          </div>
        </div>

        <div className={styles.actions}>
          <Button label="back to blog" url="/blog" />
        </div>
      </div>
    </div>
  );
}

export default Yosemite;