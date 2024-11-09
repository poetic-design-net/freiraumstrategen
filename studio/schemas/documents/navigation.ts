export default {
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Navigations-Name',
        type: 'string',
        description: 'z.B. "Hauptmenü" oder "Footer Navigation"'
      },
      {
        name: 'identifier',
        title: 'Identifier',
        type: 'string',
        description: 'Technischer Name (z.B. "mainNav" oder "footerNav")',
        validation: (Rule: any) => Rule.required().regex(/^[a-z]+[a-zA-Z0-9]*$/).error('Bitte nur Buchstaben und Zahlen verwenden, beginnend mit einem Kleinbuchstaben')
      },
      {
        name: 'items',
        title: 'Menü-Einträge',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titel',
              type: 'string'
            },
            {
              name: 'path',
              title: 'Pfad',
              type: 'string',
              description: 'z.B. /trading/ oder /blog/'
            },
            {
              name: 'columns',
              title: 'Dropdown-Spalten',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  {
                    name: 'title',
                    title: 'Spalten-Titel',
                    type: 'string'
                  },
                  {
                    name: 'links',
                    title: 'Links',
                    type: 'array',
                    of: [{
                      type: 'object',
                      fields: [
                        {
                          name: 'title',
                          title: 'Link-Titel',
                          type: 'string'
                        },
                        {
                          name: 'href',
                          title: 'Link-URL',
                          type: 'string'
                        }
                      ]
                    }]
                  }
                ]
              }]
            },
            {
              name: 'featured',
              title: 'Featured Content',
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Bild',
                  type: 'image'
                },
                {
                  name: 'title',
                  title: 'Titel',
                  type: 'string'
                },
                {
                  name: 'description',
                  title: 'Beschreibung',
                  type: 'text'
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'string'
                }
              ]
            }
          ]
        }]
      }
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
  }