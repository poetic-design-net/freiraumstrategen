import {defineType, defineArrayMember, defineField} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      title: 'Text Ausrichtung',
      type: 'textAlignment'
    }),
    defineArrayMember({
      title: 'Bild',
      type: 'image',
      options: {
        hotspot: false,
      },
    }),
    defineArrayMember({
      title: 'Video',
      type: 'object',
      name: 'video',
      fields: [
        {
          title: 'Video-URL',
          name: 'url',
          type: 'url',
        },
      ],
    }),
    defineArrayMember({
      title: 'Button',
      name: 'button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          type: 'string',
          title: 'Button Text',
          description: 'The text to display on the button'
        }),
        defineField({
          name: 'url',
          type: 'string',
          title: 'Button URL',
          description: 'The URL the button links to'
        }),
        defineField({
          name: 'style',
          type: 'string',
          title: 'Button Style',
          description: 'Choose the visual style of the button',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Orange', value: 'orange' }
            ]
          },
          initialValue: 'primary'
        }),
        defineField({
          name: 'size',
          type: 'string',
          title: 'Button Size',
          description: 'Choose the size of the button',
          options: {
            list: [
              { title: 'Small', value: 'sm' },
              { title: 'Medium', value: 'md' },
              { title: 'Large', value: 'lg' }
            ]
          },
          initialValue: 'md'
        }),
        defineField({
          name: 'position',
          type: 'string',
          title: 'Button Position',
          description: 'Choose the alignment of the button (left, center, or right)',
          options: {
            list: [
              { title: 'Left', value: 'start' },
              { title: 'Center', value: 'center' },
              { title: 'Right', value: 'end' }
            ]
          },
          initialValue: 'start'
        }),
        defineField({
          name: 'icon',
          type: 'string',
          title: 'Button Icon',
          description: 'Choose an icon to display with the button text',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Arrow Right', value: 'arrow-right' },
              { title: 'Arrow Left', value: 'arrow-left' },
              { title: 'Arrow Up', value: 'arrow-up' },
              { title: 'Arrow Down', value: 'arrow-down' },
              { title: 'Arrow Down Right', value: 'arrow-down-right' },
              { title: 'Chevron Down', value: 'chevron-down' },
              { title: 'Arrow Return', value: 'arrow-return' },
              { title: 'Cursor Arrow', value: 'cursor-arrow' }
            ]
          },
          initialValue: 'none'
        })
      ]
    }),
  ],
})
