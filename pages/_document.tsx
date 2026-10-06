import { Html, Head, Main, NextScript } from "next/document";

// Lets CSS hide content that animates in, only when JS can reveal it. Also
// restores a visitor's choice to pause the looping animations (see
// MotionToggle) before anything paints.
const jsFlag = `document.documentElement.classList.add('js');
try { if (localStorage.getItem('motion') === 'paused') document.documentElement.dataset.motion = 'paused'; } catch (e) {}`;

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
