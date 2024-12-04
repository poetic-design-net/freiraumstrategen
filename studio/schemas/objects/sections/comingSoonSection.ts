import { defineField, defineType } from 'sanity'
import { ClockIcon } from '@sanity/icons'

export default defineType({
  name: 'comingSoonSection',
  title: 'Coming Soon Section',
  type: 'object',
  icon: ClockIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Section aktivieren',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      title: 'Hauptüberschrift',
      type: 'string',
      description: 'Die Hauptüberschrift für die Coming Soon Sektion',
    }),
    defineField({
      name: 'subtitle',
      title: 'Untertitel',
      type: 'string',
      description: 'Ein zusätzlicher Kontext oder Untertitel',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Hintergrundbild',
      type: 'image',
      description: 'Dieses Bild wird im Hintergrund unscharf dargestellt',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternativer Text für Barrierefreiheit',
        },
      ],
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      description: 'Optionaler Button für Weiterleitungen',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'styles',
      title: 'Section Styles',
      type: 'sectionStyles',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      enabled: 'enabled',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, enabled, media }) {
      return {
        title: title || 'Coming Soon Section',
        subtitle: `${enabled ? '✓' : '✗'} ${subtitle || ''}`.trim(),
        media: media || ClockIcon,
      }
    },
  },
})
