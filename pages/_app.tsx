import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Raleway, Ubuntu } from "next/font/google";

import UIContextProvider from "../src/providers/UIContextProvider";
import { Header } from "../src/components";

const raleway = Raleway({ subsets: ["latin"], weight: ["300", "400", "700"] });
const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["300", "700"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIContextProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <style jsx global>{`
        :root {
          --font-copy: ${raleway.style.fontFamily};
          --font-title: ${ubuntu.style.fontFamily};
        }
      `}</style>
      <Header />
      <Component {...pageProps} />
    </UIContextProvider>
  );
}

export default MyApp;
