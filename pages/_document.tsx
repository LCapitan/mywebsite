import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="shortcut icon" href="https://res.cloudinary.com/austinmel/image/upload/v1642232661/fav-64_hectu5.png"></link>
          <link rel="icon" type="image/png" href="https://res.cloudinary.com/austinmel/image/upload/v1642232661/fav-64_hectu5.png"></link>
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://res.cloudinary.com/austinmel/image/upload/v1642232193/favicon-144_my6if2.png"></link>
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://res.cloudinary.com/austinmel/image/upload/v1642232193/favicon-114_cqt2bm.png"></link>
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://res.cloudinary.com/austinmel/image/upload/v1642232193/favicon-72_xkgxv7.png"></link>
          <link rel="apple-touch-icon-precomposed" href="https://res.cloudinary.com/austinmel/image/upload/v1642232193/favicon-57_emztjs.png"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}