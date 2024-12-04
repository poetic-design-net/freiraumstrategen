import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'salesEmotionalFreedomSection',
  title: 'Sales Emotional Freedom Section',
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
      description: 'The main title of the section',
      group: 'content'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The main descriptive text',
      group: 'content'
    }),
    defineField({
      name: 'additionalText',
      title: 'Additional Text',
      type: 'text',
      description: 'Secondary descriptive text',
      group: 'content'
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'The background image for the section',
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
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string'
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      enabled: 'enabled',
      media: 'backgroundImage',
      styles: 'styles'
    },
    prepare({title, subtitle, enabled, media, styles}) {
      return {
        title: title || 'Sales Emotional Freedom Section',
        subtitle: `${enabled ? '✓' : '✗'} | Theme: ${styles?.theme || 'default'}`,
        media: media || BlockElementIcon
      }
    }
  }
})
