import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'string'
          },
          {
            name: 'anchor',
            title: 'Anker-Link (ohne #)',
            type: 'string',
            description: 'Z.B. "about" für #about'
          }
        ]
      }]
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call-to-Action Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'string',
          initialValue: 'Jetzt Buchen'
        },
        {
          name: 'url',
          title: 'URL',
          type: 'string'
        }
      ]
    })
  ]
})
