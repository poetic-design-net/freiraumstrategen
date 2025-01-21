<script lang="ts">
    import { useQuery } from '@sanity/svelte-loader';
    import type { LandingPageData } from '$lib/sanity/queries/pages';
    import { useScrollProgress } from '$lib/hooks/useScrollProgress';
    import { SEO, SectionRenderer } from '$lib/components/sections';
    import { page as storePage } from '$app/stores';
    import { onMount } from 'svelte';
    import { getThemeStyles } from '$lib/utils/sections';
    import { isSalesHeroSection } from '$lib/utils/sections/transformers/salesSections';
    import type { SalesHeroSection } from '$lib/types/salesHeroSection';
    import { videoButtonStore } from '$lib/stores/videoButton';
    import type { Section } from '$lib/sanity/queries/types';
    import type { QueryResponseInitial } from '@sanity/svelte-loader';
    import { isCanvasStyle } from '$lib/stores/layoutStyle';
    import CanvasHeader from '$lib/components/layout/CanvasHeader.svelte';
    import CanvasFooter from '$lib/components/layout/CanvasFooter.svelte';

    export let data: {
        query: string;
        params: { slug: string };
        initial: QueryResponseInitial<LandingPageData>;
    };

    // Create a reactive query that updates when params change
    $: currentParams = { slug: $storePage.params.landingPage };
    $: query = useQuery<LandingPageData>(data.query, currentParams, {
        initial: data.initial
    });

    // Extract header/footer from query data
    $: header = $query.data?.header;
    $: footer = $query.data?.footer;
    
    // Track loading state and directly use the query data
    $: isLoading = $query.loading;
    $: rawData = $query.data as LandingPageData;
    $: page = rawData;
    $: error = $query.error as Error | null;

    // Update canvas style state based on header/footer presence
    $: {
        const hasCustomHeaderFooter = Boolean(rawData?.header || rawData?.footer);
        isCanvasStyle.set(hasCustomHeaderFooter);
    }

    // Find the first enabled SalesHero section with a video button
    $: salesHeroSection = rawData?.sections?.find((section: Section) => {
        if (!isSalesHeroSection(section)) return false;
        return section.videoButton !== undefined;
    }) as SalesHeroSection | undefined;
    
    $: theme = getThemeStyles(salesHeroSection?.styles?.theme);
    
    // Update video button store only on valid landing pages with enabled video sections
    $: {
        const isValidLandingPage = Boolean(
            $storePage.params.landingPage && 
            salesHeroSection?.videoButton
        );

        videoButtonStore.set({
            data: isValidLandingPage && salesHeroSection?.videoButton ? salesHeroSection.videoButton : null,
            theme: isValidLandingPage && theme ? { text: theme.text } : undefined,
            isLandingPage: isValidLandingPage
        });
    }

    onMount(() => {
        return () => {
            // Reset video button store when component is destroyed
            videoButtonStore.set({
                data: null,
                theme: undefined,
                isLandingPage: false
            });
            // Reset canvas style when component is destroyed
            isCanvasStyle.set(false);
        };
    });

    const scrollProgress = useScrollProgress();
</script>

<!-- Main Content -->
{#if error}
    <div class="min-h-screen flex items-center justify-center">
        <p class="text-red-500">Error: {error?.message || 'Failed to load page'}</p>
    </div>
{:else if isLoading}
    <div class="min-h-screen animate-pulse bg-gray-50" />
{:else if !rawData}
    <div class="min-h-screen flex items-center justify-center">
        <p>No page data found for: {currentParams.slug}</p>
    </div>
{:else}
    {#if rawData.seo}
        <SEO data={rawData.seo} />
    {/if}

    {#if rawData.header}
        <CanvasHeader data={rawData.header} />
    {/if}

    {#if rawData.sections}
        {#each rawData.sections as section (section._key)}
            <SectionRenderer {section} scrollProgress={$scrollProgress} />
        {/each}
    {/if}

    {#if rawData.footer}
        <CanvasFooter data={rawData.footer} />
    {/if}
{/if}
