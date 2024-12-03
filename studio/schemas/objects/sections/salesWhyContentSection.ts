import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'salesWhyContentSection',
  title: 'Sales Why Content Section',
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
      description: 'The main title of the section',
      validation: (Rule) => Rule.required(),
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
      name: 'bulletPoints',
      title: 'Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of bullet points to display in the right column',
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
    }),
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
    },
    prepare({ title, enabled }) {
      return {
        title: title || 'Sales Why Content Section',
        subtitle: enabled ? 'Enabled' : 'Disabled',
        media: BlockElementIcon,
      }
    },
  },
})
