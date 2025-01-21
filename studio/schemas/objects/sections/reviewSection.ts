import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export default defineType({
  name: 'reviewSection',
  title: 'Review Section',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'settings',
      title: 'Einstellungen',
    }
  ],
  fields: [
    defineField({
      name: 'enabled',
      title: 'Section aktivieren',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Bewertungen'
        },
        {
          name: 'heading',
          title: 'Überschrift',
          type: 'object',
          fields: [
            {
              name: 'regular',
              title: 'Regular',
              type: 'string',
              initialValue: 'Was sagen unsere'
            },
            {
              name: 'thin',
              title: 'Thin',
              type: 'string',
              initialValue: 'Kunden'
            }
          ]
        },
        {
          name: 'subtitle',
          title: 'Untertitel',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'googlePlaces',
      title: 'Google Places',
      type: 'object',
      group: 'settings',
      fields: [
        {
          name: 'placeId',
          title: 'Google Place ID',
          type: 'string',
          description: 'Die Place ID deines Google My Business Eintrags'
        },
        {
          name: 'maxReviews',
          title: 'Maximale Anzahl Reviews',
          type: 'number',
          initialValue: 12
        }
      ],
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'header.heading.regular',
      subtitle: 'header.badge',
      enabled: 'enabled'
    },
    prepare({title, subtitle, enabled}) {
      return {
        title: title || 'Review Section',
        subtitle: `${enabled ? '✓' : '✗'} ${subtitle || ''}`.trim()
      }
    }
  }
})
