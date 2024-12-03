import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export default defineType({
  name: 'salesForWhoSection',
  title: 'Sales For Who Section',
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
      name: 'profiles',
      title: 'Target Profiles',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Profile Title',
            type: 'string',
            validation: (Rule) => Rule.required()
          }),
          defineField({
            name: 'description',
            title: 'Profile Description',
            type: 'text',
            validation: (Rule) => Rule.required()
          })
        ]
      }]
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Requirement Category',
            type: 'string',
            validation: (Rule) => Rule.required()
          }),
          defineField({
            name: 'points',
            title: 'Requirement Points',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.required()
          })
        ]
      }]
    }),
    defineField({
      name: 'bottomText',
      title: 'Bottom Text',
      type: 'text',
      description: 'The text displayed above the CTA button',
      initialValue: 'Wenn Du Dich in einem dieser Profile wiedererkennst und bereit bist, die nötigen Voraussetzungen zu erfüllen, dann ist die Winter Academy genau das Richtige für Dich.'
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
        title: title || 'Sales For Who Section',
        subtitle: `${enabled ? '✓' : '✗'} ${subtitle || 'No subtitle set'}`,
        media: BlockElementIcon
      }
    }
  }
})
