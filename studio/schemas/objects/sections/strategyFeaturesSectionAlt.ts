import {defineField, defineType} from 'sanity'
import {ComponentIcon} from '@sanity/icons'

export default defineType({
  name: 'strategyFeaturesSectionAlt',
  title: 'Strategy Features Section (Alt)',
  type: 'object',
  icon: ComponentIcon,
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
      name: 'badge',
      title: 'Badge',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Badge Text',
          type: 'string',
          description: 'z.B. "Ein etwas anderes Angebot"'
        }
      ]
    }),
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'object',
      fields: [
        {
          name: 'thin',
          title: 'Dünner Text',
          type: 'string',
          description: 'z.B. "Strategiegespräch gleich Verkaufsgespräch?"'
        },
        {
          name: 'bold',
          title: 'Fetter Text',
          type: 'string',
          description: 'z.B. "NEIN!"'
        }
      ]
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'object',
      fields: [
        {
          name: 'mainParagraph',
          title: 'Hauptabsatz',
          type: 'text',
          description: 'Der erste, hervorgehobene Textabsatz'
        },
        {
          name: 'secondaryParagraph',
          title: 'Sekundärer Absatz',
          type: 'text',
          description: 'Der zweite Textabsatz'
        }
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
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Name des Icons (z.B. "check", "chart", "settings")'
            },
            {
              name: 'color',
              title: 'Farbe',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Blue', value: 'blue'},
                  {title: 'Green', value: 'green'}
                ]
              }
            },
            {
              name: 'title',
              title: 'Titel',
              type: 'string',
              description: 'z.B. "Unverbindliche Beratung"'
            },
            {
              name: 'description',
              title: 'Beschreibung',
              type: 'string',
              description: 'z.B. "Keine versteckten Verpflichtungen"'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description'
            }
          }
        }
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
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'heading.thin',
      subtitle: 'heading.bold',
      enabled: 'enabled',
      media: 'previewImage'
    },
    prepare({title, subtitle, enabled, media}) {
      return {
        title: title || 'Strategy Features Section (Alt)',
        subtitle: `${enabled ? 'Aktiviert' : 'Deaktiviert'} - ${subtitle || ''}`,
        media: media || ComponentIcon
      }
    }
  }
})
