import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

import { Button } from "../../components";
import { HomeBg, Logo } from "../../components/Icons/";

import styles from "./Home.module.scss";

interface HomeProps {}

export function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const introRef = useRef(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    setIsLoaded(!isLoaded);
    setIsInView(!isInView);
  }, []);

  useEffect(() => {
    const topRect = topRef?.current?.getBoundingClientRect() as DOMRect;
    const bottomRect = bottomRef?.current?.getBoundingClientRect() as DOMRect;
    const { top: topOfBeginning, bottom: bottomOfTop } = topRect;
    const { bottom: bottomOfEnd } = bottomRect;
    const totalHeight = bottomOfEnd - topOfBeginning;

    let animationId: number;

    const calculateScroll = () => {
      if (parallaxRef.current != null) {
        const percentage = ((window.scrollY / totalHeight + 3) * 15).toFixed(2);
        parallaxRef.current.style.transform = `translateY(-${percentage}%)`;
      } else {
        if (parallaxRef.current != null) {
          parallaxRef.current.style.transform = `translateY(-50%)`;
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
      if (parallaxRef.current != null) {
        parallaxRef.current.style.transform = `translateY(-50%)`;
      }
      console.log("canceled");
    }

    return () => cancelAnimationFrame(animationId);
  });
  return (
    <div className={styles.home} ref={ref}>
      <div className={styles.homeRef} ref={topRef}></div>
      <div className={styles.pageHero}>
        <Image
          src="https://res.cloudinary.com/austinmel/image/upload/v1656750239/astro-dunk_ltgeiq.png"
          layout="responsive"
          alt="an illustration of me using the computer"
          width="2048"
          height="2048"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <h1 className={styles.title}>
          austin
          <br />
          melendez
        </h1>
        <h2 className={styles.subtitle}>
          an artist, designer, and developer, in love with hiking and twizzlers
          (pull &amp; peels mostly).
        </h2>
        <div className={styles.actions}>
          <Button url="/work" label="see my work" />
          <Button url="/about" label="about me" secondary />
        </div>
      </div>
      <div className={styles.bottomRef} ref={bottomRef}></div>
      <div className={styles.pageBg} ref={parallaxRef}>
        <HomeBg />
      </div>
    </div>
  );
}
