import type { Metadata } from 'next'

import { buildSafe } from '@root/utilities/buildSafe'
import BreadcrumbsBar from '@components/Hero/BreadcrumbsBar/index'
import { PayloadRedirects } from '@components/PayloadRedirects/index'
import { Post } from '@components/Post/index'
import { RefreshRouteOnSave } from '@components/RefreshRouterOnSave/index'
import { fetchBlogPost, fetchPosts } from '@data'
import { mergeOpenGraph } from '@root/seo/mergeOpenGraph'
import { articleSchema, breadcrumbSchema } from '@root/seo/schema'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import React from 'react'

import { JsonLd } from '@components/SEO/JsonLd'

const getPost = async (slug, category, draft?) =>
  draft
    ? await fetchBlogPost(slug, category)
    : await unstable_cache(fetchBlogPost, ['blogPost', `post-${slug}`], { revalidate: 300 })(slug, category)

const PostPage = async ({
  params,
}: {
  params: Promise<{
    category: string
    slug: any
  }>
}) => {
  const { isEnabled: draft } = await draftMode()
  const { slug, category } = await params

  const blogPost = await getPost(slug, category, draft)

  const url = `/${category}/${slug}`

  if (!blogPost) {
    return <PayloadRedirects url={url} />
  }

  return (
    <>
      <PayloadRedirects disableNotFound url={url} />
      <RefreshRouteOnSave />
      <BreadcrumbsBar breadcrumbs={[]} hero={{ type: 'default' }} />
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: 'Beranda', url: '/' },
            { name: 'Artikel', url: '/posts' },
            { name: blogPost.title || slug, url: `/posts/${slug}` },
          ]),
          articleSchema({
            title: blogPost.title,
            slug,
            publishedOn: blogPost.publishedOn,
            updatedAt: blogPost.updatedAt,
            excerpt: blogPost.meta?.description,
            image: (blogPost.image || blogPost.meta?.image) as never,
          }),
        ]}
      />
      <Post {...blogPost} />
    </>
  )
}

export default PostPage

export async function generateStaticParams() {
  // Build-safe: no DB at build time → prerender nothing, render on demand.
  return buildSafe('post.params', async () => {
  const getPosts = unstable_cache(fetchPosts, ['allPosts'])
  const posts = await getPosts()

  return posts
    .map(({ slug, category }) => {
      if (!category || typeof category === 'string' || !category.slug) {
        return null
      }

      return {
        slug,
        category: category.slug,
      }
    })
    .filter(Boolean)
  }, [])
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    category: string
    slug: string
  }>
}): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const { slug, category } = await params
  const post = await getPost(slug, category, draft)

  let ogImage: null | string = null

  if (post) {
    if (post?.meta?.image && typeof post.meta.image !== 'string' && post.meta.image?.url) {
      ogImage = post.meta.image.url
    } else if (
      post.featuredMedia === 'upload' &&
      post.image &&
      typeof post.image !== 'string' &&
      post.image?.url
    ) {
      ogImage = post.image.url
    } else if (post.featuredMedia === 'videoUrl' && post.videoUrl) {
      ogImage = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?type=${category}&title=${post.title}`
    }
  }

  return {
    alternates: { canonical: `/posts/${slug}` },
    description: post?.meta?.description ?? undefined,
    openGraph: mergeOpenGraph({
      description: post?.meta?.description ?? undefined,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: post?.meta?.title ?? undefined,
      url: `/posts/${slug}`,
    }),
    title: post?.meta?.title ?? post?.title ?? undefined,
    twitter: { card: 'summary_large_image' },
  }
}
