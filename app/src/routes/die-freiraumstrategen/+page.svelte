<script lang="ts">
import UberunsTeamSection from '$lib/templates/UberunsTeamSection.svelte';
import UberunsHeroSection from '$lib/templates/UberunsHeroSection.svelte';
import UberunsIntroSection from '$lib/templates/UberunsIntroSection.svelte';
import { useQuery } from '@sanity/svelte-loader';
import type { PageData } from './$types';

import Testimonials from '$lib/templates/Testimonials.svelte';


export let data: PageData;
	const q = useQuery(data);
	const testimonialsQ = useQuery(data.testimonialsQuery, {}, {
		...data.testimonialsOptions,
		initial: data.testimonialsOptions?.initial || { data: [] }
	});

	$: ({ data: posts } = $q);
	$: testimonials = $testimonialsQ?.data || [];

</script>

<section class="relative py-20 md:py-24 overflow-hidden">
  <UberunsHeroSection />
</section>

<section class="relative py-20 lg:py-24 overflow-hidden bg-gray-50">
  <UberunsIntroSection />
  <Testimonials {testimonials} />
</section>

<section class="relative py-20 md:py-24 overflow-hidden">
      <UberunsTeamSection />
       
  </section>


