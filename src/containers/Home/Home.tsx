import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { useInView } from "react-intersection-observer";

import { Creative, Developer } from "../../components/Icons/HeroTitle";

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
      if (parallaxRef.current != null && titleRef.current != null) {
        const percentage = ((window.scrollY / totalHeight) * 30).toFixed(2);
        parallaxRef.current.style.height = `${percentage}px`;
      } else {
        if (parallaxRef.current != null && titleRef.current != null) {
          parallaxRef.current.style.height = `0px`;
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
      if (parallaxRef.current != null && titleRef.current != null) {
        parallaxRef.current.style.height = `0px`;
      }
      console.log("canceled");
    }

    return () => cancelAnimationFrame(animationId);
  });

  return (
    <div className={cx(styles.home, isInView && styles.isInView)} ref={ref}>
      <div className={styles.homeRef} ref={topRef}></div>
      <div
        className={cx(styles.intro, isLoaded && styles.loaded)}
        ref={introRef}
      >
        <div className={styles.content}>
          <span>austin</span>
          <span>is</span>
          <span>a</span>
        </div>

        <div className={styles.dark}></div>
        <div className={styles.mid}></div>
        <div className={styles.light}></div>
      </div>

      <div className={styles.inner} ref={titleRef}>
        <h1 className={styles.title}>
          <span>
            <Creative />
            <span className="srOnly">creative</span>
          </span>
          <div className={styles.spacer} ref={parallaxRef}></div>
          <span>
            <Developer />
            <span className="srOnly">developer</span>
          </span>
        </h1>

        <div className={styles.roles}>
          <div className={styles.rolesItem}>
            <span>react developer</span>
            <span>product designer</span>
          </div>
          <div className={styles.rolesItem}>
            <span>digital artist</span>
            <span>& illustrator</span>
          </div>
        </div>
      </div>
      <div className={styles.bottomRef} ref={bottomRef}></div>
    </div>
  );
}
