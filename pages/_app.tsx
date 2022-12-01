import React, { useEffect, useRef, useState } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import UIContextProvider from "../src/providers/UIContextProvider";
import { useInView } from "react-intersection-observer";
import { Header } from "../src/components";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import Footer from "../src/components/Footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.85,
  });

  useEffect(() => {
    if (inView) {
      setIsInView(!isInView);
    }
  }, [inView, isInView]);

  return (
    <UIContextProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo
        openGraph={{
          url: "https://www.amelen.dev/",
          title: "Austin's Portfolio",
          description: "Austin is a developer and designer, Virginia, US.",
          images: [
            {
              url: "https://res.cloudinary.com/austinmel/image/upload/v1656678415/astro_iie61u.jpg",
              width: 1440,
              height: 1440,
              alt: "astronaut illustration",
              type: "image/jpeg",
            },
          ],
        }}
      />
      <Header isInView={inView} />
      <Component {...pageProps} />
      <div ref={ref}>
        <Footer />
      </div>
    </UIContextProvider>
  );
}

export default MyApp;
