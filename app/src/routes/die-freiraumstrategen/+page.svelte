<script lang="ts">
import UberunsHeroSection from '$lib/templates/UberunsHeroSection.svelte';
import UberunsIntroSection from '$lib/templates/UberunsIntroSection.svelte';
import { useQuery } from '@sanity/svelte-loader';
import type { PageData } from './$types';
import type { TeamSectionResponse } from '$lib/sanity/queries';
import { SectionRenderer } from '$lib/components/sections';
import Testimonials from '$lib/templates/Testimonials.svelte';

export let data: PageData;
	const q = useQuery(data);
	const testimonialsQ = useQuery(data.testimonialsQuery, {}, {
		...data.testimonialsOptions,
		initial: data.testimonialsOptions?.initial || { data: [] }
	});
	const teamQ = useQuery<TeamSectionResponse>(data.teamSectionQuery, {}, {
		...data.teamSectionOptions,
		initial: data.teamSectionOptions?.initial || null
	});

	$: ({ data: posts } = $q);
	$: testimonials = $testimonialsQ?.data || [];
	$: teamSection = $teamQ?.data;
</script>

<section class="relative py-20 md:py-24 overflow-hidden">
  <UberunsHeroSection />
</section>

<section class="relative py-20 lg:py-24 overflow-hidden bg-gray-50">
  <UberunsIntroSection />
  <Testimonials {testimonials} />
</section>

{#if teamSection}
  <SectionRenderer section={teamSection} />
{/if}
