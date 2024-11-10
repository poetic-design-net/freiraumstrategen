<script lang="ts">
    import { useQuery } from '@sanity/svelte-loader';
    import type { PageData } from './$types';
    import ImageRenderer from '$lib/components/ImageRenderer.svelte';
    import { formatDate } from '$lib/utils';
    import { urlFor } from '$lib/sanity/image'; // Importiere die urlFor-Funktion
    import { sanitizeText } from '$lib/utils';
    import ContactHeroSection from '$lib/templates/ContactHeroSection.svelte';
    import ContactFormSection from '$lib/templates/ContactFormSection.svelte';

  
</script>

<section class="relative py-20 md:py-24 overflow-hidden ">
    <ContactHeroSection />
</section>

<section class="relative py-24 bg-gray-50 lg:py-20 overflow-hidden">
    <ContactFormSection /> 
</section>