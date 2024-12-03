import {defineField} from 'sanity'

export const anchorField = defineField({
  name: 'id',
  title: 'Anchor ID',
  type: 'string',
  description: 'Eine eindeutige ID für Ankerlinks zu dieser Sektion (z.B. "ueber-uns" für #ueber-uns)',
  validation: (Rule) => Rule.regex(/^[a-z0-9-]+$/).error('ID darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten')
})
