import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'uberunsIntroSection',
  title: 'Über uns Intro Section',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Section aktivieren',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'headline',
      title: 'Überschrift',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          description: 'The smaller text that sits above the title to provide context'
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'The large text that is the primary focus of the block'
        })
      ]
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Der Hauptinhalt der Intro-Sektion mit Rich-Text-Formatierung'
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Beschreibung des Bildes für Screenreader und SEO'
        })
      ]
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
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
              type: 'text',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Name des Lucide Icons'
            })
          ]
        }
      ],
      validation: Rule => Rule.max(3)
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'Text für den Call-to-Action Button'
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'Link-Ziel für den Call-to-Action Button'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'headline.title',
      subtitle: 'headline.eyebrow',
      enabled: 'enabled'
    },
    prepare({title, subtitle, enabled}) {
      return {
        title: title || 'Über uns Intro Section',
        subtitle: `${enabled ? 'Aktiviert' : 'Deaktiviert'} - ${subtitle || ''}`
      }
    }
  }
})
