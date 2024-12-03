<script lang="ts">
    import type { Section } from '$lib/sanity/queries/types';
    import type { StrategySection } from '$lib/types/strategySection';
    import type { Post, Testimonial } from '$lib/sanity/queries';
    import {
        getSectionClasses,
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
        getKachelSectionProps
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

    export let section: Section | StrategySection;
    export let scrollProgress: number = 0;
    export let testimonials: Testimonial[] = [];
    export let posts: Post[] = [];
</script>

{#if section?.enabled}
    <section 
        class={getSectionClasses(section._type)} 
        {...section.id ? { id: section.id } : {}}
    >
        {#if isTestimonialsSection(section)}
            <SectionContainer>
                <Testimonials_gsap data={getTestimonialsSectionProps(section)} />
            </SectionContainer>
        {:else if isCallToActionSection(section)}
            <SectionContainer sticky>
                <Calltoaction {...getCallToActionProps(section)} />
            </SectionContainer>
        {:else if isKachelSection(section)}
            <SectionContainer showOverlay overlayOpacity={Math.max(0, (scrollProgress - 0.5) * 2)}>
                <KachelSection data={getKachelSectionProps(section)} />
            </SectionContainer>
        {:else if isHeroSection(section)}
            <SectionContainer>
                <HeroSection {...getHeroSectionProps(section)} />
            </SectionContainer>
        {:else if isSalesHeroSection(section)}
            <SectionContainer>
                <SalesHero data={getSalesHeroProps(section)} />
            </SectionContainer>
        {:else if isSalesAdvantagesSection(section)}
            <SectionContainer>
                <SalesAdvantages data={getSalesAdvantagesProps(section)} />
            </SectionContainer>
        {:else if isSalesContentSection(section)}
            <SectionContainer>
                <SalesContent data={getSalesContentProps(section)} />
            </SectionContainer>
        {:else if isSalesCurriculumSection(section)}
            <SectionContainer>
                <SalesCurriculum data={getSalesCurriculumProps(section)} />
            </SectionContainer>
        {:else if isSalesEmotionalSection(section)}
            <SectionContainer>
                <SalesEmotional data={getSalesEmotionalProps(section)} />
            </SectionContainer>
        {:else if isSalesEmotionalFreedomSection(section)}
            <SectionContainer>
                <SalesEmotionalFreedom data={getSalesEmotionalFreedomProps(section)} />
            </SectionContainer>
        {:else if isSalesFaqSection(section)}
            <SectionContainer>
                <SalesFaq data={getSalesFaqProps(section)} />
            </SectionContainer>
        {:else if isSalesFeaturesSection(section)}
            <SectionContainer>
                <SalesFeatures data={getSalesFeaturesProps(section)} />
            </SectionContainer>
        {:else if isSalesForWhoSection(section)}
            <SectionContainer>
                <SalesForWho data={getSalesForWhoProps(section)} />
            </SectionContainer>
        {:else if isSalesPricingSection(section)}
            <SectionContainer>
                <SalesPricing data={getSalesPricingProps(section)} />
            </SectionContainer>
        {:else if isSalesWhyContentSection(section)}
            <SectionContainer>
                <SalesWhyContent data={getSalesWhyContentProps(section)} />
            </SectionContainer>
        {:else if isCaseSection(section)}
            {@const props = getCaseSectionProps(section)}
            {#if props.selectedPages.length > 0 || props.selectedPosts.length > 0}
                <SectionContainer>
                    <CaseSection_gsap data={props} />
                </SectionContainer>
            {/if}
        {:else if isContentSectionAlt(section)}
            <SectionContainer>
                <ContentSection_alt data={getContentSectionAltProps(section)} />
            </SectionContainer>
        {:else if isStepSection(section)}
            <SectionContainer>
                <StepSection data={getStepSectionProps(section)} />
            </SectionContainer>
        {:else if isFeatureSection(section)}
            <SectionContainer>
                <FeaturesSection data={getFeatureSectionProps(section)} />
            </SectionContainer>
        {:else if isContentSection(section)}
            <ContentSection {...getContentSectionProps(section)} />
        {:else if isStrategyHeroSection(section)}
            <StrategyHeroSection {...getStrategyHeroProps(section)} />
        {:else if isStrategyIntroSection(section)}
            <StrategyIntroSection data={getStrategyIntroProps(section)} />
        {:else if isStrategyFeaturesSection(section)}
            {@const props = getStrategyFeaturesProps(section)}
            {#if props._type === 'strategyFeaturesSection'}
                <SectionContainer>
                    <StrategyFeaturesSection data={props} />
                </SectionContainer>
            {/if}
        {:else if isStrategyFeaturesSectionAlt(section)}
            {@const props = getStrategyFeaturesProps(section)}
            {#if props._type === 'strategyFeaturesSectionAlt'}
                <SectionContainer>
                    <StrategyFeaturesSection_alt data={props} />
                </SectionContainer>
            {/if}
        {:else if isBlogSection(section)}
            <BlogSection {...getBlogSectionProps({ ...section, posts })} />
        {/if}
    </section>
{/if}
