import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export default defineType({
  name: 'salesEmotionalSection',
  title: 'Sales Emotional Section',
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
      description: 'The text displayed in the badge above the title'
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title of the section'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The main descriptive text'
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      description: 'An inspirational quote to display'
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'The background image for the section',
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
      media: 'backgroundImage'
    },
    prepare({title, subtitle, enabled, media}) {
      return {
        title: title || 'Sales Emotional Section',
        subtitle: `${enabled ? '✓' : '✗'} ${subtitle || 'No description set'}`,
        media: media || BlockElementIcon
      }
    }
  }
})
