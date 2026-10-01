import type { GetStaticProps, NextPage } from "next";

import { SHOW_BLOG } from "../../src/config";
import { Seo } from "../../src/components";
import { Yosemite } from "../../src/containers";

export const getStaticProps: GetStaticProps = async () =>
  SHOW_BLOG ? { props: {} } : { notFound: true };

const YosemitePost: NextPage = () => {
  return (
    <>
      <Seo
        title="Yosemite Valley Blog Post | Austin Melendez"
        description="A blog post about Austin's adventures in Yosemite Valley, California."
        path="/post/yosemite-valley"
      />
      <main className="container">
        <Yosemite />
      </main>
    </>
  );
};

export default YosemitePost;
