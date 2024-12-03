<script lang="ts">
    export let sticky = false;
    export let showOverlay = false;
    export let overlayOpacity = 0;
</script>

{#if sticky}
    <div class="relative lg:sticky lg:top-0 w-full min-h-dvh">
        <slot />
    </div>
{:else if showOverlay}
    <div class="absolute inset-0 hidden lg:block" style="opacity: {overlayOpacity};" />
    <div class="container px-4 mx-auto relative z-10">
        <slot />
    </div>
{:else}
    <div class="container px-4 mx-auto">
        <slot />
    </div>
{/if}
