import type { Section } from '$lib/sanity/queries/types'
import type { ComingSoonSection } from '$lib/types/comingSoonSection'

export const isComingSoonSection = (section: Section): section is ComingSoonSection => {
    return section._type === 'comingSoonSection'
}
