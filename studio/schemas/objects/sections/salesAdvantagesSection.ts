import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'salesAdvantagesSection',
  title: 'Sales Advantages Section',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'advantages',
      title: 'Advantages',
    },
    {
      name: 'cta',
      title: 'Call to Action',
    },
    {
      name: 'styles',
      title: 'Styles',
    }
  ],
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'styles',
      title: 'Section Styles',
      type: 'sectionStyles',
      group: 'styles',
      description: 'Customize the appearance of this section',
      initialValue: {
        theme: 'light',
        overflow: true
      }
    }),
    anchorField,
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'The text displayed in the badge above the title',
      group: 'content'
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title of the advantages section',
      validation: (Rule) => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'A brief description below the title',
      group: 'content'
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
      group: 'advantages'
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
      group: 'cta'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      enabled: 'enabled',
      styles: 'styles'
    },
    prepare({ title, subtitle, enabled, styles }) {
      return {
        title: title || 'Sales Advantages Section',
        subtitle: `${enabled ? '✓' : '✗'} | Theme: ${styles?.theme || 'default'}`,
        media: BlockElementIcon,
      }
    },
  },
})
