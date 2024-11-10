<script lang="ts">
    import { useQuery } from '@sanity/svelte-loader';
    import type { PageData } from './$types';
    import ImageRenderer from '$lib/components/ImageRenderer.svelte';
    import { formatDate } from '$lib/utils';
    import { urlFor } from '$lib/sanity/image'; // Importiere die urlFor-Funktion
    import { sanitizeText } from '$lib/utils';
    import FaqSection from '$lib/templates/FaqSection.svelte';

    export let data: PageData;
    const q = useQuery(data);
    $: ({ data: faq } = $q);
    $: console.log('Ein Post:', faq?.[0]?.mainImage);  // 

    let showContent = false;

    const isLast = (item: any, array: any[]) => array.indexOf(item) === array.length - 1;
</script>

<section class="relative py-20 md:py-32 overflow-hidden bg-gray-50">
    <FaqSection />
</section>