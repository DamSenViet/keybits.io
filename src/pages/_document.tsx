import {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import Favicon from '@/components/Favicon'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Favicon />
        {/* PWA primary color */}
        {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}