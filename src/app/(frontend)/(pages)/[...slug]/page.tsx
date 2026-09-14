import { buildSafe } from '@root/utilities/buildSafe'
import type { Media } from '@root/payload-types'
import type { Metadata } from 'next'

import { Hero } from '@components/Hero/index'
import { JsonLd } from '@components/SEO/JsonLd'
import { PayloadRedirects } from '@components/PayloadRedirects'
import { RefreshRouteOnSave } from '@components/RefreshRouterOnSave'
import { RenderBlocks } from '@components/RenderBlocks/index'
import { fetchPage, fetchPages } from '@data'
import { mergeOpenGraph } from '@root/seo/mergeOpenGraph'
import { breadcrumbSchema } from '@root/seo/schema'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import React from 'react'

const getPage = async (slug, draft?) =>
  draft
    ? fetchPage(slug)
    : unstable_cache(fetchPage, [`page-${slug}`], { revalidate: 300 })(slug)

const Page = async ({
  params,
}: {
  params: Promise<{
    slug: any
  }>
}) => {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const url = '/' + (Array.isArray(slug) ? slug.join('/') : slug)

  const page = await getPage(slug, draft)

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  return (
    <React.Fragment>
      <PayloadRedirects disableNotFound url={url} />
      <RefreshRouteOnSave />
      <JsonLd
        schema={breadcrumbSchema(
          (page.breadcrumbs || []).map((b) => ({
            name: (b.label as string) || 'Halaman',
            url: b.url as string,
          })),
        )}
      />
      <Hero firstContentBlock={page.layout[0]} page={page} />
      <RenderBlocks blocks={page.layout} hero={page.hero} />
    </React.Fragment>
  )
}

export default Page

export async function generateStaticParams() {
  // Build-safe: no DB at build time → prerender nothing, render on demand.
  return buildSafe('pages.params', async () => {
  const getPages = unstable_cache(fetchPages, ['pages'])
  const pages = await getPages()

  return pages.map(({ breadcrumbs }) => ({
    slug: breadcrumbs?.[breadcrumbs.length - 1]?.url?.replace(/^\/|\/$/g, '').split('/'),
  }))
  }, [])
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: any
  }>
}): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const page = await getPage(slug, draft)

  let ogImage: Media | null = null

  if (page && page.meta?.image && typeof page.meta.image !== 'string') {
    ogImage = page.meta.image
  }

  // check if noIndex is true
  const noIndexMeta = page?.noindex ? { robots: { index: false, follow: false } } : {}

  const canonical = '/' + (Array.isArray(slug) ? slug.join('/') : slug || '')

  return {
    alternates: { canonical },
    description: page?.meta?.description ?? undefined,
    openGraph: mergeOpenGraph({
      description: page?.meta?.description ?? undefined,
      images: ogImage
        ? [
            {
              url: ogImage.url as string,
            },
          ]
        : undefined,
      title: page?.meta?.title || page?.title || undefined,
      url: canonical,
    }),
    title: page?.meta?.title || page?.title || undefined,
    twitter: { card: 'summary_large_image' },
    ...noIndexMeta,
  }
}
