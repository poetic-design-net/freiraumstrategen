import {defineField, defineType} from 'sanity'
import {ThListIcon} from '@sanity/icons'

export default defineType({
  name: 'kachelSection',
  title: 'Kachel Section',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Section aktivieren',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          description: 'Der Text im Badge über der Überschrift (z.B. "WISSENSWERTES")'
        }),
        defineField({
          name: 'title',
          title: 'Haupttitel',
          type: 'object',
          fields: [
            defineField({
              name: 'regular',
              title: 'Regulärer Text',
              type: 'string',
              description: 'Der erste Teil der Überschrift (z.B. "Hier findest du")'
            }),
            defineField({
              name: 'light',
              title: 'Light Text',
              type: 'string',
              description: 'Der zweite Teil der Überschrift in Light-Font (z.B. "alles was du wissen musst")'
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      description: 'Der Beschreibungstext unter der Überschrift'
    }),
    defineField({
      name: 'mainKachel',
      title: 'Haupt-Kachel',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Bild',
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Alternative text for accessibility and SEO'
            }
          ]
        }),
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          description: 'Der Text im oberen Badge (z.B. "Fragen und Antworten")'
        }),
        defineField({
          name: 'title',
          title: 'Titel',
          type: 'string',
          description: 'Die Hauptüberschrift der Kachel'
        }),
        defineField({
          name: 'button',
          title: 'Button',
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
              type: 'string',
              description: 'Der Link-Pfad (z.B. "/faq")'
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'sideKacheln',
      title: 'Seiten-Kacheln',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'kachel',
          fields: [
            defineField({
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Beschreibung',
              type: 'text'
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Der Link-Pfad (z.B. "/blog")'
            }),
            defineField({
              name: 'backgroundColor',
              title: 'Hintergrundfarbe',
              type: 'string',
              options: {
                list: [
                  {title: 'Grün', value: 'green'},
                  {title: 'Rot', value: 'red'},
                  {title: 'Grau', value: 'gray'}
                ]
              }
            })
          ],
          preview: {
            select: {
              title: 'title',
              backgroundColor: 'backgroundColor'
            },
            prepare({title, backgroundColor}) {
              return {
                title: title,
                subtitle: `Hintergrund: ${backgroundColor}`
              }
            }
          }
        }
      ],
      validation: Rule => Rule.max(3).error('Maximal 3 Seiten-Kacheln erlaubt')
    })
  ],
  preview: {
    select: {
      title: 'heading.title.regular',
      subtitle: 'heading.badge'
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Kachel Section',
        subtitle: subtitle,
        media: ThListIcon
      }
    }
  }
})
