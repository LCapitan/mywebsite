import React, { useState, useEffect, useRef } from "react";

interface UseIntersectionObserverProps {
  refs: any;
  callback: any;
  options: {};
}

export default function UseIntersectionObserver({
  refs,
  callback,
  options = {
    threshold: [0.9, 1],
  },
}: UseIntersectionObserverProps) {
  // Setup our api here
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        callback({
          isIntersecting: entry.isIntersecting,
          target: entry.target,
          observer,
        });
      });
    }, options);

    refs.forEach((ref: any) => {
      observer.observe(ref.current);
    });

    // Cleanup when the component unmnounts
    return () => observer.disconnect();
  }, []);
}
