import type { Metadata } from 'next'
import React from 'react'

import KotacomHome from '@components/KotacomHome'
import { ForceDarkTheme } from '@components/KotacomHome/ForceDarkTheme'
import { mergeOpenGraph } from '@root/seo/mergeOpenGraph'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: 'Kotacom — Solusi IT, Website, Software & Percetakan Surabaya',
  description:
    'Kotacom adalah mitra IT & percetakan terpercaya sejak 2008: pembuatan website, software development, IT support, hingga cetak buku, brosur, dan kemasan untuk bisnis Anda.',
  openGraph: mergeOpenGraph({ url: '/' }),
}

export default function HomePage() {
  return (
    <>
      <ForceDarkTheme />
      <KotacomHome />
    </>
  )
}
