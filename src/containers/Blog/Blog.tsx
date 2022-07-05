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
          title="Yosemite"
          prevText="A life-changing trip. Honestly. My first ever hike was in Yosemite, which was quite an experience since Yosemite is considered to be one of the most beautiful parks in the United States."
          url="/yosemite-valley" />

        <BlogItem
          imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656913514/IMG_0612_oppet2.jpg"
          altText="a Hon's Buns NFT"
          title="Hon's Buns NFTs"
          prevText="An NFT project started by myself, my gf, Emily, and my brother."
          url="/hons-buns" />

        <BlogItem
          comingSoon
          imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656744834/christopher-gower-m_HRfLhgABo-unsplash_ber407.jpg"
          altText="image of a laptop and desktop with code and design on it."
          title="How I started my career"
          prevText='Like most other artists, I was always discouraged from becoming an artist because "artists don&#39;t make money. So I did it anyway.' />

        <BlogItem
          comingSoon
          imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656909889/DF5498F9-F695-4AE3-A810-EC4739232FAA_mvupcq.jpg"
          altText="a photo of Kolob Canyon in Zion National Park"
          title="Kolob Canyon"
          prevText="My first canyon hike, on a trail off of Zion National park with my dad and brother." />

        <BlogItem
          comingSoon
          imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1657007417/IMG_0731_ozttpj.jpg"
          altText="a photo of my dog, named Fiz"
          title="my dog, fiz"
          prevText="Just a post to celebrate my favorite four-legged canine who has been with me for a few years now." />
      </div>
    </div>
  );
}