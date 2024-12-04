import type { ComingSoonSection } from '$lib/types/comingSoonSection'

export const getComingSoonProps = (section: ComingSoonSection): ComingSoonSection => {
    return {
        ...section,
        _type: 'comingSoonSection',
        _key: section._key,
        enabled: section.enabled ?? true,
        title: section.title,
        subtitle: section.subtitle,
        backgroundImage: section.backgroundImage,
        button: section.button ? {
            text: section.button.text,
            link: section.button.link
        } : undefined
    }
}
