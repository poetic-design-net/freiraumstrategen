import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'contactHeroSection',
  title: 'Contact Hero Section',
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
      type: 'object',
      fields: [
        {
          name: 'highlighted',
          title: 'Hervorgehobener Text',
          type: 'string'
        },
        {
          name: 'regular',
          title: 'Normaler Text',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text'
    }),
    defineField({
      name: 'image',
      title: 'Hero Bild',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'contactInfo',
      title: 'Kontakt Informationen',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'E-Mail',
          type: 'string'
        },
        {
          name: 'phone',
          title: 'Telefon',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Adresse',
          type: 'text'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'heading.highlighted',
      subtitle: 'heading.regular',
      enabled: 'enabled',
      id: 'id',
      media: 'image'
    },
    prepare({title, subtitle, enabled, id, media}) {
      return {
        title: title || 'Contact Hero Section',
        subtitle: `${enabled ? '✓' : '✗'} ${id ? `#${id}` : ''} ${subtitle || ''}`.trim(),
        media: media || BlockElementIcon
      }
    }
  }
})
