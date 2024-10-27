import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Text Block',
  name: 'text',
  type: 'object',
  fields: [
    {
      title: 'Inhalt',
      name: 'content',
      type: 'text',
    },
  ],
});

  