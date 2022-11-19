import type { NextPage } from "next";
import { NextSeo } from "next-seo";

import { AusEmContent } from "../src/containers/index";

const AusEm: NextPage = () => {
  return (
    <>
      <NextSeo
        title="AusEm | Austin Melendez"
        description="For my best friend."
        defaultTitle="Welcome to Austin's Portfolio"
        canonical="https://www.amelen.dev/work"
        openGraph={{
          url: "https://www.amelen.dev/work",
          title: "For my best friend.",
          description: "For my best friend.",
          images: [
            {
              url: "https://res.cloudinary.com/austinmel/image/upload/v1668833498/IMG_2185_dghq1q.jpg",
            },
          ],
          site_name: "For my best friend..",
        }}
      />

      <main className="container">
        <AusEmContent />
      </main>
    </>
  );
};

export default AusEm;
