import { findDuplicate } from './dedupe'
import type { ExistingDoc, GeneratedDraft, QaIssue, QaResult } from './types'

const TITLE = { max: 70, min: 30 }
const DESC = { max: 170, min: 110 }
const SLUG_WARN = 80
const SLUG_BLOCK = 96
const MIN_BLOCKS = 5

const highest = (issues: QaIssue[]): QaResult['severity'] => {
  if (issues.some((issue) => issue.severity === 'blocked')) return 'blocked'
  if (issues.some((issue) => issue.severity === 'warning')) return 'warning'
  return 'ready'
}

const blocksOf = (draft: GeneratedDraft): Record<string, unknown>[] =>
  draft.entityType === 'post' ? draft.content : draft.layout

/** AI-not-run guard: in generate mode every aiContent block must be filled. */
const hasEmptyAiBlock = (draft: GeneratedDraft): boolean =>
  blocksOf(draft).some((block) => {
    if (block?.blockType !== 'aiContent') return false
    const fields = (block.aiFields ?? {}) as Record<string, unknown>
    return !fields.generatedText
  })

export const assessDraft = (input: {
  draft: GeneratedDraft
  existing: ExistingDoc[]
}): QaResult => {
  const { draft, existing } = input
  const issues: QaIssue[] = []

  const duplicate = findDuplicate({
    existing,
    keywordKey: draft.keywordKey,
    programId: draft.generator.programId,
    rowKey: draft.rowKey,
    slug: draft.slug,
  })
  if (duplicate) {
    issues.push({
      code: `duplicate-${duplicate.reason}`,
      message: `Duplikat ${duplicate.reason} terhadap ${duplicate.existing.id}.`,
      severity: 'blocked',
    })
  }

  if (!draft.title) {
    issues.push({ code: 'missing-h1', message: 'Judul/H1 kosong.', severity: 'blocked' })
  }

  const seoTitle = (draft.meta.title ?? '').trim()
  if (!seoTitle) {
    issues.push({ code: 'missing-seo-title', message: 'SEO title kosong.', severity: 'blocked' })
  } else if (seoTitle.length < TITLE.min || seoTitle.length > TITLE.max) {
    issues.push({
      code: 'seo-title-length',
      message: `Panjang SEO title ${seoTitle.length} (target ${TITLE.min}-${TITLE.max}).`,
      severity: 'warning',
    })
  }

  const seoDesc = (draft.meta.description ?? '').trim()
  if (!seoDesc) {
    issues.push({
      code: 'missing-seo-description',
      message: 'Deskripsi SEO kosong.',
      severity: 'blocked',
    })
  } else if (seoDesc.length < DESC.min || seoDesc.length > DESC.max) {
    issues.push({
      code: 'seo-description-length',
      message: `Panjang deskripsi ${seoDesc.length} (target ${DESC.min}-${DESC.max}).`,
      severity: 'warning',
    })
  }

  if (draft.slug.length >= SLUG_BLOCK) {
    issues.push({ code: 'slug-too-long', message: 'Slug ≥ 96.', severity: 'blocked' })
  } else if (draft.slug.length >= SLUG_WARN) {
    issues.push({ code: 'slug-near-limit', message: 'Slug ≥ 80.', severity: 'warning' })
  }

  const blocks = blocksOf(draft)
  if (blocks.length < MIN_BLOCKS) {
    issues.push({
      code: 'too-few-blocks',
      message: `Hanya ${blocks.length} blok.`,
      severity: 'warning',
    })
  }

  if (draft.generator.aiUsed && hasEmptyAiBlock(draft)) {
    issues.push({
      code: 'ai-empty',
      message: 'Ada blok aiContent yang kosong setelah generate AI.',
      severity: 'blocked',
    })
  }

  return { issues, severity: highest(issues) }
}
