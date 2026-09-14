import type { Metadata } from 'next'

import { buildSafe } from '@root/utilities/buildSafe'
import { PayloadRedirects } from '@components/PayloadRedirects/index'
import { RefreshRouteOnSave } from '@components/RefreshRouterOnSave/index'
import { fetchCaseStudies, fetchCaseStudy } from '@data'
import { mergeOpenGraph } from '@root/seo/mergeOpenGraph'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import { CaseStudy } from './client_page'

// Rendered on demand; the case-study query is cached at the data layer (ISR) so the
// page is served from cache between admin edits. Keep it build-safe: generateStaticParams
// is wrapped in buildSafe so prerendering never hard-depends on the DB.

const getCaseStudy = (slug, draft) =>
  draft
    ? fetchCaseStudy(slug)
    : unstable_cache(fetchCaseStudy, [`case-study-${slug}`], { revalidate: 300 })(slug)

const CaseStudyBySlug = async ({ params }) => {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params

  const url = `/case-studies/${slug}`

  const caseStudy = await getCaseStudy(slug, draft)

  if (!caseStudy) {
    return <PayloadRedirects url={url} />
  }

  return (
    <>
      <PayloadRedirects disableNotFound url={url} />
      <RefreshRouteOnSave />
      <CaseStudy {...caseStudy} />
    </>
  )
}

export default CaseStudyBySlug

export async function generateStaticParams() {
  // Build-safe: no DB at build time → prerender nothing, render on demand.
  return buildSafe('caseStudies.params', async () => {
  const getCaseStudies = unstable_cache(fetchCaseStudies, ['caseStudies'])
  const caseStudies = await getCaseStudies()

  return caseStudies.map(({ slug }) => ({
    slug,
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
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const page = await getCaseStudy(slug, draft)

  const ogImage =
    typeof page?.meta?.image === 'object' &&
    page?.meta?.image !== null &&
    'url' in page?.meta?.image &&
    `${process.env.NEXT_PUBLIC_CMS_URL}${page.meta.image.url}`

  return {
    description: page?.meta?.description,
    openGraph: mergeOpenGraph({
      description: page?.meta?.description ?? undefined,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: page?.meta?.title ?? undefined,
      url: `/case-studies/${slug}`,
    }),
    title: page?.meta?.title,
  }
}
