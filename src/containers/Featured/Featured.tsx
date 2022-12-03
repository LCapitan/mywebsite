import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { useInView } from "react-intersection-observer";
import useIntersectionObserver from "./UseIntersectionObserver";

import styles from "./Featured.module.scss";

import { WorkCard } from "../../components";

const Featured = () => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const itemRef1 = useRef(null);
  const itemRef2 = useRef(null);
  const itemRef3 = useRef(null);
  const itemRef4 = useRef(null);
  const itemRef5 = useRef(null);

  return (
    <div id="work" className={styles.featured}>
      <div className={styles.topRef} ref={topRef}></div>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          feat<span className={styles.mobile}>ured</span>&nbsp;
          <span className={styles.newLine}>
            wo<strong>r</strong>ks
          </span>
        </h2>
        <div className={styles.content}>
          <ul className={styles.workList}>
            <li ref={itemRef1}>
              <WorkCard
                small
                imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1669783240/my%20site/buns.jpg"
                imgAlt="an illustration of beautiful bunny"
                cardLink="https://www.honsbuns.com/"
                title="hon's buns"
                tags={["illustration", "javascript", "ui/ux", "html", "sass"]}
              />
            </li>
            <li ref={itemRef2}>
              <WorkCard
                imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1669776821/my%20site/upitt.jpg"
                imgAlt="a photo of upitt celebrating at a college game"
                cardLink="https://www.pitt.edu/"
                title="upitt"
                tags={["javascript", "ui/ux", "html", "sass"]}
              />
            </li>
            <li ref={itemRef3}>
              <WorkCard
                imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1659499300/c_h_qigysb.jpg"
                imgAlt="my artwork"
                cardLink="https://www.instagram.com/shucksworthy/"
                title="my artwork"
                tags={["illustration", "procreate", "drawing"]}
              />
            </li>
            <li ref={itemRef5}>
              <WorkCard
                imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656677596/Cover_cwto4r.png"
                imgAlt="nifty's logo"
                cardLink="https://niftys.com/"
                title="nifty's"
                tags={[
                  "product design",
                  "illustration",
                  "branding",
                  "next.js",
                  "react",
                  "ui/ux",
                ]}
              />
            </li>
            <li ref={itemRef4}>
              <WorkCard
                small
                imgSrc="https://res.cloudinary.com/austinmel/image/upload/v1656677312/curry_nrh65v.jpg"
                imgAlt="curry college"
                cardLink="https://www.curry.edu/"
                title="curry"
                tags={["javascript", "ui/ux", "html", "css"]}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.endRef} ref={bottomRef}></div>
    </div>
  );
};

export default Featured;
