<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import Card from '$lib/components/Card.svelte';
	import Welcome from '$lib/components/Welcome.svelte';
	import type { PageData } from './$types';

//	import HeroSection from '$lib/templates/HeroSection.svelte';
	import CaseSection from '$lib/templates/CaseSection.svelte';
	import Calltoaction from '$lib/templates/Calltoaction.svelte';
	import FeaturesSection from '$lib/templates/FeaturesSection.svelte';
	import StepSection from '$lib/templates/StepSection.svelte';
	//import Meteors from "$lib/components/Meteors.svelte";
	import ContentSection from '$lib/templates/ContentSection.svelte';	
	import ContentSection_alt from '$lib/templates/ContentSection_alt.svelte';	
	import Testimonials from '$lib/templates/Testimonials.svelte';
	import KachelSection from '$lib/templates/KachelSection.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;
	const q = useQuery(data);
	const testimonialsQ = useQuery(data.testimonialsQuery, {}, {
		...data.testimonialsOptions,
		initial: data.testimonialsOptions?.initial || { data: [] }
	});

	$: ({ data: posts } = $q);
	$: testimonials = $testimonialsQ?.data || [];

// Beispiel für eine Load-Funktion

export async function load({ params, cookies }: { params: any, cookies: any }) {
	
  const preview = cookies.get('preview') === 'true';

  const client = preview
    ? useQuery.withConfig({
        token: import.meta.env.SANITY_API_READ_TOKEN, // Token mit Lesezugriff
        useCdn: false,
      })
    : useQuery;

  const data = await client.fetch(/* Deine GROQ-Abfrage */);

  return { data };

  
}

	let scrollProgress = 0;
	
	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			const section = document.querySelector('section:has(.sticky)');
			if (section) {
				const rect = section.getBoundingClientRect();
				const viewportHeight = window.innerHeight;
				const totalHeight = section.offsetHeight + viewportHeight;
				const scrolled = window.scrollY;
				scrollProgress = Math.min(Math.max(scrolled / totalHeight, 0), 1);
			}
		});
	}



	// Dann erst die Komponente rendern
</script>

<!-- Test-Content vor dem eigentlichen Content -->

<section class="relative overflow-hidden">
		<!-- <Meteors number={30} /> -->
		<!-- <HeroSection /> -->

</section>

<section class="relative pt-32 pb-32 xl:pb-32 overflow-hidden">
	<CaseSection {posts} />
</section>

<section class="relative py-20 lg:py-24 overflow-hidden bg-gray-100">	
	<div class="container px-4 mx-auto">
		<ContentSection_alt />	
	</div>	
</section>

<section class="relative text-dark py-20 lg:pb-48">
	<div class="container px-4 mx-auto">
		<StepSection />	
	</div>	
</section>

<section class="relative py-20 lg:pt-32 lg:pb-36 bg-gray-50 overflow-hidden">
	<div class="container px-4 mx-auto">
		<Testimonials {testimonials} />	
	</div>	
</section>

<section class="relative py-32 overflow-hidden">	
	<div class="container px-4 mx-auto">
		<FeaturesSection />	
	</div>	
</section>

<section class="relative bg-gray-50 py-32 overflow-hidden">	
	<div class="container px-4 mx-auto">
		<ContentSection />	
	</div>	
</section>

<div class="relative">
  <section class="relative w-full h-[200vh]">
    <div class="sticky top-0 w-full h-screen">
      <Calltoaction />
    </div>
  </section>

  <section class="relative py-20 lg:py-24 overflow-hidden">	
    <div 
      class="absolute inset-0"
      style="opacity: {Math.max(0, (scrollProgress - 0.5) * 2)};"
    ></div>
    <div class="container px-4 mx-auto relative z-10">
      <KachelSection />	
    </div>	
  </section>
</div>


<!-- <section>
	{#if posts.length}
		{#each posts as post}
			<Card {post} />
		{/each}
	{:else}
		<Welcome />
	{/if}
</section> -->
