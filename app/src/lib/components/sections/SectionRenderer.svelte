<script lang="ts">
import type { Section } from '$lib/sanity/queries/types';
import type { StrategySection } from '$lib/types/strategySection';
import type { Post, Testimonial } from '$lib/sanity/queries';
import type {
    SalesAdvantagesSection,
    SalesContentSection,
    SalesCurriculumSection,
    SalesEmotionalSection,
    SalesEmotionalFreedomSection,
    SalesFaqSection,
    SalesFeaturesSection,
    SalesForWhoSection,
    SalesPricingSection,
    SalesWhyContentSection
} from '$lib/types/salesSections';
import {
    isHeroSection,
    isContentSection,
    isCallToActionSection,
    isCaseSection,
    isTestimonialsSection,
    isStrategyHeroSection,
    isStrategyIntroSection,
    isStrategyFeaturesSection,
    isStrategyFeaturesSectionAlt,
    isFeatureSection,
    isBlogSection,
    isKachelSection,
    isComingSoonSection,
    getHeroSectionProps,
    getContentSectionProps,
    getCallToActionProps,
    getCaseSectionProps,
    getTestimonialsSectionProps,
    getFeatureSectionProps,
    isContentSectionAlt,
    getContentSectionAltProps,
    isStepSection,
    getStepSectionProps,
    getBlogSectionProps,
    getKachelSectionProps,
    getComingSoonProps,
    isUberunsTeamSection,
    getUberunsTeamProps,
} from '$lib/utils/sections/index';
import {
    isSalesHeroSection,
    getSalesHeroProps,
    isSalesAdvantagesSection,
    getSalesAdvantagesProps,
    isSalesContentSection,
    getSalesContentProps,
    isSalesCurriculumSection,
    getSalesCurriculumProps,
    isSalesEmotionalSection,
    getSalesEmotionalProps,
    isSalesEmotionalFreedomSection,
    getSalesEmotionalFreedomProps,
    isSalesFaqSection,
    getSalesFaqProps,
    isSalesFeaturesSection,
    getSalesFeaturesProps,
    isSalesForWhoSection,
    getSalesForWhoProps,
    isSalesPricingSection,
    getSalesPricingProps,
    isSalesWhyContentSection, 
    getSalesWhyContentProps
} from '$lib/utils/sections/transformers/salesSections';
import {
    HeroSection,
    Calltoaction,
    FeaturesSection,
    StepSection,
    ContentSection,
    ContentSection_alt,
    Testimonials_gsap,
    CaseSection_gsap,
    KachelSection,
    StrategyHeroSection,
    StrategyIntroSection,
    StrategyFeaturesSection,
    StrategyFeaturesSection_alt,
    BlogSection,
    SectionContainer,
    SalesHero,
    SalesAdvantages,
    SalesContent,
    SalesCurriculum,
    SalesEmotional,
    SalesEmotionalFreedom,
    SalesFaq,
    SalesFeatures,
    SalesForWho,
    SalesPricing,
    SalesWhyContent,
    UberunsTeamSection,
    ReviewSection
} from '.';
import ComingSoonSection from '$lib/templates/ComingSoonSection.svelte';

type AnySection = Section | StrategySection | 
    SalesAdvantagesSection & Section |
    SalesContentSection & Section |
    SalesCurriculumSection & Section |
    SalesEmotionalSection & Section |
    SalesEmotionalFreedomSection & Section |
    SalesFaqSection & Section |
    SalesFeaturesSection & Section |
    SalesForWhoSection & Section |
    SalesPricingSection & Section |
    SalesWhyContentSection & Section;

export let section: AnySection;
export let scrollProgress = 0;
export let testimonials: Testimonial[] = [];
export let posts: Post[] = [];

interface SectionConfig {
    isType: (section: AnySection) => boolean;
    getProps: (section: any) => any;
    component: any;
    containerProps?: {
        fullHeight?: boolean;
        sticky?: boolean;
        showOverlay?: boolean;
        overlayOpacity?: number;
    };
    conditional?: (props: any) => boolean;
}

const sectionConfigs: SectionConfig[] = [
    {
        isType: (section) => section._type === 'reviewSection',
        getProps: (section) => ({
            ...section,
            reviews: [] // Die Reviews werden später durch die API befüllt
        }),
        component: ReviewSection
    },
    {
        isType: isComingSoonSection,
        getProps: getComingSoonProps,
        component: ComingSoonSection,
        containerProps: { fullHeight: true }
    },
    {
        isType: isTestimonialsSection,
        getProps: getTestimonialsSectionProps,
        component: Testimonials_gsap
    },
    {
        isType: isCallToActionSection,
        getProps: getCallToActionProps,
        component: Calltoaction,
        containerProps: { sticky: true }
    },
    {
        isType: isKachelSection,
        getProps: getKachelSectionProps,
        component: KachelSection,
        containerProps: { 
            showOverlay: true,
            overlayOpacity: Math.max(0, (scrollProgress - 0.5) * 2)
        }
    },
    {
        isType: isHeroSection,
        getProps: getHeroSectionProps,
        component: HeroSection
    },
    {
        isType: isSalesHeroSection,
        getProps: getSalesHeroProps,
        component: SalesHero,
        containerProps: { fullHeight: true }
    },
    {
        isType: isCaseSection,
        getProps: getCaseSectionProps,
        component: CaseSection_gsap,
        conditional: (props) => props.selectedPages.length > 0 || props.selectedPosts.length > 0
    },
    {
        isType: isContentSectionAlt,
        getProps: getContentSectionAltProps,
        component: ContentSection_alt
    },
    {
        isType: isStepSection,
        getProps: getStepSectionProps,
        component: StepSection
    },
    {
        isType: isFeatureSection,
        getProps: getFeatureSectionProps,
        component: FeaturesSection
    },
    {
        isType: isContentSection,
        getProps: getContentSectionProps,
        component: ContentSection
    },
    {
        isType: isStrategyHeroSection,
        getProps: (section) => section,
        component: StrategyHeroSection
    },
    {
        isType: isStrategyIntroSection,
        getProps: (section) => section,
        component: StrategyIntroSection
    },
    {
        isType: isStrategyFeaturesSection,
        getProps: (section) => section,
        component: StrategyFeaturesSection,
        conditional: (props) => props._type === 'strategyFeaturesSection'
    },
    {
        isType: isStrategyFeaturesSectionAlt,
        getProps: (section) => section,
        component: StrategyFeaturesSection_alt,
        conditional: (props) => props._type === 'strategyFeaturesSectionAlt'
    },
    {
        isType: isBlogSection,
        getProps: (section) => getBlogSectionProps({ ...section, posts }),
        component: BlogSection
    },
    {
        isType: isUberunsTeamSection,
        getProps: getUberunsTeamProps,
        component: UberunsTeamSection
    }
];

const salesSectionConfigs: SectionConfig[] = [
    {
        isType: isSalesAdvantagesSection,
        getProps: getSalesAdvantagesProps,
        component: SalesAdvantages
    },
    {
        isType: isSalesContentSection,
        getProps: getSalesContentProps,
        component: SalesContent
    },
    {
        isType: isSalesCurriculumSection,
        getProps: getSalesCurriculumProps,
        component: SalesCurriculum
    },
    {
        isType: isSalesEmotionalSection,
        getProps: getSalesEmotionalProps,
        component: SalesEmotional
    },
    {
        isType: isSalesEmotionalFreedomSection,
        getProps: getSalesEmotionalFreedomProps,
        component: SalesEmotionalFreedom
    },
    {
        isType: isSalesFaqSection,
        getProps: getSalesFaqProps,
        component: SalesFaq
    },
    {
        isType: isSalesFeaturesSection,
        getProps: getSalesFeaturesProps,
        component: SalesFeatures
    },
    {
        isType: isSalesForWhoSection,
        getProps: getSalesForWhoProps,
        component: SalesForWho
    },
    {
        isType: isSalesPricingSection,
        getProps: getSalesPricingProps,
        component: SalesPricing
    },
    {
        isType: isSalesWhyContentSection,
        getProps: getSalesWhyContentProps,
        component: SalesWhyContent
    }
];
</script>

{#if section?.enabled}
    {#each sectionConfigs as config}
        {#if config.isType(section)}
            {@const props = config.getProps(section)}
            {#if !config.conditional || config.conditional(props)}
                <SectionContainer {section} {...config.containerProps || {}}>
                    <svelte:component this={config.component} data={props} {...props} {section} />
                </SectionContainer>
            {/if}
        {/if}
    {/each}

    {#each salesSectionConfigs as config}
        {#if config.isType(section)}
            <SectionContainer {section}>
                <svelte:component 
                    this={config.component} 
                    data={config.getProps(section)} 
                />
            </SectionContainer>
        {/if}
    {/each}
{/if}
