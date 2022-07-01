import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import UIContextProvider from '../src/providers/UIContextProvider'
import { Header, Footer } from '../src/components'
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIContextProvider>
      <>
        <DefaultSeo
          openGraph={{
            url: 'https://www.emilywills.com/',
            title: "Emily Wills' Portfolio",
            description: "Emily Wills is an experience designer, entrepreneur, and empath from Virginia, US.",
            images: [
              {
                url: 'https://res.cloudinary.com/austinmel/image/upload/v1650911928/ogimage1_ggyamz.jpg',
                width: 1194,
                height: 746,
                alt: 'Emily Wills and a Bunny',
                type: 'image/jpeg',
              }
            ],
          }}
          twitter={{
            handle: '@EmilyWills',
            site: '@EmilyWills',
            cardType: 'summary_large_image',
          }}
        />
        <Header />
        <Component {...pageProps} />
        {/* <Footer /> */}
      </>
    </UIContextProvider>
  )
}

export default MyApp
