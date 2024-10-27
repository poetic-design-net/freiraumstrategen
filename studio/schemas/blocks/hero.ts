import { defineType } from 'sanity';

export default defineType({
  title: 'Hero Block',
  name: 'hero',
  type: 'object',
  fields: [
    { title: 'Überschrift', name: 'title', type: 'string' },
    { title: 'Beschreibung', name: 'description', type: 'text' },
    { title: 'Hintergrundbild', name: 'backgroundImage', type: 'image' },
  ],
});
