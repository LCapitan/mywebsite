import { Html, Head, Main, NextScript } from "next/document";

// Lets CSS hide content that animates in, only when JS can reveal it.
const jsFlag = "document.documentElement.classList.add('js')";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
