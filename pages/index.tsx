import { Seo } from "../src/components";
import { Home } from "../src/containers";
import { SiteLayout } from "../src/layouts/SiteLayout";
import type { NextPageWithLayout } from "../src/layouts/types";

const Homepage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title="Home | Austin Melendez" path="/" />
      <Home />
    </>
  );
};

Homepage.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default Homepage;
