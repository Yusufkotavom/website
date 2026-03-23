'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

import classes from './index.module.scss'

type Props = {
  enableWhatsappFloatingButton?: boolean | null
  whatsappMessage?: null | string
  whatsappNumber?: null | string
  whatsappPlacement?: 'both' | 'page' | 'post' | null
}

const normalizePhoneNumber = (value: string): string => value.replace(/[^\d]/g, '')

export const WhatsAppFloating: React.FC<Props> = ({
  enableWhatsappFloatingButton,
  whatsappMessage,
  whatsappNumber,
  whatsappPlacement,
}) => {
  const pathname = usePathname()

  if (!enableWhatsappFloatingButton || !whatsappMessage || !whatsappNumber) {
    return null
  }

  const isPost = pathname.startsWith('/posts/')
  const currentPageType = isPost ? 'post' : 'page'

  if (whatsappPlacement === 'post' && !isPost) {
    return null
  }

  if (whatsappPlacement === 'page' && isPost) {
    return null
  }

  const formattedMessage = whatsappMessage
    .replaceAll('{{lokasi}}', pathname)
    .replaceAll('{{type}}', currentPageType)

  const whatsappURL = `https://wa.me/${normalizePhoneNumber(whatsappNumber)}?text=${encodeURIComponent(formattedMessage)}`

  return (
    <a
      aria-label="Chat via WhatsApp"
      className={classes.floatingButton}
      href={whatsappURL}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className={classes.icon}>🟢</span>
      <span className={classes.label}>WhatsApp</span>
    </a>
  )
}
