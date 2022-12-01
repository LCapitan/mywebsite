import React, { useEffect, useRef } from "react";

import styles from "./SmoothScroll.module.scss";
import useWindowSize from "../../hooks/useWindowSize";

interface SmoothScrollProps {
  children: any;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  // 1.
  const windowSize = useWindowSize();

  //2.
  const scrollingContainerRef = useRef<HTMLDivElement>(null);

  // 3.
  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  // 4.
  useEffect(() => {
    setBodyHeight();
  }, [windowSize?.height]);

  const setBodyHeight = () => {
    const contRect =
      scrollingContainerRef?.current?.getBoundingClientRect() as DOMRect;

    if (scrollingContainerRef.current != null) {
      document.body.style.height = `${contRect.height}px`;
    }
  };

  // 5.
  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
  });

  const smoothScrollingHandler = () => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    if (scrollingContainerRef.current != null) {
      scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`;
    }

    // Recursive call
    requestAnimationFrame(() => smoothScrollingHandler());
  };

  return (
    <div className={styles.parent}>
      <div ref={scrollingContainerRef}>{children}</div>
    </div>
  );
}
