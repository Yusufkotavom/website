import config from '@payload-config'
/* eslint-disable no-console */
import { getPayload } from 'payload'

type ID = number | string

type MaybeDoc = { id: ID } | null

const lexicalParagraph = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

async function findOneByField(
  payload,
  collection: string,
  field: string,
  value: unknown,
): Promise<MaybeDoc> {
  const result = await payload.find({
    collection,
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      [field]: {
        equals: value,
      },
    },
  })

  return result.docs[0] || null
}

async function ensureFilter(payload, collection: string, name: string, value: string): Promise<ID> {
  const existing = await findOneByField(payload, collection, 'value', value)

  if (existing) {
    return existing.id
  }

  const created = await payload.create({
    collection,
    data: {
      name,
      value,
    },
    overrideAccess: true,
  })

  return created.id
}

const canPersistUploads = Boolean(
  process.env.BLOB_STORAGE_ENABLED &&
    process.env.BLOB_READ_WRITE_TOKEN &&
    process.env.BLOB_STORE_ID,
)

async function ensureAdminUser(payload): Promise<ID> {
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
  const existing = await findOneByField(payload, 'users', 'email', email)

  if (existing) {
    return existing.id
  }

  const created = await payload.create({
    collection: 'users',
    data: {
      email,
      firstName: 'Seed',
      lastName: 'Admin',
      password: process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!@#',
      roles: ['admin'],
    },
    overrideAccess: true,
  })

  console.log(`Created admin user: ${email}`)
  return created.id
}

async function ensureCategory(payload): Promise<ID> {
  const slug = 'general'
  const existing = await findOneByField(payload, 'categories', 'slug', slug)

  if (existing) {
    return existing.id
  }

  const created = await payload.create({
    collection: 'categories',
    data: {
      name: 'General',
      slug,
      description: 'General category created by seed script.',
      headline: 'General Updates',
    },
    overrideAccess: true,
  })

  return created.id
}

async function ensureReusableContent(payload): Promise<ID> {
  const title = 'Seed Reusable Content'
  const existing = await findOneByField(payload, 'reusable-content', 'title', title)

  if (existing) {
    return existing.id
  }

  const created = await payload.create({
    collection: 'reusable-content',
    data: {
      layout: [],
      title,
    },
    overrideAccess: true,
  })

  return created.id
}

async function ensureHomePage(payload) {
  const slug = 'home'
  const existing = await findOneByField(payload, 'pages', 'slug', slug)

  if (existing) {
    return existing.id
  }

  const created = await payload.create({
    collection: 'pages',
    data: {
      slug,
      _status: 'published',
      hero: {
        type: 'default',
        richText: lexicalParagraph('Welcome to your seeded Payload website.'),
      },
      layout: [],
      title: 'Home',
    },
    draft: false,
    overrideAccess: true,
  })

  return created.id
}

async function ensureDocs(payload): Promise<ID> {
  const slug = 'seed-doc'
  const existing = await findOneByField(payload, 'docs', 'slug', slug)

  if (existing) {
    return existing.id
  }

  const created = await payload.create({
    collection: 'docs',
    data: {
      slug,
      _status: 'published',
      content: lexicalParagraph('This is a seeded docs entry.'),
      title: 'Seed Documentation',
      topic: 'getting-started',
      topicGroup: 'Getting Started',
      version: 'v3',
    },
    draft: false,
    overrideAccess: true,
  })

  return created.id
}

async function ensureCommunityHelp(payload, relatedDocID: ID): Promise<ID> {
  const nowISO = new Date().toISOString()
  const slug = 'seed-community-help'
  const existing = await findOneByField(payload, 'community-help', 'slug', slug)

  if (existing) {
    return existing.id
  }

  const created = await payload.create({
    collection: 'community-help',
    data: {
      slug,
      communityHelpJSON: {
        body: 'Seed body',
      },
      communityHelpType: 'github',
      githubID: `seed-${Date.now()}`,
      helpful: true,
      relatedDocs: [relatedDocID],
      threadCreatedAt: nowISO,
      title: 'Seed Community Help Thread',
    },
    overrideAccess: true,
  })

  return created.id
}

async function ensureCaseStudy(payload, mediaID: ID, partnerID?: ID): Promise<ID> {
  const slug = 'seed-case-study'
  const existing = await findOneByField(payload, 'case-studies', 'slug', slug)

  if (existing) {
    return existing.id
  }

  const created = await payload.create({
    collection: 'case-studies',
    data: {
      slug,
      featuredImage: mediaID,
      introContent: lexicalParagraph('Seed case study intro.'),
      layout: [],
      title: 'Seed Case Study',
      url: 'https://example.com/case-study',
      ...(partnerID ? { partner: partnerID } : {}),
      _status: 'published',
    },
    draft: false,
    overrideAccess: true,
  })

  return created.id
}

async function removeBySlug(payload, collection: string, slug: string): Promise<void> {
  const existing = await findOneByField(payload, collection, 'slug', slug)

  if (existing) {
    await payload.delete({
      id: existing.id,
      collection,
      overrideAccess: true,
    })
  }
}

async function cleanupUploadDependentSeedDocs(payload): Promise<void> {
  await removeBySlug(payload, 'case-studies', 'seed-case-study')
  await removeBySlug(payload, 'partners', 'seed-partner')

  const seedMedia = await findOneByField(payload, 'media', 'alt', 'Seed placeholder image')
  if (seedMedia) {
    await payload.delete({
      id: seedMedia.id,
      collection: 'media',
      overrideAccess: true,
    })
  }
}

async function ensurePartner(
  payload,
  params: {
    budgets: ID[]
    caseStudyID: ID
    industries: ID[]
    mediaID: ID
    regions: ID[]
    specialties: ID[]
  },
): Promise<ID> {
  const { budgets, caseStudyID, industries, mediaID, regions, specialties } = params

  const slug = 'seed-partner'
  const existing = await findOneByField(payload, 'partners', 'slug', slug)

  if (existing) {
    return existing.id
  }

  const created = await payload.create({
    collection: 'partners',
    data: {
      name: 'Seed Partner Agency',
      slug,
      budgets,
      city: 'San Francisco',
      content: {
        bannerImage: mediaID,
        caseStudy: caseStudyID,
        idealProject: lexicalParagraph('Seed ideal projects.'),
        overview: lexicalParagraph('Seed partner overview.'),
        services: lexicalParagraph('Seed partner services.'),
      },
      email: 'partners@example.com',
      industries,
      logo: mediaID,
      regions,
      specialties,
      website: 'https://example.com',
    },
    overrideAccess: true,
  })

  return created.id
}

async function ensurePost(payload, params: { authorID: ID; categoryID: ID }): Promise<ID> {
  const nowISO = new Date().toISOString()
  const { authorID, categoryID } = params

  const slug = 'seed-post'
  const existing = await findOneByField(payload, 'posts', 'slug', slug)

  if (existing) {
    return existing.id
  }

  const created = await payload.create({
    collection: 'posts',
    data: {
      slug,
      _status: 'published',
      authors: [authorID],
      authorType: 'team',
      category: categoryID,
      content: [],
      dynamicThumbnail: true,
      featuredMedia: 'videoUrl',
      publishedOn: nowISO,
      title: 'Seed Post',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    draft: false,
    overrideAccess: true,
  })

  return created.id
}

export async function seedDummy() {
  const payload = await getPayload({ config })

  console.log('Starting dummy seed...')

  const specialties = [
    await ensureFilter(payload, 'specialties', 'Full-stack Development', 'full-stack-development'),
  ]
  const industries = [await ensureFilter(payload, 'industries', 'SaaS', 'saas')]
  const regions = [await ensureFilter(payload, 'regions', 'North America', 'north-america')]
  const budgets = [await ensureFilter(payload, 'budgets', '$10k - $50k', '10k-50k')]

  const adminID = await ensureAdminUser(payload)
  const categoryID = await ensureCategory(payload)
  await ensurePost(payload, { authorID: adminID, categoryID })
  await ensureReusableContent(payload)
  const docID = await ensureDocs(payload)
  await ensureCommunityHelp(payload, docID)
  await ensureHomePage(payload)

  if (canPersistUploads) {
    const existingSeedMedia = await findOneByField(
      payload,
      'media',
      'alt',
      'Seed placeholder image',
    )
    const mediaID = existingSeedMedia
      ? existingSeedMedia.id
      : (
          await payload.create({
            collection: 'media',
            data: {
              alt: 'Seed placeholder image',
            },
            file: {
              name: 'seed-placeholder.png',
              data: Buffer.from(
                'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO7+N8EAAAAASUVORK5CYII=',
                'base64',
              ),
              mimetype: 'image/png',
              size: 68,
            },
            overrideAccess: true,
          })
        ).id

    const caseStudyID = await ensureCaseStudy(payload, mediaID)
    const partnerID = await ensurePartner(payload, {
      budgets,
      caseStudyID,
      industries,
      mediaID,
      regions,
      specialties,
    })

    await ensureCaseStudy(payload, mediaID, partnerID)
  } else {
    await cleanupUploadDependentSeedDocs(payload)
    console.log('Skipping upload-dependent seed docs because blob storage is not configured.')
  }

  console.log('Dummy seed complete ✅')
}

if (process.argv.some((arg) => arg.includes('seedDummy.ts'))) {
  seedDummy().catch((error) => {
    console.error('Dummy seed failed', error)
    process.exitCode = 1
  })
}
