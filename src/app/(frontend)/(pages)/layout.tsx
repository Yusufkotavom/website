import { Footer } from '@components/Footer/index'
import { Header } from '@components/Header/index'
import { WhatsAppFloating } from '@components/WhatsAppFloating'
import { fetchGlobals } from '@data/index'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import React from 'react'

export const dynamic = 'force-static'

type WhatsAppTopBarFields = {
  enableWhatsappFloatingButton?: boolean | null
  whatsappMessage?: null | string
  whatsappNumber?: null | string
  whatsappPlacement?: 'both' | 'page' | 'post' | null
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { isEnabled: draft } = await draftMode()
  const getGlobals = draft
    ? fetchGlobals
    : unstable_cache(fetchGlobals, ['globals', 'mainMenu', 'footer'])

  const { footer, mainMenu, topBar } = await getGlobals()
  const whatsappConfig = topBar as WhatsAppTopBarFields

  return (
    <React.Fragment>
      <Header {...mainMenu} topBar={topBar} />
      <div>
        {children}
        <WhatsAppFloating
          enableWhatsappFloatingButton={whatsappConfig.enableWhatsappFloatingButton}
          whatsappMessage={whatsappConfig.whatsappMessage}
          whatsappNumber={whatsappConfig.whatsappNumber}
          whatsappPlacement={whatsappConfig.whatsappPlacement}
        />
        <div id="docsearch" />
        <Footer {...footer} />
      </div>
    </React.Fragment>
  )
}
