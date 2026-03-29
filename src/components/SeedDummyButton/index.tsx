'use client'

import { toast, useConfig } from '@payloadcms/ui'
import React, { useState } from 'react'

import './index.scss'

const baseClass = 'seed-dummy-button'

const SeedDummyButton: React.FC = () => {
  const [isSeeding, setIsSeeding] = useState(false)
  const {
    config: {
      routes: { api },
    },
  } = useConfig()

  const runSeed = async () => {
    setIsSeeding(true)

    const res = await fetch(`${api}/seed/dummy`, {
      method: 'POST',
    })

    if (res.ok) {
      toast.success('Dummy seed selesai dijalankan')
      setIsSeeding(false)
      return
    }

    const data = await res.json()
    toast.error(`Seed gagal: ${data?.message || 'unknown error'}`)
    setIsSeeding(false)
  }

  return (
    <button className={baseClass} disabled={isSeeding} onClick={runSeed} type="button">
      {isSeeding ? 'Seeding...' : 'Seed Dummy Data'}
    </button>
  )
}

export default SeedDummyButton
