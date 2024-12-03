import { defineField, defineType, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'salesContentSection',
  title: 'Sales Content Section',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Section',
      type: 'boolean',
      initialValue: true,
    }),
    anchorField,
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
      description: 'The main title of the content section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'The subtitle that follows the title',
    }),
    defineField({
      name: 'leftColumnContent',
      title: 'Left Column Content',
      description: 'Rich text content for the left column with formatting options',
      type: 'blockContent'
    }),
    defineField({
      name: 'rightColumnContent',
      title: 'Right Column Content',
      description: 'Rich text content for the right column with formatting options',
      type: 'blockContent'
    }),
    defineField({
      name: 'image',
      title: 'Content Image',
      type: 'image',
      description: 'The image to display in the content box',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for accessibility and SEO',
        }),
      ],
    }),
    defineField({
      name: 'benefitsIntro',
      title: 'Benefits Introduction',
      type: 'string',
      description: 'Optional introductory text before the benefits list (e.g., "Wir haben ein System entwickelt, das Dir erlaubt:")',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits List',
      type: 'array',
      of: [
        defineField({
          type: 'string',
          name: 'benefit',
          title: 'Benefit',
        }),
      ],
      description: 'List of benefits to display in the content box',
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
        title: title || 'Sales Content Section',
        subtitle: `${enabled ? '✓' : '✗'} ${subtitle || 'No subtitle set'}`,
        media: BlockElementIcon,
      }
    },
  },
})
