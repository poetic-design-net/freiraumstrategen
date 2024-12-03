<script lang="ts">
    import { useQuery } from '@sanity/svelte-loader';
    import type { LandingPageData } from '$lib/sanity/queries/pages';
    import { useScrollProgress } from '$lib/hooks/useScrollProgress';
    import { SEO, SectionRenderer } from '$lib/components/sections';
    import { page as storePage } from '$app/stores';
    import { onMount } from 'svelte';

    export let data: {
        query: string;
        params: { slug: string };
        options: {
            initial: any;
        };
    };

    // Create a reactive query that updates when params change
    $: currentParams = { slug: $storePage.params.landingPage };
    $: query = useQuery(data.query, currentParams, {
        initial: data.options.initial
    });
    
    // Track loading state and directly use the query data
    $: isLoading = $query.loading;
    $: rawData = $query.data as any;
    $: page = rawData as LandingPageData;
    $: error = $query.error as Error | null;

    onMount(() => {
        console.log('Debug - Component mounted with:', {
            currentParams,
            initialData: data.options.initial,
            pageData: page,
            error,
            rawQueryData: rawData
        });
    });

    // Debug logging for state changes
    $: {
        if (error) {
            console.error('Debug - Query error:', error);
        }
        if (rawData) {
            console.log('Debug - Raw data:', rawData);
            console.log('Debug - Page data loaded:', {
                title: rawData.title,
                slug: rawData.slug,
                hasSections: !!rawData.sections,
                sectionCount: rawData.sections?.length,
                fullData: rawData
            });
        }
    }

    const scrollProgress = useScrollProgress();
</script>

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

    {#if rawData.sections}
        {#each rawData.sections as section (section._key)}
            <SectionRenderer {section} scrollProgress={$scrollProgress} />
        {/each}
    {/if}
{/if}
