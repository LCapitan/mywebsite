import type { NextPage } from 'next';

import { WorkContent } from '../src/containers/index';

import styles from '../../styles/Home.module.scss';

const Work: NextPage = () => {
  return (
    <>
      {/* <Header/> */}
      <main className="container">
        <WorkContent />
      </main>
    </>
  )
}

export default Work;
