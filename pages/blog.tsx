import type { GetStaticProps, NextPage } from "next";

import { SHOW_BLOG } from "../src/config";
import { Seo } from "../src/components";
import { Blog } from "../src/containers";

export const getStaticProps: GetStaticProps = async () =>
  SHOW_BLOG ? { props: {} } : { notFound: true };

const BlogPage: NextPage = () => {
  return (
    <>
      <Seo
        title="Blog | Austin Melendez"
        description="Austin's blog posts where he shares his thoughts on whatever comes to mind."
        path="/blog"
      />
      <main className="container">
        <Blog />
      </main>
    </>
  );
};

export default BlogPage;
