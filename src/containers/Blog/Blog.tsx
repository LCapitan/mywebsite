import React from "react";

import { Button, BlogItem } from '../../components';

import styles from './Blog.module.scss'

interface BlogProps { }

export function Blog() {
  return (
    <div className={styles.blog}>
      <div className='stars'></div>
      <div className={styles.pageHeading}>
        <h1 className={styles.pageTitle}>blog</h1>
        {/* <h2 className={styles.subtitle}>
          welcome to my inner thoughts.
        </h2> */}
      </div>

      <div className={styles.blogList}>
        <BlogItem
          featured
          imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656789693/IMG_1793_cpb4bo.jpg"
          altText="me hiking in Yosemite Valley, California"
          title="Yosemite Valley"
          prevText="A life-changing trip. Honestly. My first ever hike was in Yosemite, which was quite an experience since Yosemite is considered to be one of the most beautiful parks in the United States."
          url="/yosemite-valley" />

        <BlogItem
          imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656913514/IMG_0612_oppet2.jpg"
          altText="a Hon's Buns NFT"
          title="Hon's Buns NFTs"
          prevText="An NFT project started by myself, my gf, Emily, and my brother."
          url="/hons-buns" />
      </div>
    </div>
  );
}