import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'contentSectionAlt',
  title: 'Content Section (Alternative)',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'design',
      title: 'Design',
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
      name: 'leftColumn',
      title: 'Linke Spalte',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
        },
        {
          name: 'heading',
          title: 'Überschrift',
          type: 'object',
          fields: [
            {
              name: 'line1',
              title: 'Zeile 1',
              type: 'string'
            },
            {
              name: 'line2',
              title: 'Zeile 2',
              type: 'string'
            },
            {
              name: 'line3',
              title: 'Zeile 3',
              type: 'string'
            }
          ]
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'button',
          title: 'Button',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string'
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string'
            },
            {
              name: 'variant',
              title: 'Variante',
              type: 'string',
              options: {
                list: [
                  {title: 'Orange', value: 'orange'},
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'}
                ]
              }
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'rightColumn',
      title: 'Rechte Spalte',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'heading',
          title: 'Überschrift',
          type: 'string'
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'imageSlider',
          title: 'Bild Slider',
          type: 'object',
          fields: [
            {
              name: 'images',
              title: 'Bilder',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  {
                    name: 'image',
                    title: 'Bild',
                    type: 'image',
                    options: {
                      hotspot: true
                    }
                  },
                  {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string'
                  }
                ]
              }]
            },
            {
              name: 'settings',
              title: 'Einstellungen',
              type: 'object',
              fields: [
                {
                  name: 'autoplaySpeed',
                  title: 'Autoplay Geschwindigkeit (ms)',
                  type: 'number',
                  initialValue: 5000
                },
                {
                  name: 'transitionDuration',
                  title: 'Übergangszeit (ms)',
                  type: 'number',
                  initialValue: 800
                }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Hintergrundbild',
      type: 'image',
      group: 'design',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Hintergrundfarbe',
      type: 'string',
      group: 'design',
      options: {
        list: [
          {title: 'Weiß', value: 'white'},
          {title: 'Grau', value: 'gray'},
          {title: 'Dunkel', value: 'dark'}
        ]
      }
    })
  ],
  preview: {
    select: {
      title: 'leftColumn.heading.line1',
      subtitle: 'leftColumn.badge',
      enabled: 'enabled',
      id: 'id',
      media: 'backgroundImage'
    },
    prepare({title, subtitle, enabled, id, media}) {
      return {
        title: title || 'Content Section (Alt)',
        subtitle: `${enabled ? '✓' : '✗'} ${id ? `#${id}` : ''} ${subtitle || ''}`.trim(),
        media: media || BlockElementIcon
      }
    }
  }
})
