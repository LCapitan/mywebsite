import type { NextPage } from "next";

import { Seo } from "../src/components";
import { Home } from "../src/containers";

const Homepage: NextPage = () => {
  return (
    <>
      <Seo title="Home | Austin Melendez" path="/" />
      <main className="container">
        <Home />
      </main>
    </>
  );
};

export default Homepage;
