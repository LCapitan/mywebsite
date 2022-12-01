import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import cx from "classnames";

import { useInView } from "react-intersection-observer";
import { WorkBg, Button } from "../../components";

import styles from "./About.module.scss";

interface AboutProps {}

const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  let width: number;

  const windowSize = () => {
    if (typeof window !== "undefined") {
      width = window.innerWidth;
      return {
        width,
      };
    }
  };
  windowSize();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: "100px 0px 0px 0px",
  });

  useEffect(() => {
    const topRect = topRef?.current?.getBoundingClientRect() as DOMRect;
    const bottomRect = bottomRef?.current?.getBoundingClientRect() as DOMRect;
    const { top: topOfBeginning, bottom: bottomOfTop } = topRect;
    const { bottom: bottomOfEnd } = bottomRect;
    const totalHeight = bottomOfEnd - topOfBeginning;

    let animationId: number;

    const calculateScroll = () => {
      if (inView && parallaxRef != null && parallaxRef.current != null) {
        const percentage = ((window.scrollY / totalHeight) * 10).toFixed(2);
        parallaxRef.current.style.transform = ` translate(-50%, ${percentage}%)`;
      } else {
        if (parallaxRef != null && parallaxRef.current != null) {
          parallaxRef.current.style.transform = `translate(-50%, 70px)`;
        }
      }
    };

    const animate = () => {
      calculateScroll();
      animationId = requestAnimationFrame(animate);
    };

    if (inView && width >= 992) {
      animate();
    } else {
      animationId = 0;
      cancelAnimationFrame(animationId);
      if (parallaxRef != null && parallaxRef.current != null) {
        parallaxRef.current.style.transform = `translate(-50%, 70px)`;
      }
    }

    return () => cancelAnimationFrame(animationId);
  });

  return (
    <div className={cx(styles.about, inView && styles.inView)}>
      <div className={styles.topRef} ref={topRef}></div>
      <div className={styles.inner}>
        <div className={cx(styles.content, inView && styles.inView)} ref={ref}>
          I&#39;m austin. I design and build interfaces for mobile & web that
          are unconventional, yet functional and visually pleasing.
        </div>
        <div
          className={cx(
            styles.images,
            styles.desktop,
            inView && styles.inView,
            isOpen && styles.open
          )}
        >
          <figure className={styles.img} onClick={() => handleClick()}>
            <Image
              src="https://res.cloudinary.com/austinmel/image/upload/v1669757247/my%20site/astro-1.png"
              layout="fill"
              alt=""
            />
          </figure>
          <figure className={styles.img} onClick={() => handleClick()}>
            <Image
              src="https://res.cloudinary.com/austinmel/image/upload/v1669757252/my%20site/hawk-1.png"
              layout="fill"
              alt=""
            />
          </figure>
          <figure className={styles.img} onClick={() => handleClick()}>
            <Image
              src="https://res.cloudinary.com/austinmel/image/upload/v1669757242/my%20site/astro-2.png"
              layout="fill"
              alt=""
            />
          </figure>
        </div>

        <div
          className={cx(
            styles.images,
            styles.mobile,
            inView && styles.inView,
            isOpen && styles.open
          )}
        >
          <figure className={styles.img} onClick={() => handleClick()}>
            <Image
              src="https://res.cloudinary.com/austinmel/image/upload/v1669757247/my%20site/astro-1.png"
              layout="responsive"
              width="450"
              height="674"
              alt=""
            />
          </figure>
          <figure className={styles.img} onClick={() => handleClick()}>
            <Image
              src="https://res.cloudinary.com/austinmel/image/upload/v1669757252/my%20site/hawk-1.png"
              layout="responsive"
              width="450"
              height="674"
              alt=""
            />
          </figure>
          <figure className={styles.img} onClick={() => handleClick()}>
            <Image
              src="https://res.cloudinary.com/austinmel/image/upload/v1669757242/my%20site/astro-2.png"
              layout="responsive"
              width="450"
              height="674"
              alt=""
            />
          </figure>
        </div>
      </div>
      <div className={styles.rip} ref={parallaxRef}>
        <WorkBg full />
      </div>
      <div className={styles.endRef} ref={bottomRef}></div>
    </div>
  );
};

export default About;
