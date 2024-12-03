import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'contentSectionAlt',
  title: 'Content Section (Alternative)',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'design',
      title: 'Design',
    }
  ],
  fields: [
    defineField({
      name: 'enabled',
      title: 'Section aktivieren',
      type: 'boolean',
      initialValue: true,
    }),
    anchorField,
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'content',
      description: 'Kleiner Text über der Hauptüberschrift'
    }),
    defineField({
      name: 'heading',
      title: 'Hauptüberschrift',
      type: 'string',
      group: 'content'
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      group: 'design',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'imagePosition',
      title: 'Bild Position',
      type: 'string',
      group: 'design',
      options: {
        list: [
          {title: 'Links', value: 'left'},
          {title: 'Rechts', value: 'right'}
        ]
      }
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Hintergrundfarbe',
      type: 'string',
      group: 'design',
      options: {
        list: [
          {title: 'Weiß', value: 'white'},
          {title: 'Grau', value: 'gray'},
          {title: 'Dunkel', value: 'dark'}
        ]
      }
    })
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'eyebrow',
      enabled: 'enabled',
      id: 'id',
      media: 'image'
    },
    prepare({title, subtitle, enabled, id, media}) {
      return {
        title: title || 'Content Section (Alt)',
        subtitle: `${enabled ? '✓' : '✗'} ${id ? `#${id}` : ''} ${subtitle || ''}`.trim(),
        media: media || BlockElementIcon
      }
    }
  }
})
