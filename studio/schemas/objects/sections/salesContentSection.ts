import { defineField, defineType, defineArrayMember } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'salesContentSection',
  title: 'Sales Content Section',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'benefits',
      title: 'Benefits',
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
      description: 'The main title of the content section',
      validation: (Rule) => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'The subtitle that follows the title',
      group: 'content'
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      description: 'Choose between single column (centered) or double column layout',
      options: {
        list: [
          { title: 'Single Column', value: 'single' },
          { title: 'Double Column', value: 'double' }
        ],
        layout: 'radio'
      },
      initialValue: 'double',
      group: 'content'
    }),
    defineField({
      name: 'leftColumnContent',
      title: 'Left Column Content',
      description: 'Rich text content for the left column with formatting options',
      type: 'blockContent',
      group: 'content'
    }),
    defineField({
      name: 'rightColumnContent',
      title: 'Right Column Content',
      description: 'Rich text content for the right column with formatting options',
      type: 'blockContent',
      group: 'content'
    }),
    defineField({
      name: 'image',
      title: 'Content Image',
      type: 'image',
      description: 'The image to display in the content box',
      group: 'media',
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
      group: 'benefits'
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
      group: 'benefits'
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
        title: title || 'Sales Content Section',
        subtitle: `${enabled ? '✓' : '✗'} ${subtitle || 'No subtitle'} | Theme: ${styles?.theme || 'default'}`,
        media: BlockElementIcon,
      }
    },
  },
})
