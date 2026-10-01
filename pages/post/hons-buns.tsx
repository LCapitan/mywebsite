import type { GetStaticProps, NextPage } from "next";

import { SHOW_BLOG } from "../../src/config";
import { Seo } from "../../src/components";
import { HonsBuns } from "../../src/containers";

export const getStaticProps: GetStaticProps = async () =>
  SHOW_BLOG ? { props: {} } : { notFound: true };

const HonsBunsPost: NextPage = () => {
  return (
    <>
      <Seo
        title="Hon's Buns Blog Post | Austin Melendez"
        description="A blog post about Hon's Buns NFTs."
        path="/post/hons-buns"
      />
      <main className="container">
        <HonsBuns />
      </main>
    </>
  );
};

export default HonsBunsPost;
