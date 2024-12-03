import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export default defineType({
  name: 'salesPricingSection',
  title: 'Sales Pricing Section',
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'A brief description below the title'
    }),
    defineField({
      name: 'earlyBirdBadge',
      title: 'Early Bird Badge',
      type: 'string',
      description: 'Text displayed in the early bird badge'
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        defineField({
          name: 'originalPrice',
          title: 'Original Price',
          type: 'string'
        }),
        defineField({
          name: 'currentPrice',
          title: 'Current Price',
          type: 'string'
        }),
        defineField({
          name: 'paymentInfo',
          title: 'Payment Information',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'bonuses',
      title: 'Bonus Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
          }),
          defineField({
            name: 'value',
            title: 'Value',
            type: 'string'
          }),
          defineField({
            name: 'description',
            title: 'Description',
            type: 'text'
          })
        ]
      }]
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
    }),
    defineField({
      name: 'guaranteeBox',
      title: 'Guarantee Box',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text'
        })
      ]
    }),
    defineField({
      name: 'trustElements',
      title: 'Trust Elements',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            options: {
              list: [
                {title: 'Lock', value: 'lock'},
                {title: 'Shield', value: 'shield'},
                {title: 'Clock', value: 'clock'}
              ]
            }
          }),
          defineField({
            name: 'text',
            title: 'Text',
            type: 'string'
          })
        ]
      }]
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
        title: title || 'Sales Pricing Section',
        subtitle: `${enabled ? '✓' : '✗'} ${subtitle || 'No subtitle set'}`,
        media: BlockElementIcon
      }
    }
  }
})
