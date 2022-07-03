import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { About } from '../src/containers/index';

const AboutPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="About | Austin Melendez"
        description="Austin's about page where he introduces himself."
        defaultTitle="Welcome to Austin's Portfolio"
        canonical="https://www.amelen.dev/about"
        openGraph={{
          url: 'https://www.amelen.dev/about',
          title: "Austin's Portfolio",
          description: "Austin's about page where he introduces himself.",
          images: [
            { url: 'https://res.cloudinary.com/austinmel/image/upload/v1656678415/astro_iie61u.jpg' }
          ],
          site_name: 'Austin Melendez',
        }}
      />
      <main className="container">
        <About />
      </main>
    </>
  )
}

export default AboutPage;
