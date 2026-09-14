import type { Metadata } from 'next'

import { CloudFooter } from '@cloud/_components/CloudFooter/index'
import { CloudHeader } from '@cloud/_components/CloudHeader/index'
import { fetchGlobals } from '@data'
import { buildSafe } from '@root/utilities/buildSafe'
import { mergeOpenGraph } from '@root/seo/mergeOpenGraph'

import classes from './layout.module.scss'

// See (pages)/layout.tsx — no DB dependency at build time.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: 'Payload Cloud',
    template: '%s | Payload Cloud',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
    description: 'The Node & React TypeScript Headless CMS',
    title: 'Payload',
  },
  // TODO: Add cloud graphic
  openGraph: mergeOpenGraph(),
}

export default async (props) => {
  const { children } = props

  // Build-safe: no DB during `next build` → render on demand instead of failing the build.
  const { topBar } = await buildSafe('cloud.globals', fetchGlobals, {
    topBar: {} as Awaited<ReturnType<typeof fetchGlobals>>['topBar'],
    footer: {} as Awaited<ReturnType<typeof fetchGlobals>>['footer'],
    mainMenu: {} as Awaited<ReturnType<typeof fetchGlobals>>['mainMenu'],
  })

  return (
    <div className={classes.layout}>
      <CloudHeader topBar={topBar} />
      <div className={classes.container}>{children}</div>
      <CloudFooter />
    </div>
  )
}
