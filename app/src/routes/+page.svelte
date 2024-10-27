<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import Card from '$lib/components/Card.svelte';
	import Welcome from '$lib/components/Welcome.svelte';
	import type { PageData } from './$types';

	import HeroSection from '$lib/templates/HeroSection.svelte';
	import CaseSection from '$lib/templates/CaseSection.svelte';
	import Calltoaction from '$lib/templates/Calltoaction.svelte';
	import FeaturesSection from '$lib/templates/FeaturesSection.svelte';
	import StepSection from '$lib/templates/StepSection.svelte';
	import Meteors from "$lib/components/Meteors.svelte";
	import ContentSection from '$lib/templates/ContentSection.svelte';	
	import ContentSection_alt from '$lib/templates/ContentSection_alt.svelte';	
	import Testimonials from '$lib/templates/Testimonials.svelte';
	
	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: posts } = $q);
</script>
<Meteors number={30} />
<section class="relative overflow-hidden">
	
	<HeroSection />
</section>

<section class="relative pt-32 pb-32 xl:pb-32 overflow-hidden">
	<CaseSection {posts} />
</section>

<section class="relative py-20 lg:py-24 overflow-hidden">	
	<div class="container px-4 mx-auto">
		<ContentSection_alt />	
	</div>	
</section>

<section class="relative text-dark py-32">
	<div class="container px-4 mx-auto">
		<StepSection />	
	</div>	
</section>

<section class="relative py-20 lg:pt-32 lg:pb-36 bg-gray-50 overflow-hidden">
	<div class="container px-4 mx-auto">
		<Testimonials {posts} />	
	</div>	
</section>

<section class="relative py-32 overflow-hidden">	
	<div class="container px-4 mx-auto">
		<FeaturesSection />	
	</div>	
</section>

<section class="relative py-32 overflow-hidden">	
	<div class="container px-4 mx-auto">
		<Calltoaction />	
	</div>	
</section>

		
<section class="relative py-20 lg:py-24 bg-primary-950 overflow-hidden">	
	<div class="container px-4 mx-auto">
		<ContentSection />	
	</div>	
</section>

<!-- <section>
	{#if posts.length}
		{#each posts as post}
			<Card {post} />
		{/each}
	{:else}
		<Welcome />
	{/if}
</section> -->
