import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { About } from '../src/containers/index';

import styles from '../styles/About.module.scss';

const AboutPage: NextPage = () => {
  return (
    <>
      {/* <Header/> */}
      <main className="container">
        <About />
      </main>
    </>
  )
}

export default AboutPage;
