<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { Section, SEO } from '$lib/sanity/queries/types';
	import type { Post, Testimonial } from '$lib/sanity/queries';
	import { useScrollProgress } from '$lib/hooks/useScrollProgress';
	import { SEO as SEOComponent, SectionRenderer } from '$lib/components/sections';

	interface FrontpageData {
		title: string;
		seo?: SEO;
		sections?: Section[];
	}

	export let data;
	const frontpageQ = useQuery(data.frontpageQuery, {}, data.frontpageOptions);
	const testimonialsQ = useQuery(data.testimonialsQuery, {}, data.testimonialsOptions);
	const postsQ = useQuery(data.postsQuery, {}, data.postsOptions);

	$: frontpage = $frontpageQ?.data as FrontpageData;
	$: testimonials = $testimonialsQ?.data as Testimonial[];
	$: posts = $postsQ?.data as Post[];

	const scrollProgress = useScrollProgress();
</script>

{#if frontpage?.seo}
	<SEOComponent data={frontpage.seo} />
{/if}

{#if frontpage?.sections}
	{#each frontpage.sections as section (section._key)}
		<SectionRenderer 
			{section} 
			{testimonials}
			{posts}
			scrollProgress={$scrollProgress} 
		/>
	{/each}
{/if}
