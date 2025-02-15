import {defineField, defineType} from 'sanity'
import {getSectionArray} from '../utils/getSectionTypes'

export default defineType({
  name: 'landingPage',
  title: 'Landing Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Der Haupttitel der Landing Page',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug', 
      description: 'Die URL der Landing Page (z.B. strategiegespraech)',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'reference',
      weak: true,
      to: [{type: 'header'}],
      description: 'Wählen Sie einen individuellen Header für diese Seite (optional)'
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'reference',
      weak: true,
      to: [{type: 'footer'}],
      description: 'Wählen Sie einen individuellen Footer für diese Seite (optional)'
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      description: 'Eine kurze Beschreibung der Landing Page für Vorschauen und SEO',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    }),
    defineField({
      ...getSectionArray(),
      validation: Rule => Rule.required().min(1),
      options: {
        modal: {
          type: 'dialog',
          width: 'auto'
        },
        // Use list layout for larger previews
        layout: 'list'
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current'
    },
    prepare({title, slug}) {
      return {
        title: title || 'Untitled Landing Page',
        subtitle: `/${slug || ''}`
      }
    }
  }
})
