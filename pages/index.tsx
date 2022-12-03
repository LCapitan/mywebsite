import React, { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useInView } from "react-intersection-observer";
import SmoothScroll from "../src/components/SmoothScroll/SmoothScroll";
import Section from "../src/components/SmoothScroll/Section";
import { Home, About, Capabilities, Featured } from "../src/containers/index";
import { Header } from "../src/components";
import Footer from "../src/components/Footer/Footer";

const Homepage: NextPage = () => {
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
    <>
      <NextSeo
        title="Home | Austin Melendez"
        description="Austin is a developer and designer from Virginia, US."
        defaultTitle="Welcome to Austin's Portfolio"
        canonical="https://www.amelen.dev/"
        openGraph={{
          url: "https://www.amelen.dev/",
          title: "Austin's Portfolio",
          description: "Austin is a developer and designer from Virginia, US.",
          images: [
            {
              url: "https://res.cloudinary.com/austinmel/image/upload/v1656678415/astro_iie61u.jpg",
            },
          ],
          site_name: "Austin Melendez",
        }}
      />

      <Header />
      <SmoothScroll>
        <Section container>
          <Home />
        </Section>
        <Section container>
          <About />
        </Section>
        <Section container>
          <Featured />
        </Section>
        <Section>
          <Footer />
        </Section>
      </SmoothScroll>
    </>
  );
};

export default Homepage;
