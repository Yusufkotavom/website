export const redirects = async () => {
  const staticRedirects = [
    {
      // /posts has no index page; send it to the first archive tab
      source: '/posts',
      destination: '/posts/news',
      permanent: false,
    },
    {
      source: '/blog',
      destination: '/posts',
      permanent: true,
    },
    // Legacy flat blog URLs (/blog/<slug>) move to the flat post permalink.
    // The category-qualified /posts/<category>/<slug> still works too.
    {
      source: '/blog/:slug',
      destination: '/posts/:slug',
      permanent: true,
    },
  ]

  return staticRedirects
}
