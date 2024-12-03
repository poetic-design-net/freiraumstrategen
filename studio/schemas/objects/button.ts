import { defineField, defineType } from 'sanity'
import { ArrowRightIcon, ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon, ChevronDownIcon, UndoIcon, LaunchIcon } from '@sanity/icons'

export const buttonStyles = [
  { title: 'Primary', value: 'primary' },
  { title: 'Secondary', value: 'secondary' },
  { title: 'Orange', value: 'orange' }
]

export const buttonSizes = [
  { title: 'Small', value: 'sm' },
  { title: 'Medium', value: 'md' },
  { title: 'Large', value: 'lg' }
]

export const buttonPositions = [
  { title: 'Left', value: 'start' },
  { title: 'Center', value: 'center' },
  { title: 'Right', value: 'end' }
]

export const buttonIcons = [
  { title: 'None', value: 'none' },
  { title: 'Arrow Right', value: 'arrow-right', icon: ArrowRightIcon },
  { title: 'Arrow Left', value: 'arrow-left', icon: ArrowLeftIcon },
  { title: 'Arrow Up', value: 'arrow-up', icon: ArrowUpIcon },
  { title: 'Arrow Down', value: 'arrow-down', icon: ArrowDownIcon },
  { title: 'Arrow Down Right', value: 'arrow-down-right', icon: ArrowRightIcon },
  { title: 'Chevron Down', value: 'chevron-down', icon: ChevronDownIcon },
  { title: 'Arrow Return', value: 'arrow-return', icon: UndoIcon },
  { title: 'Cursor Arrow', value: 'cursor-arrow', icon: LaunchIcon }
]

export default defineType({
  type: 'object',
  name: 'button',
  title: 'Button',
  description: 'Add a button with customizable style and icon',
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
        list: buttonStyles
      },
      initialValue: 'primary'
    }),
    defineField({
      name: 'size',
      type: 'string',
      title: 'Button Size',
      description: 'Choose the size of the button',
      options: {
        list: buttonSizes
      },
      initialValue: 'md'
    }),
    defineField({
      name: 'position',
      type: 'string',
      title: 'Button Position',
      description: 'Choose the alignment of the button (left, center, or right)',
      options: {
        list: buttonPositions
      },
      initialValue: 'start'
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Button Icon',
      description: 'Choose an icon to display with the button text',
      options: {
        list: buttonIcons
      },
      initialValue: 'none'
    })
  ]
})
