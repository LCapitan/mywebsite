import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { NoContent } from '../src/containers/index';

const Nothing: NextPage = () => {
  return (
    <>
      <NextSeo
        title="404 | Page not found"
        description="404 error page. Page not found."
        defaultTitle="Welcome to Austin's Portfolio"
        canonical="https://www.amelen.dev/404"
        openGraph={{
          url: 'https://www.amelen.dev/404',
          title: "Austin's Portfolio",
          description: "404 error page. Page not found.",
          images: [
            { url: 'https://res.cloudinary.com/austinmel/image/upload/v1656678415/astro_iie61u.jpg' }
          ],
          site_name: 'Austin Melendez',
        }}
      />
      <main className="container">
        <NoContent />
      </main>
    </>
  )
}

export default Nothing;
