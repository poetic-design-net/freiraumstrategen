import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export default defineType({
  name: 'strategyIntroSection',
  title: 'Strategy Intro Section',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'previewImage',
      title: 'Vorschaubild',
      type: 'image',
      description: 'Ein Vorschaubild für diese Sektion in der Übersicht',
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
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'object',
      fields: [
        defineField({
          name: 'regular',
          title: 'Regulärer Text',
          type: 'string',
          description: 'Der normale Text der Überschrift (z.B. "Wir freuen uns")'
        }),
        defineField({
          name: 'thin',
          title: 'Dünner Text',
          type: 'string',
          description: 'Der dünnere Text der Überschrift (z.B. "Dich kennenzulernen!")'
        })
      ]
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'object',
      fields: [
        defineField({
          name: 'mainParagraph',
          title: 'Hauptabsatz',
          type: 'text',
          description: 'Der hervorgehobene erste Absatz'
        }),
        defineField({
          name: 'secondaryParagraph',
          title: 'Sekundärer Absatz',
          type: 'text',
          description: 'Der zweite, ergänzende Absatz'
        })
      ]
    }),
    defineField({
      name: 'teamCard',
      title: 'Team Karte',
      type: 'object',
      fields: [
        defineField({
          name: 'members',
          title: 'Team Mitglieder',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({
                name: 'image',
                title: 'Profilbild',
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
                name: 'name',
                title: 'Name',
                type: 'string',
                description: 'Name des Team Mitglieds'
              })
            ]
          }],
          validation: Rule => Rule.max(2)
        }),
        defineField({
          name: 'title',
          title: 'Titel',
          type: 'string',
          description: 'Namen der Team Mitglieder (z.B. "Tobias und Johannes")'
        }),
        defineField({
          name: 'subtitle',
          title: 'Untertitel',
          type: 'string',
          description: 'Beschreibung der Team Mitglieder (z.B. "Die Freiraumstrategen")'
        })
      ]
    }),
    defineField({
      name: 'mainImage',
      title: 'Hauptbild',
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
      name: 'imageOverlay',
      title: 'Bild Overlay',
      type: 'object',
      description: 'Overlay Informationen, die über dem Hauptbild angezeigt werden',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          description: 'Name der Person im Bild'
        }),
        defineField({
          name: 'subtitle',
          title: 'Untertitel',
          type: 'string',
          description: 'Beschreibung der Aktivität'
        }),
        defineField({
          name: 'stats',
          title: 'Statistik',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Wert',
              type: 'string',
              description: 'Der numerische Wert (z.B. "2.5")'
            }),
            defineField({
              name: 'unit',
              title: 'Einheit',
              type: 'string',
              description: 'Die Einheit des Wertes (z.B. "%")'
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'heading.regular',
      subtitle: 'heading.thin',
      enabled: 'enabled',
      media: 'previewImage'
    },
    prepare({title, subtitle, enabled, media}) {
      return {
        title: title || 'Strategy Intro Section',
        subtitle: `${enabled ? 'Aktiviert' : 'Deaktiviert'} - ${subtitle || ''}`,
        media: media || DocumentIcon
      }
    }
  }
})
