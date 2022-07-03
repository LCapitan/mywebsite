import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { Yosemite } from '../../src/containers/BlogPost';

const BlogPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Yosemite Valley Blog Post | Austin Melendez"
        description="A blog post about Austin's adventures in Yosemite Valley, California."
        defaultTitle="Welcome to Austin's Portfolio"
        canonical="https://www.amelen.dev/post/yosemite-valley"
        openGraph={{
          url: 'https://www.amelen.dev/post/yosemite-valley',
          title: "Austin's Portfolio",
          description: "A blog post about Austin's adventures in Yosemite Valley, California.",
          images: [
            { url: 'https://res.cloudinary.com/austinmel/image/upload/v1656678415/astro_iie61u.jpg' }
          ],
          site_name: 'Austin Melendez',
        }}
      />

      <main className="container">
        <Yosemite />
      </main>
    </>
  )
}

export default BlogPage;
