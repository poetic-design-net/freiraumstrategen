import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Section aktivieren',
      type: 'boolean',
      initialValue: true,
    }),
    anchorField,
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'faq'}]
        }
      ]
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Hintergrundbild',
      type: 'image',
      options: {
        hotspot: true
      }
    })
  ],
  preview: {
    select: {
      title: 'heading',
      enabled: 'enabled',
      id: 'id',
      media: 'backgroundImage'
    },
    prepare({title, enabled, id, media}) {
      return {
        title: title || 'FAQ Section',
        subtitle: `${enabled ? '✓' : '✗'} ${id ? `#${id}` : ''}`.trim(),
        media: media || BlockElementIcon
      }
    }
  }
})
