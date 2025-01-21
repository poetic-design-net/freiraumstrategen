<script lang="ts">
    import SanityImage from '$lib/components/SanityImage.svelte';
    import Logo from './Logo.svelte';

    export let image: {
        asset: {
            url: string;
        };
    } | undefined = undefined;

    export let isMobile = false;
</script>

{#if image}
    <img src={image.asset.url} alt="Logo" class="h-8 w-auto" />
{:else}
    <Logo {isMobile} />
{/if}