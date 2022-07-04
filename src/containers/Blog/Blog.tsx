import React from "react";
import cx from 'classnames';
import Link from "next/link";
import Image from "next/image";

import { Button, BlogItem } from '../../components';
import { HomeBg, Logo } from '../../components/Icons/';

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
          imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656744747/Untitled_Artwork_4_liy7ur.png"
          altText="a Hon's Buns NFT"
          title="Hon's Buns NFTs"
          prevText="An NFT project started by myself, my gf, Emily, and my brother. Created as a way to honor some of our pet bunnies that passed away."
          url="/blog" />

        <BlogItem
          imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656909889/DF5498F9-F695-4AE3-A810-EC4739232FAA_mvupcq.jpg"
          altText="me hiking in Zion National Park"
          title="Kolob Canyon"
          prevText="Another beautiful hiking adventure out in Utah as part of the Zion National Park. A trip I got to enjoy with my brother and my dad."
          url="/blog" />

        <BlogItem
          imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656744834/christopher-gower-m_HRfLhgABo-unsplash_ber407.jpg"
          altText="a photo of a computer with coding"
          title="How I started my career"
          prevText="Cliche fam craft beer edison bulb synth chicharrones. 8-bit lomo heirloom, roof party microdosing crucifix enamel pin irony."
          url="/blog" />
      </div>
    </div>
  );
}