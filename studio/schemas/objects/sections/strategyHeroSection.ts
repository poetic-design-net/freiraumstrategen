import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export default defineType({
  name: 'strategyHeroSection',
  title: 'Strategy Hero Section',
  type: 'object',
  icon: BlockElementIcon,
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
      name: 'headline',
      title: 'Überschrift',
      type: 'object',
      fields: [
        {
          name: 'prefix',
          title: 'Prefix Text',
          type: 'string',
          description: 'Der dünnere Text über der Hauptüberschrift (z.B. "Wir laden ein zum")'
        },
        {
          name: 'main',
          title: 'Haupttext',
          type: 'string',
          description: 'Der Haupttext der Überschrift (z.B. "Strategiegespräch")'
        }
      ]
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Hintergrundbild',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Beschreibung des Bildes für Screenreader und SEO'
        }
      ]
    }),
    defineField({
      name: 'statistics',
      title: 'Statistiken',
      type: 'object',
      fields: [
        {
          name: 'firstStat',
          title: 'Erste Statistik',
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Wert',
              type: 'string',
              description: 'z.B. "18k+"'
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'z.B. "Strategiegespräche"'
            }
          ]
        },
        {
          name: 'secondStat',
          title: 'Zweite Statistik',
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Wert',
              type: 'string',
              description: 'z.B. "100+"'
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'z.B. "Seminare"'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'z.B. "Kennenlern-Tour starten"'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'z.B. "/tour"'
        }
      ]
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      fields: [
        {
          name: 'youtubeId',
          title: 'YouTube Video ID',
          type: 'string',
          description: 'Die ID des YouTube Videos'
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: 'z.B. "Wie funktioniert\'s?"'
        },
        {
          name: 'duration',
          title: 'Video Dauer',
          type: 'string',
          description: 'z.B. "2:30 min"'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'headline.main',
      subtitle: 'headline.prefix',
      enabled: 'enabled',
      media: 'previewImage'
    },
    prepare({title, subtitle, enabled, media}) {
      return {
        title: title || 'Strategy Hero Section',
        subtitle: `${enabled ? 'Aktiviert' : 'Deaktiviert'} - ${subtitle || ''}`,
        media: media || BlockElementIcon
      }
    }
  }
})
