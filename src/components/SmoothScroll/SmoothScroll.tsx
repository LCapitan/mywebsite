import React, { useEffect, useRef } from "react";

import styles from "./SmoothScroll.module.scss";
import useWindowSize from "../../hooks/useWindowSize";

interface SmoothScrollProps {
  children: any;
  workRef?: any;
}

export default function SmoothScroll({ children, workRef }: SmoothScrollProps) {
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
    // getWorkSectionPosition();
  }, [windowSize?.height]);

  const viewMin = windowSize?.width as number;

  const setBodyHeight = () => {
    const contRect =
      scrollingContainerRef?.current?.getBoundingClientRect() as DOMRect;

    if (scrollingContainerRef.current != null && viewMin >= 992) {
      document.body.style.height = `${contRect.height}px`;
    }
  };

  let height;

  // const getWorkSectionPosition = () => {
  //   if (scrollingContainerRef.current != null) {
  //     let scrollContRefChildren = scrollingContainerRef?.current?.children;
  //     const section1 = scrollContRefChildren[0] as HTMLElement | null;
  //     const section2 = scrollContRefChildren[1] as HTMLElement | null;
  //     const section3 = scrollContRefChildren[2] as HTMLElement | null;

  //     const section2Height = section2?.offsetHeight as number;
  //     const section1Height = section1?.offsetHeight as number;
  //     const section3Height = section3?.offsetHeight as number;

  //     height = section1Height + section2Height + section3Height;

  //     console.log(height);

  //     return height;
  //   }
  // };

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
