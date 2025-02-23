import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'contentSection',
  title: 'Content Section',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'layout',
      title: 'Layout',
    },
    {
      name: 'styles',
      title: 'Styles',
    }
  ],
  fields: [
    defineField({
      name: 'enabled',
      title: 'Section aktivieren',
      type: 'boolean',
      initialValue: true,
    }),
    anchorField,
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {title: 'Single Column', value: 'single-column'},
          {title: 'Two Columns', value: 'two-columns'}
        ]
      }
    }),
    defineField({
      name: 'styles',
      title: 'Section Styles',
      type: 'sectionStyles',
      group: 'styles',
      description: 'Customize the appearance of this section',
      initialValue: {
        theme: 'light-gray',
        overflow: true
      }
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
          type: 'string'
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'object',
          fields: [
            {
              name: 'regular',
              title: 'Regular Text',
              type: 'string'
            },
            {
              name: 'thin',
              title: 'Thin Text',
              type: 'string'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'leftColumn',
      title: 'Left Column',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'highlightedContent',
          title: 'Highlighted Content',
          description: 'Content that will be displayed with emphasis',
          type: 'blockContent'
        },
        {
          name: 'regularContent',
          title: 'Regular Content',
          description: 'Main content of the column',
          type: 'blockContent'
        }
      ]
    }),
    defineField({
      name: 'rightColumn',
      title: 'Right Column',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'highlightedContent',
          title: 'Highlighted Content',
          description: 'Content that will be displayed with emphasis',
          type: 'blockContent'
        },
        {
          name: 'regularContent',
          title: 'Regular Content',
          description: 'Main content of the column',
          type: 'blockContent'
        }
      ]
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      group: 'styles',
      options: {
        hotspot: true
      }
    })
  ],
  preview: {
    select: {
      title: 'header.heading.regular',
      subtitle: 'header.badge',
      enabled: 'enabled',
      id: 'id',
      media: 'backgroundImage',
      styles: 'styles'
    },
    prepare({title, subtitle, enabled, id, media, styles}) {
      return {
        title: title || 'Content Section',
        subtitle: `${enabled ? '✓' : '✗'} ${id ? `#${id}` : ''} ${subtitle || ''} | Theme: ${styles?.theme || 'default'}`.trim(),
        media: media || BlockElementIcon
      }
    }
  }
})
