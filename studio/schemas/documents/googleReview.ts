import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'googleReview',
  title: 'Google Review',
  type: 'document',
  fields: [
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5)
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'reviewDate',
      title: 'Review Date',
      type: 'datetime'
    }),
    defineField({
      name: 'authorUrl',
      title: 'Author URL',
      type: 'url'
    }),
    defineField({
      name: 'relativeTimeDescription',
      title: 'Relative Time',
      type: 'string'
    })
  ]
})