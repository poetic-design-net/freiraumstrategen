import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
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
      name: 'partners',
      title: 'Partners',
    },
    {
      name: 'stats',
      title: 'Statistics',
    }
  ],
  fields: [
    defineField({
      name: 'previewImage',
      title: 'Vorschaubild',
      type: 'image',
      description: 'Ein Vorschaubild für diese Sektion in der Übersicht',
      group: 'media',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'enabled',
      title: 'Section aktivieren',
      type: 'boolean',
      initialValue: true,
    }),
    anchorField,
    defineField({
      name: 'gradientText',
      title: 'Gradient Text',
      type: 'string',
      group: 'content',
      description: 'Der Text über der Hauptüberschrift mit Farbverlauf',
    }),
    defineField({
      name: 'heading',
      title: 'Hauptüberschrift',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'highlighted',
          title: 'Hervorgehobener Text',
          type: 'string',
          description: 'Der fettgedruckte Teil der Überschrift (z.B. "Erfolgreich")'
        },
        {
          name: 'regular',
          title: 'Normaler Text',
          type: 'string',
          description: 'Der Rest der Überschrift (z.B. "an der Börse handeln.")'
        }
      ]
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'partners',
      title: 'Partner',
      type: 'object',
      group: 'partners',
      fields: [
        {
          name: 'heading',
          title: 'Partner Überschrift',
          type: 'string',
          description: 'z.B. "Unsere zuverlässigen Partner"'
        },
        {
          name: 'logos',
          title: 'Partner Logos',
          type: 'array',
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'alt',
                  media: 'image'
                }
              },
              fields: [
                {
                  name: 'image',
                  title: 'Logo',
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
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Bild',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'stats',
      title: 'Statistik Box',
      type: 'object',
      group: 'stats',
      fields: [
        {
          name: 'number',
          title: 'Zahl',
          type: 'string',
          description: 'z.B. "100+"'
        },
        {
          name: 'text',
          title: 'Text',
          type: 'string',
          description: 'z.B. "Zufriedene Freiraumstrategen"'
        },
        {
          name: 'avatars',
          title: 'Avatar Bilder',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      enabled: 'enabled',
      media: 'previewImage',
      heading: 'heading',
      gradientText: 'gradientText',
      id: 'id'
    },
    prepare({ enabled, media, heading, gradientText, id }) {
      return {
        title: heading?.highlighted 
          ? `${heading.highlighted} ${heading.regular || ''}`
          : 'Hero Section',
        subtitle: `${enabled ? '✓' : '✗'} ${id ? `#${id}` : ''} ${gradientText || ''}`.trim(),
        media: media || BlockElementIcon
      }
    }
  }
})
