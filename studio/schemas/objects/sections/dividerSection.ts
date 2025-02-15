import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'dividerSection',
  title: 'Divider Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headlineGreen',
      title: 'Grüne Überschrift',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'headlineWhite',
      title: 'Weiße Überschrift',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'enabled',
      title: 'Aktiviert',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      headlineGreen: 'headlineGreen',
      headlineWhite: 'headlineWhite',
      enabled: 'enabled'
    },
    prepare({ headlineGreen, headlineWhite, enabled }) {
      return {
        title: 'Divider Section',
        subtitle: `${headlineGreen} - ${headlineWhite} ${enabled ? '(Aktiviert)' : '(Deaktiviert)'}`
      }
    }
  }
})