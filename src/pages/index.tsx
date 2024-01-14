import * as React from 'react'
import Head from 'next/head'
import routes from '@/routes'

export default function Home() {
  return (
    <>
      <Head>
        <title>{routes.home.label}</title>
        <meta
          name="description"
          content="Revolutionizing design processes for custom keyboards."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>


      <main>
      </main>

    </>
  )
}
