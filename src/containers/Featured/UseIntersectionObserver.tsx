import React, { useState, useEffect, useRef } from "react";

interface useIntersectionObserverProps {
  refs: any;
  callback: any;
  options: {};
}

export default function useIntersectionObserver({
  refs,
  callback,
  options = {
    threshold: [0.9, 1],
  },
}: useIntersectionObserverProps) {
  // Setup our api here
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
}
