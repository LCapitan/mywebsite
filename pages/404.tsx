import type { NextPage } from "next";

import { Seo } from "../src/components";
import { NoContent } from "../src/containers";

const Nothing: NextPage = () => {
  return (
    <>
      <Seo
        title="404 | Page not found"
        description="404 error page. Page not found."
        path="/404"
        noIndex
      />
      <main className="container">
        <NoContent />
      </main>
    </>
  );
};

export default Nothing;
