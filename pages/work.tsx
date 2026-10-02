import { Seo } from "../src/components";
import { Work } from "../src/containers";
import { SiteLayout } from "../src/layouts/SiteLayout";
import type { NextPageWithLayout } from "../src/layouts/types";

const WorkPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="Work | Austin Melendez"
        description="Websites and products Austin has designed and built."
        path="/work"
      />
      <Work />
    </>
  );
};

WorkPage.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default WorkPage;
