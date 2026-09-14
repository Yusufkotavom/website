import { Footer } from '@components/Footer/index'
import { Header } from '@components/Header/index'
import { fetchGlobals } from '@data/index'
import { buildSafe } from '@root/utilities/buildSafe'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import React from 'react'

// Rendered on demand rather than prerendered. `next build` would otherwise query
// Payload/Mongo for every page, and the build environment (Dokploy builder) cannot
// reach `payload-mongo` — a hard DB dependency at build time turns every redeploy
// into a failed build. Request-time rendering also means content edits show up
// without a rebuild.
export const dynamic = 'force-dynamic'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { isEnabled: draft } = await draftMode()
  const getGlobals = draft
    ? fetchGlobals
    : unstable_cache(fetchGlobals, ['globals', 'mainMenu', 'footer'])

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
