import type { NextPage } from "next";

import { Seo } from "../src/components";
import { About } from "../src/containers";

const AboutPage: NextPage = () => {
  return (
    <>
      <Seo
        title="About | Austin Melendez"
        description="Austin's about page where he introduces himself."
        path="/about"
      />
      <main className="container">
        <About />
      </main>
    </>
  );
};

export default AboutPage;
