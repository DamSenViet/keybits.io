import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import lightTheme from '@/theme/light'
import { Page } from 'page'
import createEmotionCache from '@/utils/createEmotionCache'
import DefaultLayout from '@/layouts/DefaultLayout'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  Component: Page,
  emotionCache?: EmotionCache
}

export default function MyApp({
  emotionCache = clientSideEmotionCache,
  Component,
  pageProps,
}: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const Layout = Component.layout ?? DefaultLayout

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={lightTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          {getLayout(<Component {...pageProps} />)}
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  )
}
