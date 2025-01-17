import type { Section } from '$lib/sanity/queries/types'
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import type { PortableTextBlock } from '@portabletext/types'

export interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'xing'
  url: string
}

export interface TeamMember {
  name: string
  position: string
  image: {
    _type: 'image'
    asset: SanityImageSource
    alt?: string
  }
  bio?: string
  socialLinks?: SocialLink[]
}

export interface CallToAction {
  text?: string
  link?: string
}

export interface TeamHeadline {
  eyebrow?: string
  title?: string
}

export interface UberunsTeamSection extends Section {
  _type: 'uberunsTeamSection'
  enabled: boolean
  headline: TeamHeadline
  description?: string
  fullWidthText?: PortableTextBlock[]
  teamMembers: TeamMember[]
  cta?: CallToAction
}

// Type guard
export function isUberunsTeamSection(section: any): section is UberunsTeamSection {
  return section._type === 'uberunsTeamSection'
}
