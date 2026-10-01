import type { NextPage } from "next";

import { Seo } from "../src/components";
import { WorkContent } from "../src/containers";

const Work: NextPage = () => {
  return (
    <>
      <Seo
        title="Work | Austin Melendez"
        description="Austin's portfolio and list of work he's done."
        path="/work"
      />
      <main className="container">
        <WorkContent />
      </main>
    </>
  );
};

export default Work;
