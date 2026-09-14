import { Footer } from '@components/Footer/index'
import { Header } from '@components/Header/index'
import { JsonLd } from '@components/SEO/JsonLd'
import { WhatsAppLauncher } from '@components/WhatsAppLauncher/index'
import { fetchGlobals } from '@data/index'
import { WhatsAppProvider } from '@providers/WhatsApp/index'
import { buildSafe } from '@root/utilities/buildSafe'
import type { WaSettings } from '@root/utilities/whatsapp'
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from '@root/seo/schema'
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
  const { footer, mainMenu, topBar, siteSettings, whatsapp } = await buildSafe(
    'globals',
    getGlobals,
    {
      footer: {} as Awaited<ReturnType<typeof fetchGlobals>>['footer'],
      mainMenu: {} as Awaited<ReturnType<typeof fetchGlobals>>['mainMenu'],
      topBar: {} as Awaited<ReturnType<typeof fetchGlobals>>['topBar'],
      siteSettings: {} as Awaited<ReturnType<typeof fetchGlobals>>['siteSettings'],
      whatsapp: {} as Awaited<ReturnType<typeof fetchGlobals>>['whatsapp'],
    },
  )

  // The WhatsApp number is the single source of truth in `site-settings`; the
  // messaging/tracking config lives in `whatsapp-marketing`. Merge them into the
  // one settings object every CTA consumes.
  const waSettings: WaSettings = {
    ...(whatsapp as WaSettings),
    businessName: siteSettings?.businessName || 'Kotacom',
    whatsappNumber: siteSettings?.whatsappNumber || undefined,
  }

  return (
    <WhatsAppProvider business={siteSettings?.businessName || 'Kotacom'} settings={waSettings}>
      <JsonLd
        schema={[
          organizationSchema(siteSettings),
          websiteSchema(siteSettings),
          localBusinessSchema(siteSettings),
        ]}
      />
      <Header {...mainMenu} topBar={topBar} />
      <div>
        {children}
        <div id="docsearch" />
        <Footer {...footer} />
      </div>
      <WhatsAppLauncher
        business={siteSettings?.businessName || 'Kotacom'}
        settings={waSettings}
      />
    </WhatsAppProvider>
  )
}
