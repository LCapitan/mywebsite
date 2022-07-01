import type { NextPage } from 'next';
import Head from 'next/head';

import { HonsBunsContent } from '../../src/containers/CaseStudy';

import styles from '../../styles/Work.module.scss';

const HonsBuns: NextPage = () => {
  return (
    <>
      <main className="container">
        <HonsBunsContent />
      </main>
    </>
  )
}

export default HonsBuns;
