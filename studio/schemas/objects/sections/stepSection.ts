import {defineField, defineType} from 'sanity'
import {StackIcon} from '@sanity/icons'

export default defineType({
  name: 'stepSection',
  title: 'Schritt-für-Schritt Sektion',
  type: 'object',
  icon: StackIcon,
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
      name: 'header',
      title: 'Kopfbereich',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          description: 'Text im Badge (z.B. "Schritt für Schritt erklärt")'
        },
        {
          name: 'heading',
          title: 'Überschrift',
          type: 'object',
          fields: [
            {
              name: 'thin',
              title: 'Dünner Text',
              type: 'string',
              description: 'Der dünn geschriebene Teil (z.B. "In wenigen Schritten")'
            },
            {
              name: 'bold',
              title: 'Fetter Text',
              type: 'string',
              description: 'Der fett geschriebene Teil (z.B. "zum Erfolg")'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'steps',
      title: 'Schritte',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Schritt Nummer',
              type: 'number',
              validation: Rule => Rule.required().min(1)
            },
            {
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Beschreibung',
              type: 'blockContent',
              validation: Rule => Rule.required()
            },
            {
              name: 'image',
              title: 'Bild',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'title',
              number: 'number',
              media: 'image'
            },
            prepare({ title, number, media }) {
              return {
                title: `Schritt ${number}: ${title}`,
                media
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'animation',
      title: 'Animation Einstellungen',
      type: 'object',
      fields: [
        {
          name: 'scrollTriggerOffset',
          title: 'Scroll Trigger Offset (%)',
          type: 'number',
          description: 'Prozentsatz des Viewports, ab dem ein Schritt als aktiv gilt',
          initialValue: 25,
          validation: Rule => Rule.min(0).max(100)
        },
        {
          name: 'transitionDuration',
          title: 'Übergangszeit (ms)',
          type: 'number',
          initialValue: 300
        }
      ]
    })
  ],
  preview: {
    select: {
      enabled: 'enabled',
      stepsCount: 'steps.length',
      media: 'previewImage'
    },
    prepare({ enabled, stepsCount = 0, media }) {
      return {
        title: 'Schritt-für-Schritt Sektion',
        subtitle: `${enabled ? 'Aktiviert' : 'Deaktiviert'} - ${stepsCount} Schritte`,
        media: media || StackIcon
      }
    }
  }
})
