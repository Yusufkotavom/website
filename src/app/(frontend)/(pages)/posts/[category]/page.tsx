import type { Metadata } from 'next'

import { Archive } from '@components/Archive'
import { Post } from '@components/Post/index'
import { fetchArchive, fetchArchives, fetchPostBySlug, fetchPosts } from '@data'
import { buildSafe } from '@root/utilities/buildSafe'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

/**
 * One route serves two shapes, because both live under /posts:
 *   /posts/<category>        -> category archive
 *   /posts/<slug>            -> a single post (flat permalink)
 *
 * The flat form is what the admin preview builds (see formatPagePath), so a
 * post stays reachable even when its category slug changes.
 *
 * The canonical, category-qualified URL (/posts/<category>/<slug>) is handled
 * by the sibling [category]/[slug] route and still wins for that shape.
 */
export default async ({
  params,
}: {
  params: Promise<{
    category: string
  }>
}) => {
  const { category } = await params
  const { isEnabled: draft } = await draftMode()

  // 1. try it as a category archive
  const archive = draft
    ? await fetchArchive(category, draft)
    : await unstable_cache(fetchArchive, [`${category}-archive`])(category, draft)

  if (archive?.posts?.docs) {
    return <Archive category={category} />
  }

  // 2. otherwise treat the segment as a post slug
  const post = draft
    ? await fetchPostBySlug(category)
    : await unstable_cache(fetchPostBySlug, [`post-${category}`])(category)

  if (!post) {
    notFound()
  }

  return <Post {...post} />
}

export const generateStaticParams = async () => {
  // Build-safe: with no DB at build time prerender nothing; pages render on demand.
  return buildSafe('posts.params', async () => {
    const [archives, posts] = await Promise.all([fetchArchives(), fetchPosts()])

    return [
      ...archives.map((archive) => ({ category: archive.slug })),
      ...posts
        .map((post) => (post?.slug ? { category: post.slug } : null))
        .filter((entry): entry is { category: string } => entry !== null),
    ]
  }, [] as { category: string }[])
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> => {
  const { category } = await params

  const archive = await fetchArchive(category)

  if (archive) {
    const { name, description } = archive

    return {
      description,
      title: `${name} | Payload`,
    }
  }

  const post = await fetchPostBySlug(category)

  if (post) {
    return {
      description: post?.meta?.description,
      title: post?.meta?.title ?? post?.title ?? undefined,
    }
  }

  return {}
}
