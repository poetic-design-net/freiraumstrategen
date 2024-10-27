<script lang="ts">
    import { useQuery } from '@sanity/svelte-loader';
    import PageHero from '$lib/templates/page/PageHero.svelte';
    import type { PageData } from './$types';
    import { sanitizeText } from '$lib/utils';

    export let data: PageData;

    // Initialisiere hero und title
    let hero = null;
    let title = '';

    // Verwende `$:` für die Zuweisung der Werte aus der Datenstruktur
    $: ({ hero, title } = data?.data?.data || {});

    // Bereinige title direkt nach der Zuweisung
    $: title = sanitizeText(title);

    console.log("Hero-Daten:", hero);
</script>

<section class="page">
    <h1 class="page__title">{title}</h1>

    {#if hero}
        <PageHero heroData={hero} />
    {:else}
        <p>Hero-Daten fehlen</p>
    {/if}
</section>
