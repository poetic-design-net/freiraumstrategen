import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {anchorField} from '../../utils/anchorField'

export default defineType({
  name: 'blogSection',
  title: 'Blog Section',
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
      name: 'heading',
      title: 'Überschrift',
      type: 'string',
    }),
    defineField({
      name: 'posts',
      title: 'Blog Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}]
    })
  ],
  preview: {
    select: {
      title: 'heading',
      enabled: 'enabled',
      id: 'id'
    },
    prepare({title, enabled, id}) {
      return {
        title: title || 'Blog Section',
        subtitle: `${enabled ? '✓' : '✗'} ${id ? `#${id}` : ''}`.trim(),
        media: BlockElementIcon
      }
    }
  }
})
