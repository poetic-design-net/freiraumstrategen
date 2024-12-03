<script lang="ts">
    import { useQuery } from '@sanity/svelte-loader';
    import type { LandingPageData } from '$lib/sanity/queries';
    import type { StrategyIntroSection as StrategyIntroSectionType } from '$lib/sanity/queries/types';
    import type { Section } from '$lib/sanity/queries/types';
    import ImageRenderer from '$lib/components/ImageRenderer.svelte';
    import { formatDate } from '$lib/utils';
    import { urlFor } from '$lib/sanity/image';
    import { sanitizeText } from '$lib/utils';
    import StrategyHeroSection from '$lib/templates/StrategyHeroSection.svelte';
    import ContentSection from '$lib/templates/ContentSection.svelte';
    import StrategyIntroSection from '$lib/templates/StrategyIntroSection.svelte';
    import StrategyFeaturesSection from '$lib/templates/StrategyFeaturesSection.svelte';
    import StrategyFeaturesSection_alt from '$lib/templates/StrategyFeaturesSection_alt.svelte';
    import Calltoaction from '$lib/templates/Calltoaction.svelte';
    import { landingPageQuery } from '$lib/sanity/queries';
    import { getStrategyIntroProps, isStrategyIntroSection } from '$lib/utils/sections';
  
    let scrollProgress = 0;

    const query = landingPageQuery;
    const params = { slug: 'strategiespraeche' };
    const pageData = useQuery<LandingPageData>(query, params);

    $: data = $pageData?.result;
    $: sections = data?.sections || [];
    $: strategyIntroSection = sections.find((section: Section) => isStrategyIntroSection(section)) as StrategyIntroSectionType | undefined;
    $: strategyIntroProps = strategyIntroSection ? {
        ...getStrategyIntroProps(strategyIntroSection),
        _type: strategyIntroSection._type,
        _key: strategyIntroSection._key
    } : undefined;

    $: console.log('Page Data:', data);
    $: console.log('Sections:', sections);
    $: console.log('Strategy Intro Section:', strategyIntroSection);
    $: console.log('Strategy Intro Props:', strategyIntroProps);
</script>

<section 
  class="relative overflow-hidden"
  style="
    height: calc(100dvh - var(--header-height));
    padding-top: var(--header-height);
  "
>
  {#if sections.length > 0}
    <StrategyHeroSection data={sections.find((section: Section) => section._type === 'strategyHeroSection')} />
  {/if}
</section>

<section class="relative py-20 lg:py-32 overflow-hidden">
    {#if strategyIntroProps}
        <StrategyIntroSection data={strategyIntroProps} />
    {/if}
</section>

<section class="relative py-12 lg:py-16 z-10">
    {#if sections.length > 0}
        <StrategyFeaturesSection data={sections.find((section: Section) => section._type === 'strategyFeaturesSection')} />
    {/if}
</section>

<section class="relative py-24 pt-32 overflow-hidden">
    <!-- Background Gradients -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 
        bg-[radial-gradient(circle_at_top_left,theme(colors.primary.50),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(var(--primary-rgb),0.05),transparent_30%)]"
      ></div>
      
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -inset-[100%] 
          bg-[radial-gradient(70%_70%_at_50%_50%,theme(colors.primary.50)_0%,transparent_100%)] 
          opacity-30
          animate-[spin_75s_linear_infinite]"
        ></div>
        <div class="absolute inset-0 backdrop-blur-[120px]"></div>
      </div>
  
      <!-- Wichtig: Übergangs-Gradient innerhalb der ersten Section -->
      <div class="absolute inset-x-0 bottom-0 h-64 
        bg-gradient-to-b 
        from-transparent 
        via-white/80
        to-white"
      ></div>
    </div>
  
    <!-- Content -->
    <div class="relative z-10">
      <ContentSection />
    </div>
  </section>

  <section class="relative w-full min-h-dvh lg:min-h-[200vh]">
    <div class="relative lg:sticky lg:top-0 w-full min-h-dvh">
      <Calltoaction />
    </div>
  </section>

  <section class="relative py-20 lg:py-24 overflow-hidden">	
    <div 
      class="absolute inset-0 hidden lg:block"
      style="opacity: {Math.max(0, (scrollProgress - 0.5) * 2)};"
    ></div>
    <div class=" mx-auto relative z-10">
      {#if sections.length > 0}
        <StrategyFeaturesSection_alt data={sections.find((section: Section) => section._type === 'strategyFeaturesSectionAlt')} />
      {/if}
    </div>	
  </section>
