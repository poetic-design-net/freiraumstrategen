import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'callToActionSection',
  title: 'Call to Action Section',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'form',
      title: 'Form',
    },
    {
      name: 'design',
      title: 'Design',
    },
    {
      name: 'animation',
      title: 'Animation',
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
      name: 'content',
      title: 'Content',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string'
        },
        {
          name: 'text',
          title: 'Text',
          type: 'text'
        }
      ]
    }),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'object',
      group: 'form',
      fields: [
        {
          name: 'type',
          title: 'Form Type',
          type: 'string',
          options: {
            list: [
              {title: 'Contact Form', value: 'contact'},
              {title: 'Newsletter Form', value: 'newsletter'}
            ]
          }
        },
        {
          name: 'submitButton',
          title: 'Submit Button',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'design',
      title: 'Design',
      type: 'object',
      group: 'design',
      fields: [
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string'
        },
        {
          name: 'textColor',
          title: 'Text Color',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'animation',
      title: 'Animation',
      type: 'object',
      group: 'animation',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Animation',
          type: 'boolean'
        },
        {
          name: 'type',
          title: 'Animation Type',
          type: 'string',
          options: {
            list: [
              {title: 'Fade In', value: 'fadeIn'},
              {title: 'Slide Up', value: 'slideUp'},
              {title: 'Scale In', value: 'scaleIn'}
            ]
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'content.heading',
      enabled: 'enabled',
      id: 'id'
    },
    prepare({title, enabled, id}) {
      return {
        title: title || 'Call to Action Section',
        subtitle: `${enabled ? '✓' : '✗'} ${id ? `#${id}` : ''}`.trim(),
        media: BlockElementIcon
      }
    }
  }
})
