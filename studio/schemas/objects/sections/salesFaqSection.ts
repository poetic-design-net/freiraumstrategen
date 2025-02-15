import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export default defineType({
  name: 'salesFaqSection',
  title: 'Sales FAQ Section',
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
      description: 'The main title of the FAQ section'
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'A brief description below the title'
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'faq'}],
        options: {
          disableNew: false,
          filter: `_type == "faq"`,
          weak: false
        }
      }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string'
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string'
        })
      ]
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
      subtitle: 'subtitle',
      enabled: 'enabled'
    },
    prepare({title, subtitle, enabled}) {
      return {
        title: title || 'Sales FAQ Section',
        subtitle: `${enabled ? '✓' : '✗'} ${subtitle || 'No subtitle set'}`,
        media: BlockElementIcon
      }
    }
  }
})
