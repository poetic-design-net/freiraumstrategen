import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'salesCurriculumSection',
  title: 'Sales Curriculum Section',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'modules',
      title: 'Modules',
    },
    {
      name: 'bonus',
      title: 'Bonus Box',
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
      description: 'The main title of the curriculum section',
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
      name: 'modules',
      title: 'Curriculum Modules',
      type: 'array',
      of: [{
        type: 'object',
        name: 'module',
        fields: [
          defineField({
            name: 'week',
            title: 'Week Number',
            type: 'number'
          }),
          defineField({
            name: 'title',
            title: 'Module Title',
            type: 'string'
          }),
          defineField({
            name: 'description',
            title: 'Module Description',
            type: 'text'
          }),
          defineField({
            name: 'topics',
            title: 'Topics',
            type: 'array',
            of: [{type: 'string'}]
          })
        ]
      }],
      group: 'modules'
    }),
    defineField({
      name: 'bonusBox',
      title: 'Bonus Box',
      type: 'object',
      group: 'bonus',
      fields: [
        defineField({
          name: 'style',
          title: 'Box Style',
          type: 'string',
          options: {
            list: [
              { title: 'Orange', value: 'orange' },
              { title: 'Primary', value: 'primary' },
              { title: 'Gray', value: 'gray' }
            ]
          },
          initialValue: 'orange',
          description: 'Choose the color style for the bonus box'
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text'
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
      ]
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
        title: title || 'Sales Curriculum Section',
        subtitle: `${enabled ? '✓' : '✗'} | Theme: ${styles?.theme || 'default'}`,
        media: BlockElementIcon
      }
    }
  }
})
