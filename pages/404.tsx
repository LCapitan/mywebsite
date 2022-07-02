import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { NoContent } from '../src/containers/index';

// import styles from '../styles/Blog.module.scss';

const Nothing: NextPage = () => {
  return (
    <>
      {/* <Header/> */}
      <main className="container">
        <NoContent />
      </main>
    </>
  )
}

export default Nothing;
