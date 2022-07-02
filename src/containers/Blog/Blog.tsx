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
          altText="me hiking in Zion National Park"
          title="Yosemite Valley"
          prevText="I'm baby tousled williamsburg heirloom butcher, man braid vaporware bicycle rights subway tile ethical schlitz lo-fi twee."
          url="/yosemite-valley" />
        <BlogItem
          imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656744747/Untitled_Artwork_4_liy7ur.png"
          altText="a Hon's Buns NFT"
          title="Hon's Buns NFTs"
          prevText="Chia bicycle rights cold-pressed live-edge, fingerstache occupy mustache keytar truffaut taxidermy pickled biodiesel."
          url="/blog" />

        <BlogItem
          imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656744834/christopher-gower-m_HRfLhgABo-unsplash_ber407.jpg"
          altText="me hiking in Zion National Park"
          title="Sass modules"
          prevText="Cliche fam craft beer edison bulb synth chicharrones. 8-bit lomo heirloom, roof party microdosing crucifix enamel pin irony."
          url="/blog" />

        <BlogItem
          imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656739819/IMG_0471_j6ucdc.jpg"
          altText="me hiking in Zion National Park"
          title="Kolob Canyon"
          prevText="I'm baby tousled williamsburg heirloom butcher, man braid vaporware bicycle rights subway tile ethical schlitz lo-fi twee."
          url="/blog" />
      </div>
    </div>
  );
}