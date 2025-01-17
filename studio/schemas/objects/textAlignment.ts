import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'textAlignment',
  type: 'object',
  title: 'Text Alignment',
  fields: [
    defineField({
      title: 'Content',
      name: 'text',
      type: 'blockContent'
    }),
    defineField({
      title: 'Alignment',
      name: 'alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Links', value: 'left'},
          {title: 'Zentriert', value: 'center'},
          {title: 'Rechts', value: 'right'},
        ],
      }
    })
  ],
  preview: {
    select: {
      text: 'text'
    },
    prepare({text}) {
      const firstBlock = Array.isArray(text) ? text[0] : null
      const children = firstBlock?.children || []
      return {
        title: children.map((child: any) => child.text || '').join('') || 'Text Alignment'
      }
    }
  }
})
