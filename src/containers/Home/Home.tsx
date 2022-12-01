import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";

import { useInView } from "react-intersection-observer";

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

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    setIsLoaded(!isLoaded);
    setIsInView(!isInView);
    console.log(isLoaded);
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
        titleRef.current.style.paddingBottom = `${percentage}px`;
      } else {
        if (parallaxRef.current != null && titleRef.current != null) {
          parallaxRef.current.style.height = `0px`;
          titleRef.current.style.paddingBottom = `0px`;
        }
      }
    };

    const animate = () => {
      calculateScroll();
      animationId = requestAnimationFrame(animate);
    };

    if (inView) {
      animate();
    } else {
      animationId = 0;
      cancelAnimationFrame(animationId);
      if (parallaxRef.current != null && titleRef.current != null) {
        parallaxRef.current.style.height = `0px`;
        titleRef.current.style.paddingBottom = `0px`;
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
            cre<strong>a</strong>tive
          </span>
          <div className={styles.spacer} ref={parallaxRef}></div>
          <span>developer</span>
        </h1>

        <div className={styles.roles}>
          <span>react developer</span>
          <span>product designer</span>
          <span>digital artist</span>
        </div>
      </div>
      <div className={styles.bottomRef} ref={bottomRef}></div>
    </div>
  );
}
