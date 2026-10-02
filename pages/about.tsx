import { Seo } from "../src/components";
import { About } from "../src/containers";
import { SiteLayout } from "../src/layouts/SiteLayout";
import type { NextPageWithLayout } from "../src/layouts/types";

const AboutPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="About | Austin Melendez"
        description="Austin is a senior front-end developer in Miami who has always loved making things."
        path="/about"
      />
      <About />
    </>
  );
};

AboutPage.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default AboutPage;
