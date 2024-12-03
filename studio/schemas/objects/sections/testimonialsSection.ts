import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Sektion',
  type: 'object',
  fields: [
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
          description: 'Text im Badge (z.B. "Testimonials")'
        },
        {
          name: 'heading',
          title: 'Überschrift',
          type: 'object',
          fields: [
            {
              name: 'regular',
              title: 'Normaler Text',
              type: 'string',
              description: 'Der normal geschriebene Teil (z.B. "Was sagen")'
            },
            {
              name: 'thin',
              title: 'Dünner Text',
              type: 'string',
              description: 'Der dünn geschriebene Teil (z.B. "die Teilnehmer")'
            }
          ]
        },
        {
          name: 'subtitle',
          title: 'Untertitel',
          type: 'string',
          description: 'Text unter der Überschrift (z.B. "Wie lebt es sich so?")'
        }
      ]
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      description: 'Wählen Sie die Testimonials aus, die in dieser Sektion angezeigt werden sollen',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }]
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
          name: 'slideDuration',
          title: 'Slide Übergangszeit (ms)',
          type: 'number',
          initialValue: 400
        },
        {
          name: 'dragThreshold',
          title: 'Drag Schwellenwert (%)',
          type: 'number',
          description: 'Prozentsatz der Bildschirmbreite für Slide-Wechsel',
          initialValue: 15,
          validation: Rule => Rule.min(0).max(100)
        }
      ]
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Einstellungen',
      type: 'object',
      fields: [
        {
          name: 'showArrows',
          title: 'Pfeile anzeigen',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showDots',
          title: 'Punkte anzeigen',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'enableKeyboard',
          title: 'Tastaturnavigation',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'enableDrag',
          title: 'Drag-Navigation',
          type: 'boolean',
          initialValue: true
        }
      ]
    })
  ],
  preview: {
    select: {
      enabled: 'enabled',
      testimonialsCount: 'testimonials.length'
    },
    prepare({ enabled, testimonialsCount = 0 }) {
      return {
        title: 'Testimonials Sektion',
        subtitle: `${enabled ? 'Aktiviert' : 'Deaktiviert'} - ${testimonialsCount} Testimonials`
      }
    }
  }
})
