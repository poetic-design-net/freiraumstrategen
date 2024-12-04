import type { BaseSection } from './sections'
import type { SanityImage } from './heroSection'

export interface ComingSoonSection extends BaseSection {
    _type: 'comingSoonSection'
    title?: string
    subtitle?: string
    backgroundImage?: SanityImage
    button?: {
        text?: string
        link?: string
    }
}
