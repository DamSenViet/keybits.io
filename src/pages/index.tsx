import * as React from 'react'
import Head from 'next/head'
import AppHeader from '@/layouts/AppHeader'
import AppFooter from '@/layouts/AppFooter'
import Hero from '@/components/home/Hero'
import PrecursorPreview from '@/components/home/PrecursorPreview'
import EditorPreview from '@/components/home/EditorPreview'
import StudioPreview from '@/components/home/StudioPreview'
import LabsPreview from '@/components/home/LabsPreview'
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

      <AppHeader />

      <main>
        <Hero />
        <PrecursorPreview />
        <EditorPreview />
        <StudioPreview />
        <LabsPreview />
      </main>

      <AppFooter />
    </>
  )
}
