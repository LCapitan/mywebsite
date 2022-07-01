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
            url: 'https://www.amelen.dev/',
            title: "Austin's Portfolio",
            description: "Austin is a developer and designer, Virginia, US.",
            // images: [
            //   {
            //     url: 'https://res.cloudinary.com/austinmel/image/upload/v1650911928/ogimage1_ggyamz.jpg',
            //     width: 1194,
            //     height: 746,
            //     alt: '',
            //     type: 'image/jpeg',
            //   }
            // ],
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
