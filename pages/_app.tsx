import "../styles/globals.scss";
import "../styles/transitions.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Montserrat, Raleway, Ubuntu } from "next/font/google";

import UIContextProvider from "../src/providers/UIContextProvider";
import { Header } from "../src/components";
import type { NextPageWithLayout } from "../src/layouts/types";

const raleway = Raleway({ subsets: ["latin"], weight: ["300", "400", "700"] });
const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["300", "700"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

// Pages on the new design set getLayout; the rest keep the old header.
const oldLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
  </>
);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? oldLayout;

  return (
    <UIContextProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <style jsx global>{`
        :root {
          --font-copy: ${raleway.style.fontFamily};
          --font-title: ${ubuntu.style.fontFamily};
          --font-label: ${montserrat.style.fontFamily};
        }
      `}</style>
      {getLayout(<Component {...pageProps} />)}
    </UIContextProvider>
  );
}

export default MyApp;
