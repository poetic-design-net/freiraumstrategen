import {defineField, defineType} from 'sanity'
import {ThListIcon} from '@sanity/icons'

type ThemeOption = 'light' | 'light-gray' | 'dark' | 'primary'
type PaddingValue = '12' | '20' | '24' | '32'

const themeOptions = [
  {title: 'Light (Weiß, dunkler Text)', value: 'light'},
  {title: 'Light Gray (Hellgrau, dunkler Text)', value: 'light-gray'},
  {title: 'Dark (Dunkel, heller Text)', value: 'dark'},
  {title: 'Primary (Brand Farbe, heller Text)', value: 'primary'},
]

const paddingOptions = [
  {title: 'Klein (12)', value: '12'},
  {title: 'Normal (20)', value: '20'},
  {title: 'Groß (24)', value: '24'},
  {title: 'Extra Groß (32)', value: '32'}
]

export default defineType({
  name: 'sectionStyles',
  title: 'Section Styles',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'theme',
      title: 'Farbschema',
      type: 'string',
      description: 'Wählen Sie ein vordefiniertes Farbschema für diese Section',
      initialValue: 'light' as ThemeOption,
      validation: Rule => Rule.custom((value: unknown) => {
        if (!value) return true
        return themeOptions.map(opt => opt.value).includes(value as ThemeOption)
          ? true
          : 'Ungültiges Farbschema'
      }),
      options: {
        list: themeOptions
      }
    }),
    defineField({
      name: 'padding',
      title: 'Padding',
      type: 'object',
      description: 'Abstand innerhalb der Section für verschiedene Bildschirmgrößen',
      fields: [
        {
          name: 'top',
          title: 'Oben (Mobile)',
          type: 'string',
          initialValue: '20' as PaddingValue,
          options: {
            list: paddingOptions
          }
        },
        {
          name: 'bottom',
          title: 'Unten (Mobile)',
          type: 'string',
          initialValue: '20' as PaddingValue,
          options: {
            list: paddingOptions
          }
        },
        {
          name: 'topMd',
          title: 'Oben (Tablet)',
          type: 'string',
          initialValue: '20' as PaddingValue,
          options: {
            list: paddingOptions
          }
        },
        {
          name: 'bottomMd',
          title: 'Unten (Tablet)',
          type: 'string',
          initialValue: '20' as PaddingValue,
          options: {
            list: paddingOptions
          }
        },
        {
          name: 'topLg',
          title: 'Oben (Desktop)',
          type: 'string',
          initialValue: '24' as PaddingValue,
          options: {
            list: paddingOptions
          }
        },
        {
          name: 'bottomLg',
          title: 'Unten (Desktop)',
          type: 'string',
          initialValue: '24' as PaddingValue,
          options: {
            list: paddingOptions
          }
        },
        {
          name: 'topXl',
          title: 'Oben (Großer Desktop)',
          type: 'string',
          initialValue: '24' as PaddingValue,
          options: {
            list: paddingOptions
          }
        },
        {
          name: 'bottomXl',
          title: 'Unten (Großer Desktop)',
          type: 'string',
          initialValue: '32' as PaddingValue,
          options: {
            list: paddingOptions
          }
        }
      ],
      validation: Rule => Rule.custom((value: Record<string, unknown> | undefined) => {
        if (!value) return true
        const validPaddingValues = paddingOptions.map(opt => opt.value)
        const paddingKeys = [
          'top', 'bottom',
          'topMd', 'bottomMd',
          'topLg', 'bottomLg',
          'topXl', 'bottomXl'
        ]

        for (const key of paddingKeys) {
          const paddingValue = value[key]
          if (paddingValue && !validPaddingValues.includes(paddingValue as PaddingValue)) {
            return `Ungültiger Padding-Wert für ${key}`
          }
        }
        return true
      })
    }),
    defineField({
      name: 'overflow',
      title: 'Overflow',
      type: 'boolean',
      description: 'Soll der Inhalt, der über die Section hinausgeht, versteckt werden?',
      initialValue: true
    }),
    defineField({
      name: 'customClasses',
      title: 'Zusätzliche CSS Klassen',
      type: 'string',
      description: 'Weitere Tailwind Klassen (für fortgeschrittene Benutzer)'
    })
  ],
  preview: {
    select: {
      theme: 'theme',
      overflow: 'overflow'
    },
    prepare({ theme, overflow }) {
      return {
        title: `Theme: ${theme || 'Default'}`,
        subtitle: `Overflow: ${overflow ? 'Hidden' : 'Visible'}`
      }
    }
  }
})
