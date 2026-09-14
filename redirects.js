import { formatPermalink } from './src/utilities/formatPermalink.js'

export const redirects = async () => {
  const staticRedirects = [
    {
      source: '/docs',
      destination: '/docs/getting-started/what-is-payload',
      permanent: true,
    },
    {
      source: '/docs/beta',
      destination: '/docs/beta/getting-started/what-is-payload',
      permanent: false,
    },
    {
      source: '/docs/v2',
      destination: '/docs/v2/getting-started/what-is-payload',
      permanent: true,
    },
    {
      // /posts has no index page; send it to the first archive tab
      source: '/posts',
      destination: '/posts/news',
      permanent: false,
    },
    {
      source: '/roadmap',
      destination: 'https://github.com/payloadcms/payload/discussions/categories/roadmap',
      permanent: true,
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

  const internetExplorerRedirect = {
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    destination: '/ie-incompatible.html',
  }

  const redirects = [...staticRedirects, internetExplorerRedirect]

  return redirects
}
