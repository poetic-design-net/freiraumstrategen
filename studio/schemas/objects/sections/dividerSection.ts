import { defineType, defineField } from 'sanity'
import { anchorField } from '../../utils/anchorField'

export default defineType({
  name: 'dividerSection',
  title: 'Divider Section',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Aktiviert',
      type: 'boolean',
      initialValue: true
    }),
    anchorField,
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
    })
  ],
  preview: {
    select: {
      headlineGreen: 'headlineGreen',
      headlineWhite: 'headlineWhite',
      enabled: 'enabled',
      id: 'id'
    },
    prepare({ headlineGreen, headlineWhite, enabled, id }) {
      return {
        title: 'Divider Section',
        subtitle: `${id ? `[${id}] ` : ''}${headlineGreen} - ${headlineWhite} ${enabled ? '(Aktiviert)' : '(Deaktiviert)'}`
      }
    }
  }
})