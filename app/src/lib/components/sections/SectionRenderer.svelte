<script lang="ts">
    import type { Section } from '$lib/sanity/queries/types';
    import type { StrategySection } from '$lib/types/strategySection';
    import type { Post, Testimonial } from '$lib/sanity/queries';
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
        getStrategyHeroProps,
        getStrategyIntroProps,
        getStrategyFeaturesProps,
        getFeatureSectionProps,
        isContentSectionAlt,
        getContentSectionAltProps,
        isStepSection,
        getStepSectionProps,
        getBlogSectionProps,
        getKachelSectionProps,
        getComingSoonProps
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
        SalesWhyContent
    } from '.';
    import ComingSoonSection from '$lib/templates/ComingSoonSection.svelte';

    export let section: Section | StrategySection;
    export let scrollProgress: number = 0;
    export let testimonials: Testimonial[] = [];
    export let posts: Post[] = [];
</script>

{#if section?.enabled}
    {#if isComingSoonSection(section)}
        <SectionContainer {section} fullHeight>
            <ComingSoonSection data={getComingSoonProps(section)} />
        </SectionContainer>
    {:else if isTestimonialsSection(section)}
        <SectionContainer {section}>
            <Testimonials_gsap data={getTestimonialsSectionProps(section)} />
        </SectionContainer>
    {:else if isCallToActionSection(section)}
        <SectionContainer {section} sticky>
            <Calltoaction {...getCallToActionProps(section)} />
        </SectionContainer>
    {:else if isKachelSection(section)}
        <SectionContainer {section} showOverlay overlayOpacity={Math.max(0, (scrollProgress - 0.5) * 2)}>
            <KachelSection data={getKachelSectionProps(section)} />
        </SectionContainer>
    {:else if isHeroSection(section)}
        <SectionContainer {section}>
            <HeroSection {...getHeroSectionProps(section)} />
        </SectionContainer>
    {:else if isSalesHeroSection(section)}
        <SectionContainer {section} fullHeight>
            <SalesHero data={getSalesHeroProps(section)} />
        </SectionContainer>
    {:else if isSalesAdvantagesSection(section)}
        <SectionContainer {section}>
            <SalesAdvantages data={getSalesAdvantagesProps(section)} />
        </SectionContainer>
    {:else if isSalesContentSection(section)}
        <SectionContainer {section}>
            <SalesContent data={getSalesContentProps(section)} />
        </SectionContainer>
    {:else if isSalesCurriculumSection(section)}
        <SectionContainer {section}>
            <SalesCurriculum data={getSalesCurriculumProps(section)} />
        </SectionContainer>
    {:else if isSalesEmotionalSection(section)}
        <SectionContainer {section}>
            <SalesEmotional data={getSalesEmotionalProps(section)} />
        </SectionContainer>
    {:else if isSalesEmotionalFreedomSection(section)}
        <SectionContainer {section}>
            <SalesEmotionalFreedom data={getSalesEmotionalFreedomProps(section)} />
        </SectionContainer>
    {:else if isSalesFaqSection(section)}
        <SectionContainer {section}>
            <SalesFaq data={getSalesFaqProps(section)} />
        </SectionContainer>
    {:else if isSalesFeaturesSection(section)}
        <SectionContainer {section}>
            <SalesFeatures data={getSalesFeaturesProps(section)} />
        </SectionContainer>
    {:else if isSalesForWhoSection(section)}
        <SectionContainer {section}>
            <SalesForWho data={getSalesForWhoProps(section)} />
        </SectionContainer>
    {:else if isSalesPricingSection(section)}
        <SectionContainer {section}>
            <SalesPricing data={getSalesPricingProps(section)} />
        </SectionContainer>
    {:else if isSalesWhyContentSection(section)}
        <SectionContainer {section}>
            <SalesWhyContent data={getSalesWhyContentProps(section)} />
        </SectionContainer>
    {:else if isCaseSection(section)}
        {@const props = getCaseSectionProps(section)}
        {#if props.selectedPages.length > 0 || props.selectedPosts.length > 0}
            <SectionContainer {section}>
                <CaseSection_gsap data={props} />
            </SectionContainer>
        {/if}
    {:else if isContentSectionAlt(section)}
        <SectionContainer {section}>
            <ContentSection_alt data={getContentSectionAltProps(section)} />
        </SectionContainer>
    {:else if isStepSection(section)}
        <SectionContainer {section}>
            <StepSection data={getStepSectionProps(section)} />
        </SectionContainer>
    {:else if isFeatureSection(section)}
        <SectionContainer {section}>
            <FeaturesSection data={getFeatureSectionProps(section)} />
        </SectionContainer>
    {:else if isContentSection(section)}
        <SectionContainer {section}>
            <ContentSection {...getContentSectionProps(section)} {section} />
        </SectionContainer>
    {:else if isStrategyHeroSection(section)}
        <SectionContainer {section}>
            <StrategyHeroSection {...getStrategyHeroProps(section)} />
        </SectionContainer>
    {:else if isStrategyIntroSection(section)}
        <SectionContainer {section}>
            <StrategyIntroSection data={getStrategyIntroProps(section)} />
        </SectionContainer>
    {:else if isStrategyFeaturesSection(section)}
        {@const props = getStrategyFeaturesProps(section)}
        {#if props._type === 'strategyFeaturesSection'}
            <SectionContainer {section}>
                <StrategyFeaturesSection data={props} />
            </SectionContainer>
        {/if}
    {:else if isStrategyFeaturesSectionAlt(section)}
        {@const props = getStrategyFeaturesProps(section)}
        {#if props._type === 'strategyFeaturesSectionAlt'}
            <SectionContainer {section}>
                <StrategyFeaturesSection_alt data={props} />
            </SectionContainer>
        {/if}
    {:else if isBlogSection(section)}
        <SectionContainer {section}>
            <BlogSection {...getBlogSectionProps({ ...section, posts })} />
        </SectionContainer>
    {/if}
{/if}
