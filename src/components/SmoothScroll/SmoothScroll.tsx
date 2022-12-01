import React, { useEffect, useRef } from "react";

import styles from "./SmoothScroll.module.scss";
import useWindowSize from "../../hooks/useWindowSize";

interface SmoothScrollProps {
  children: any;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const windowSize = useWindowSize();
  const scrollingContainerRef = useRef<HTMLDivElement>(null);
  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  useEffect(() => {
    setBodyHeight();
  }, [windowSize?.height]);

  const viewMin = windowSize?.width as number;

  const setBodyHeight = () => {
    const contRect =
      scrollingContainerRef?.current?.getBoundingClientRect() as DOMRect;

    if (scrollingContainerRef.current != null && viewMin >= 992) {
      document.body.style.height = `${contRect.height}px`;
    }
  };
  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
  });

  const smoothScrollingHandler = () => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    if (scrollingContainerRef.current != null && viewMin >= 992) {
      scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`;
    }
    requestAnimationFrame(() => smoothScrollingHandler());
  };

  return (
    <div className={styles.parent}>
      <div ref={scrollingContainerRef}>{children}</div>
    </div>
  );
}
