import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'featuresSection',
  title: 'Features Section',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Section aktivieren',
      type: 'boolean',
      initialValue: true,
    }),
    anchorField,
    defineField({
      name: 'layout',
      title: 'Layout',
      description: 'Wählen Sie zwischen einem Layout mit oder ohne Video',
      type: 'string',
      options: {
        list: [
          {title: 'Mit Video', value: 'withVideo'},
          {title: 'Ohne Video', value: 'withoutVideo'},
        ],
      },
      initialValue: 'withVideo',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Kleiner Text über der Hauptüberschrift'
    }),
    defineField({
      name: 'title',
      title: 'Hauptüberschrift',
      type: 'string'
    }),
    defineField({
      name: 'subtitle',
      title: 'Unterüberschrift',
      type: 'string'
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      hidden: ({parent}) => parent?.layout === 'withoutVideo',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{
        type: 'object',
        name: 'feature',
        fields: [
          defineField({
            name: 'title',
            title: 'Titel',
            type: 'string'
          }),
          defineField({
            name: 'subtitle',
            title: 'Untertitel',
            type: 'string'
          }),
          defineField({
            name: 'subtitle_hover',
            title: 'Untertitel (Hover)',
            type: 'string'
          }),
          defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            options: {
              list: [
                {title: 'Education', value: 'education'},
                {title: 'Structure', value: 'structure'},
                {title: 'Strategy', value: 'strategy'},
                {title: 'Live Trading', value: 'liveTrading'},
                {title: 'Community', value: 'community'},
                {title: 'Risk Management', value: 'riskManagement'}
              ]
            }
          }),
          defineField({
            name: 'description',
            title: 'Beschreibung',
            type: 'array',
            of: [{type: 'string'}]
          }),
          defineField({
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({
                name: 'text',
                title: 'Text',
                type: 'string'
              }),
              defineField({
                name: 'href',
                title: 'URL',
                type: 'string'
              })
            ]
          })
        ]
      }]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
      enabled: 'enabled',
      id: 'id',
      layout: 'layout'
    },
    prepare({title, subtitle, enabled, id, layout}) {
      return {
        title: title || 'Features Section',
        subtitle: `${enabled ? '✓' : '✗'} ${id ? `#${id}` : ''} ${layout === 'withoutVideo' ? 'Ohne Video' : 'Mit Video'} ${subtitle || ''}`.trim(),
        media: BlockElementIcon
      }
    }
  }
})
