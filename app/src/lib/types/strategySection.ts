import type { SanityImage } from './heroSection';

interface BaseSection {
    _type: string;
    _key: string;
    enabled: boolean;
    id?: string;
}

interface HeadlineProps {
    prefix: string;
    main: string;
}

interface VideoProps {
    youtubeId: string;
    buttonText: string;
    duration: string;
}

export interface StrategyHeroProps {
    enabled?: boolean;
    headline?: HeadlineProps;
    backgroundImage: SanityImage;
    statistics: {
        firstStat: {
            value: string;
            label: string;
        };
        secondStat: {
            value: string;
            label: string;
        };
    };
    cta: {
        text: string;
        link: string;
    };
    video?: VideoProps;
}

export interface StrategyHeroSection extends BaseSection {
    _type: 'strategyHeroSection';
    headline?: HeadlineProps;
    backgroundImage: SanityImage;
    statistics: {
        firstStat: {
            value: string;
            label: string;
        };
        secondStat: {
            value: string;
            label: string;
        };
    };
    cta: {
        text: string;
        link: string;
    };
    video?: VideoProps;
}

export interface StrategyIntroSection extends BaseSection {
    _type: 'strategyIntroSection';
    heading: {
        regular: string;
        thin: string;
    };
    content: {
        mainParagraph: string;
        secondaryParagraph: string;
    };
    teamCard: {
        members: Array<{
            image: SanityImage;
            name: string;
        }>;
        title: string;
        subtitle: string;
    };
    mainImage?: SanityImage;
}

interface BaseStrategyFeaturesSection extends BaseSection {
    badge: string;
    heading: {
        regular: string;
        highlighted: string;
    };
    content: {
        mainParagraph: string;
        secondaryParagraph: string;
    };
    features: Array<{
        title: string;
        subtitle: string;
        subtitle_hover: string;
        icon: 'time' | 'chart' | 'team';
        iconColor: 'primary' | 'blue' | 'green';
    }>;
    mainImage?: SanityImage;
    testimonial?: {
        image: SanityImage;
        title: string;
        description: string;
    };
}

export interface StrategyFeaturesSection extends BaseStrategyFeaturesSection {
    _type: 'strategyFeaturesSection';
}

export interface StrategyFeaturesSectionAlt extends BaseStrategyFeaturesSection {
    _type: 'strategyFeaturesSectionAlt';
}

export type StrategySection = 
    | StrategyHeroSection 
    | StrategyIntroSection 
    | StrategyFeaturesSection 
    | StrategyFeaturesSectionAlt;

export function isStrategySection(section: any): section is StrategySection {
    return [
        'strategyHeroSection',
        'strategyIntroSection',
        'strategyFeaturesSection',
        'strategyFeaturesSectionAlt'
    ].includes(section?._type);
}

export function isStrategyHeroSection(section: any): section is StrategyHeroSection {
    return section?._type === 'strategyHeroSection';
}

export function isStrategyIntroSection(section: any): section is StrategyIntroSection {
    return section?._type === 'strategyIntroSection';
}

export function isStrategyFeaturesSection(section: any): section is StrategyFeaturesSection {
    return section?._type === 'strategyFeaturesSection';
}

export function isStrategyFeaturesSectionAlt(section: any): section is StrategyFeaturesSectionAlt {
    return section?._type === 'strategyFeaturesSectionAlt';
}
