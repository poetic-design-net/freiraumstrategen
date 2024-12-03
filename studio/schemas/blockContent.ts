import {defineType, defineArrayMember, defineField} from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
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
    // Hier wird der Bildtyp hinzugefügt
    defineArrayMember({
      title: 'Bild',
      type: 'image',
      options: {
        hotspot: false, // Ermöglicht das Zuschneiden des Bildes
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
          type: 'url', // Hier URLs verwenden, um YouTube-Links zu speichern
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
