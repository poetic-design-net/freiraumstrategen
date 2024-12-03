<script lang="ts">
    import { useQuery } from '@sanity/svelte-loader';
    import type { LandingPageData } from '$lib/sanity/queries/pages';
    import { useScrollProgress } from '$lib/hooks/useScrollProgress';
    import { SEO, SectionRenderer } from '$lib/components/sections';
    import { page as storePage } from '$app/stores';
    import { onDestroy } from 'svelte';

    export let data: {
        query: string;
        params: { slug: string };
        options: {
            initial: {
                data: LandingPageData;
                sourceMap: any;
            };
        };
    };

    // Create a reactive query that updates when params change
    $: currentParams = { slug: $storePage.params.landingPage };
    $: query = useQuery<LandingPageData>(data.query, currentParams, {
        initial: data.options.initial
    });
    
    // Track loading state
    $: isLoading = $query.loading;
    $: page = $query.data;

    const scrollProgress = useScrollProgress();
</script>

{#if isLoading}
    <div class="min-h-screen animate-pulse bg-gray-50" />
{:else}
    {#if page?.seo}
        <SEO data={page.seo} />
    {/if}

    {#if page?.sections}
        {#each page.sections as section (section._key)}
            <SectionRenderer {section} scrollProgress={$scrollProgress} />
        {/each}
    {/if}
{/if}
