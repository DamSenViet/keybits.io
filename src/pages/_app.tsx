import { AppProps } from 'next/app'
import Head from 'next/head'
import { Page } from 'page'

// Client-side cache, shared for the whole session of the user in the browser.

export interface MyAppProps extends AppProps {
  Component: Page,
}

export default function MyApp({
  Component,
  pageProps,
}: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page)
  // const Layout = Component.layout ?? DefaultLayout

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
