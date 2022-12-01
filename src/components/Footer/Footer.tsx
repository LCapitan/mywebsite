import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

import { HomeBg, Arrow } from "../Icons";
import { Button } from "../Button";

import styles from "./Footer.module.scss";

export default function Footer() {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
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
        const percentage = ((window.scrollY / totalHeight) * 100).toFixed(2);
        parallaxRef.current.style.transform = ` translate(-50%, ${percentage}px)`;
      } else {
        if (parallaxRef != null && parallaxRef.current != null) {
          parallaxRef.current.style.transform = `translate(-50%, 0)`;
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
      if (parallaxRef != null && parallaxRef.current != null) {
        parallaxRef.current.style.transform = `translate(-50%, 0)`;
      }
    }

    return () => cancelAnimationFrame(animationId);
  });
  return (
    <footer className={styles.footer} ref={ref}>
      <div className={styles.topRef} ref={topRef}></div>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.arrow}>
            <Arrow />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>
              let&#39;s talk about the next big thing
            </h3>
          </div>
          <div className={styles.actions}>
            <Button label="send a message" />
            <Button label="discuss project" />
          </div>
          <div className={styles.copyright}>
            <span>&copy;2023 Austin Melendez, All Rights Reserved</span>
            <span>2023 Portfolio</span>
          </div>
          <div className={styles.moon} ref={parallaxRef}>
            <HomeBg />
          </div>
        </div>
      </div>
      <div className={styles.bottomRef} ref={bottomRef}></div>
    </footer>
  );
}
