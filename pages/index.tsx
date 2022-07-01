import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import { Header, Menu } from '../src/components/index';
import { Home } from '../src/containers/index';

import styles from '../styles/Home.module.scss';

const Homepage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Home | Emily Wills"
        description="Emily Wills is an experience designer, entrepreneur, and empath from Virginia, US."
        defaultTitle="Welcome to Emily Wills' Portfolio"
        canonical="https://www.emilywills.com/"
        openGraph={{
          url: 'https://www.emilywills.com/',
          title: "Emily Wills' Portfolio",
          description: "Emily Wills is an experience designer, entrepreneur, and empath from Virginia, US.",
          images: [
            { url: 'https://res.cloudinary.com/austinmel/image/upload/v1650911928/ogimage1_ggyamz.jpg' }
          ],
          site_name: 'EmilyWills',
        }}
        twitter={{
          handle: '@EmilyWills',
          site: '@EmilyWills',
          cardType: 'summary_large_image',
        }}
      />

      <main className="container">
        <Home />
      </main>
    </>
  )
}

export default Homepage;
