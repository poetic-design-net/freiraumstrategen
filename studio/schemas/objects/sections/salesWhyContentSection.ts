import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'salesWhyContentSection',
  title: 'Sales Why Content Section',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'stats',
      title: 'Statistics',
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
      description: 'The main title of the section',
      validation: (Rule) => Rule.required(),
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
      name: 'bulletPoints',
      title: 'Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of bullet points to display in the right column',
      group: 'content'
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            description: 'The statistic value (e.g., "1000+", "24/7")',
          }),
          defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            description: 'Description of the statistic',
          }),
        ],
      }],
      description: 'Statistics to display at the bottom of the section',
      group: 'stats'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
      styles: 'styles'
    },
    prepare({ title, enabled, styles }) {
      return {
        title: title || 'Sales Why Content Section',
        subtitle: `${enabled ? '✓' : '✗'} | Theme: ${styles?.theme || 'default'}`,
        media: BlockElementIcon,
      }
    },
  },
})
