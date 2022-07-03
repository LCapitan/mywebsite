import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { Yosemite } from '../../src/containers/BlogPost';

const BlogPage: NextPage = () => {
  return (
    <>
      {/* <Header/> */}
      <main className="container">
        <Yosemite />
      </main>
    </>
  )
}

export default BlogPage;
