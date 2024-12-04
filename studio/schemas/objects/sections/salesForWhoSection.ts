import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'salesForWhoSection',
  title: 'Sales For Who Section',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'profiles',
      title: 'Target Profiles',
    },
    {
      name: 'requirements',
      title: 'Requirements',
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'A brief description below the title',
      group: 'content'
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
      }],
      group: 'profiles'
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
      }],
      group: 'requirements'
    }),
    defineField({
      name: 'bottomText',
      title: 'Bottom Text',
      type: 'text',
      description: 'The text displayed above the CTA button',
      initialValue: 'Wenn Du Dich in einem dieser Profile wiedererkennst und bereit bist, die nötigen Voraussetzungen zu erfüllen, dann ist die Winter Academy genau das Richtige für Dich.',
      group: 'cta'
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
      ],
      group: 'cta'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      enabled: 'enabled',
      styles: 'styles'
    },
    prepare({title, subtitle, enabled, styles}) {
      return {
        title: title || 'Sales For Who Section',
        subtitle: `${enabled ? '✓' : '✗'} | Theme: ${styles?.theme || 'default'}`,
        media: BlockElementIcon
      }
    }
  }
})
