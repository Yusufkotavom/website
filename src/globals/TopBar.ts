import type { GlobalConfig } from 'payload'

import link from '@root/fields/link'
import { revalidatePath } from 'next/cache'

export const TopBar: GlobalConfig = {
  slug: 'topBar',
  fields: [
    {
      name: 'enableTopBar',
      type: 'checkbox',
      label: 'Enable Top Bar?',
    },
    {
      name: 'message',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.enableTopBar,
      },
      label: 'Message',
      required: true,
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          condition: (_, siblingData) => siblingData.enableTopBar,
        },
      },
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'enableWhatsappFloatingButton',
          type: 'checkbox',
          label: 'Enable WhatsApp Floating Button?',
        },
        {
          name: 'whatsappPlacement',
          type: 'select',
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData.enableWhatsappFloatingButton,
          },
          defaultValue: 'both',
          options: [
            {
              label: 'Page + Post',
              value: 'both',
            },
            {
              label: 'Page only',
              value: 'page',
            },
            {
              label: 'Post only',
              value: 'post',
            },
          ],
          required: true,
        },
      ],
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.enableWhatsappFloatingButton,
        description: 'Phone number with country code. Example: 6281234567890',
      },
      label: 'WhatsApp Number',
      required: true,
    },
    {
      name: 'whatsappMessage',
      type: 'textarea',
      admin: {
        condition: (_, siblingData) => siblingData.enableWhatsappFloatingButton,
        description:
          'Use {{lokasi}} for page URL and {{type}} for page/post info. Example: Halo, saya lihat {{type}} di {{lokasi}}',
      },
      label: 'WhatsApp Message',
      required: true,
    },
  ],
  hooks: {
    afterChange: [() => revalidatePath('/', 'layout')],
  },
}
