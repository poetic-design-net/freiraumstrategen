import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export default defineType({
  name: 'salesAdvantagesSection',
  title: 'Sales Advantages Section',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'The text displayed in the badge above the title',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title of the advantages section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'A brief description below the title',
    }),
    defineField({
      name: 'advantages',
      title: 'Advantages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'shortText',
              title: 'Short Description',
              type: 'text',
              description: 'Brief description shown initially',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'fullText',
              title: 'Full Description',
              type: 'text',
              description: 'Detailed description shown when expanded',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      enabled: 'enabled',
    },
    prepare({ title, subtitle, enabled }) {
      return {
        title: title || 'Sales Advantages Section',
        subtitle: `${enabled ? '✓' : '✗'} ${subtitle || 'No subtitle set'}`,
        media: BlockElementIcon,
      }
    },
  },
})
