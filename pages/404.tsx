import { Seo } from "../src/components";
import { NotFound } from "../src/containers";
import { SiteLayout } from "../src/layouts/SiteLayout";
import type { NextPageWithLayout } from "../src/layouts/types";

const NotFoundPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="404 | Page not found"
        description="404 error page. Page not found."
        path="/404"
        noIndex
      />
      <NotFound />
    </>
  );
};

NotFoundPage.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default NotFoundPage;
