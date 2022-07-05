import React from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import { Button } from '../../../../src/components'

// Styles
import styles from '../BlogPost.module.scss';

const HonsBuns = () => {
  return (
    <div className={styles.blogPost}>
      <div className='stars'></div>
      <div className={styles.heroImg}>
        <div className={styles.desktop}>
          <Image src="https://res.cloudinary.com/austinmel/image/upload/v1656997872/rabbit-hole_apyznw.jpg"
            layout="responsive"
            alt="me hiking in Zion National Park"
            width="1902"
            height="1047" />
        </div>
        <div className={styles.mobile}>
          <Image src="https://res.cloudinary.com/austinmel/image/upload/v1656997872/rabbit-hole_apyznw.jpg"
            layout="fill"
            alt="me hiking in Zion National Park"
            objectFit="cover" />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.pageHeading}>
          <h1 className={styles.pageTitle}>hon&#39;s buns</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.paragraph}>
            Hon&#39;s Buns is an NFT project started by myself, my gf - <a href="https://www.emilywills.com/" target="_blank" rel="noreferrer">Emily</a> - and my brother - <a href="https://jordanmel.com/" target="_blank" rel="noreferrer">Jordan</a>. Created as a way to honor some of our pet bunnies that passed away the last couple years, Bugs and Penelope.
          </div>

          <div className={styles.paragraph}>
            I started working at Nifty&#39;s as a product designer and developer back in the summer of 2021, and had just gotten into the world of NFTs. I&#39;d been wanting to start an NFT project for a long time as a way to get my name out there and have fun doing more artwork. It was a blast to come up with the initial bunny character and all of the traits and then draw them out. After everything was drawn (using the iPad to draw digitally) I ran all of the traits (over 200 of them) through a generator that gave us the finished images.
          </div>

          <div className={styles.paragraph}>
            We decided to use the funds we raised to donate to local (and non-local) pet rescues/adoption events. What we didn&#39;t anticipate was how difficult it would be to market and sell them. Whoops...
          </div>

          <div className={styles.paragraph}>
            Currently, we&#39;ve sold over 200 Hon&#39;s Buns NFTs and will hopefully be able to sell even more soon and help find some forever homes for some bunnies in need. If you&#39;re interested in minting some for yourself, head over to the <a href="https://www.honsbuns.com/" target="_blank" rel="noreferrer">Hon&#39;s Buns</a> website.
          </div>
        </div>

        <div className={styles.actions}>
          <Button label="back to blog" url="/blog" />
        </div>
      </div>
    </div>
  );
}

export default HonsBuns;