import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Navigations-Name',
        type: 'string',
        description: 'z.B. "Hauptmenü" oder "Footer Navigation"'
      }),
      defineField({
        name: 'identifier',
        title: 'Identifier',
        type: 'string',
        description: 'Technischer Name (z.B. "mainNav" oder "footerNav")',
        validation: (Rule) => Rule.required().regex(/^[a-z]+[a-zA-Z0-9]*$/).error('Bitte nur Buchstaben und Zahlen verwenden, beginnend mit einem Kleinbuchstaben')
      }),
      defineField({
        name: 'items',
        title: 'Menü-Einträge',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Titel',
              type: 'string'
            }),
            defineField({
              name: 'path',
              title: 'Pfad',
              type: 'string',
              description: 'z.B. /trading/ oder /blog/'
            }),
            defineField({
              name: 'columns',
              title: 'Dropdown-Spalten',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  defineField({
                    name: 'title',
                    title: 'Spalten-Titel',
                    type: 'string'
                  }),
                  defineField({
                    name: 'links',
                    title: 'Links',
                    type: 'array',
                    of: [{
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'title',
                          title: 'Link-Titel',
                          type: 'string'
                        }),
                        defineField({
                          name: 'href',
                          title: 'Link-URL',
                          type: 'string'
                        })
                      ]
                    }]
                  })
                ]
              }]
            }),
            defineField({
              name: 'featured',
              title: 'Featured Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Bild',
                  type: 'image'
                }),
                defineField({
                  name: 'title',
                  title: 'Titel',
                  type: 'string'
                }),
                defineField({
                  name: 'description',
                  title: 'Beschreibung',
                  type: 'text'
                }),
                defineField({
                  name: 'link',
                  title: 'Link',
                  type: 'string'
                })
              ]
            })
          ]
        }]
      })
    ],
    preview: {
      select: {
        title: 'title',
        identifier: 'identifier'
      },
      prepare({ title, identifier }: { title: string; identifier: string }) {
        return {
          title: title || 'Unbenannte Navigation',
          subtitle: `Identifier: ${identifier}`
        }
      }
    }
  })
