import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { WorkContent } from '../src/containers/index';

const Work: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Work | Austin Melendez"
        description="Austin's portfolio and list of work he's done."
        defaultTitle="Welcome to Austin's Portfolio"
        canonical="https://www.amelen.dev/work"
        openGraph={{
          url: 'https://www.amelen.dev/work',
          title: "Austin's Portfolio",
          description: "Austin's portfolio and list of work he's done.",
          images: [
            { url: 'https://res.cloudinary.com/austinmel/image/upload/v1656678415/astro_iie61u.jpg' }
          ],
          site_name: 'Austin Melendez',
        }}
      />

      <main className="container">
        <WorkContent />
      </main>
    </>
  )
}

export default Work;
