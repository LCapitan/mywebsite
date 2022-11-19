import "../styles/globals.scss";
import type { AppProps } from "next/app";
import UIContextProvider from "../src/providers/UIContextProvider";
import { Header } from "../src/components";
import { DefaultSeo } from "next-seo";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIContextProvider>
      <>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <DefaultSeo
          openGraph={{
            url: "https://www.amelen.dev/",
            title: "Austin's Portfolio",
            description: "Austin is a developer and designer, Virginia, US.",
            images: [
              {
                url: "https://res.cloudinary.com/austinmel/image/upload/v1656678415/astro_iie61u.jpg",
                width: 1440,
                height: 1440,
                alt: "astronaut illustration",
                type: "image/jpeg",
              },
            ],
          }}
        />
        <Header />
        <Component {...pageProps} />
        {/* <Footer /> */}
      </>
    </UIContextProvider>
  );
}

export default MyApp;
