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
        title="Home | Austin Melendez"
        description="Austin is a developer and designer from Virginia, US."
        defaultTitle="Welcome to Austin's Portfolio"
        canonical="https://www.amelen.dev/"
        openGraph={{
          url: 'https://www.amelen.dev/',
          title: "Austin's Portfolio",
          description: "Austin is a developer and designer from Virginia, US.",
          // images: [
          //   { url: 'https://res.cloudinary.com/austinmel/image/upload/v1650911928/ogimage1_ggyamz.jpg' }
          // ],
          site_name: 'Austin Melendez',
        }}
      // twitter={{
      //   handle: '@EmilyWills',
      //   site: '@EmilyWills',
      //   cardType: 'summary_large_image',
      // }}
      />

      <main className="container">
        <Home />
      </main>
    </>
  )
}

export default Homepage;
