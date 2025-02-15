import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'salesContentSectionFullWidth',
  title: 'Sales Content Section (Full Width)',
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
      name: 'fullWidthImage',
      title: 'Full Width Background Image',
      type: 'image',
      description: 'The background image for full width layout',
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
      name: 'imagePosition',
      title: 'Background Image Position',
      type: 'string',
      description: 'Choose which side the background image should appear on',
      options: {
        list: [
          { title: 'Left Side', value: 'left' },
          { title: 'Right Side', value: 'right' }
        ],
        layout: 'radio'
      },
      initialValue: 'left',
      group: 'media'
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
        title: title || 'Sales Content Section (Full Width)',
        subtitle: `${enabled ? '✓' : '✗'} ${subtitle || 'No subtitle'} | Theme: ${styles?.theme || 'default'}`,
        media: BlockElementIcon,
      }
    },
  },
})