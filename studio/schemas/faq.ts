import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'question',
      title: 'Frage',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Antwort',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Zusätzliche Informationen',
      type: 'text',
      description: 'Optionale zusätzliche Informationen zur Antwort',
    }),
    defineField({
      name: 'isExpanded',
      title: 'Standardmäßig geöffnet',
      type: 'boolean',
      description: 'Wenn aktiviert, wird diese FAQ standardmäßig geöffnet angezeigt',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'question',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Unbenannte FAQ',
        subtitle: subtitle,
      }
    },
  },
})
