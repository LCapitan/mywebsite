import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { Blog } from '../src/containers/index';

const BlogPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Blog | Austin Melendez"
        description="Austin's blog posts where he shares his thoughts on whatever comes to mind."
        defaultTitle="Welcome to Austin's Portfolio"
        canonical="https://www.amelen.dev/blog"
        openGraph={{
          url: 'https://www.amelen.dev/blog',
          title: "Austin's Portfolio",
          description: "Austin's blog posts where he shares his thoughts on whatever comes to mind.",
          images: [
            { url: 'https://res.cloudinary.com/austinmel/image/upload/v1656678415/astro_iie61u.jpg' }
          ],
          site_name: 'Austin Melendez',
        }}
      />
      <main className="container">
        <Blog />
      </main>
    </>
  )
}

export default BlogPage;
