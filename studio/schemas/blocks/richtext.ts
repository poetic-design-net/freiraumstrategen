import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'richTextComponent',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'richText',
      title: 'Rich Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});