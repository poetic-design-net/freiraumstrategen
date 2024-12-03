<script lang="ts">
    import type { PageData } from './$types';
    import FaqSection from '$lib/templates/FaqSection.svelte';
    import type { Faq } from '$lib/sanity/queries';

    export let data: { faq: Faq[] };
</script>

<section class="relative py-20 md:py-32 overflow-hidden bg-gray-50">
    <FaqSection faq={data.faq} />
</section>
