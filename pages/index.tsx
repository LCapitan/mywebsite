import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useInView } from "react-intersection-observer";
import SmoothScroll from "../src/components/SmoothScroll/SmoothScroll";
import Section from "../src/components/SmoothScroll/Section";

import { Home, Intro, Featured } from "../src/containers/index";

const Homepage: NextPage = () => {
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

      <SmoothScroll>
        <Section container>
          <Home />
        </Section>
        <Section container>
          <Intro />
        </Section>
        <Section container>
          <Featured />
        </Section>
      </SmoothScroll>
    </>
  );
};

export default Homepage;
