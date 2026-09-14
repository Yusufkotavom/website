import { Footer } from '@components/Footer/index'
import { Header } from '@components/Header/index'
import { fetchGlobals } from '@data/index'
import { buildSafe } from '@root/utilities/buildSafe'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import React from 'react'

// Rendered on demand; the DB result of every Payload query is what gets cached.
//
// `next build` must not depend on the database: the Dokploy builder runs outside
// `dokploy-network` and cannot reach `payload-mongo`, so prerendering DB-backed pages
// at build time fails the build. Routes therefore stay dynamic, and caching happens at
// the *data* layer instead — each loader is wrapped in `unstable_cache({ revalidate })`
// (see the pages below), which gives ISR behaviour (cached HTML served, background
// regeneration, instant invalidation on admin edits via revalidatePath/revalidateTag)
// without ever querying Mongo during the build.
export const dynamic = 'force-dynamic'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { isEnabled: draft } = await draftMode()
  const getGlobals = draft
    ? fetchGlobals
    : unstable_cache(fetchGlobals, ['globals', 'mainMenu', 'footer'], { revalidate: 300 })

  // Build-safe: during `next build` the DB may be unreachable (the Dokploy builder
  // cannot join dokploy-network). Fall back to empty globals so the build completes;
  // at runtime a real DB error still throws.
  const { footer, mainMenu, topBar } = await buildSafe('globals', getGlobals, {
    footer: {} as Awaited<ReturnType<typeof fetchGlobals>>['footer'],
    mainMenu: {} as Awaited<ReturnType<typeof fetchGlobals>>['mainMenu'],
    topBar: {} as Awaited<ReturnType<typeof fetchGlobals>>['topBar'],
  })

  return (
    <React.Fragment>
      <Header {...mainMenu} topBar={topBar} />
      <div>
        {children}
        <div id="docsearch" />
        <Footer {...footer} />
      </div>
    </React.Fragment>
  )
}
