<script lang="ts">
    import { getSectionClasses } from '$lib/utils/sections';

    export let sticky = false;
    export let showOverlay = false;
    export let overlayOpacity = 0;
    export let section: any;

    // Get section classes once and ensure theme styles take precedence
    const sectionClasses = getSectionClasses(section._type, {
        ...section.styles,
        // Ensure theme styles are properly applied
        theme: section.styles?.theme || 'light'
    });

    let slotContent: HTMLElement;
    $: hasSection = slotContent?.querySelector('section') !== null;
</script>

{#if sticky}
    <section 
        class={sectionClasses} 
        {...section.id ? { id: section.id } : {}}
        data-section-type={section._type}
    >
        <div class="relative lg:sticky lg:top-0 w-full min-h-dvh">
            <slot />
        </div>
    </section>
{:else if showOverlay}
    <section 
        class={sectionClasses} 
        {...section.id ? { id: section.id } : {}}
        data-section-type={section._type}
    >
        <div class="absolute inset-0 hidden lg:block" style="opacity: {overlayOpacity};" />
        <slot />
    </section>
{:else}
    <div bind:this={slotContent}>
        {#if hasSection}
            <slot />
        {:else}
            <section 
                class={sectionClasses} 
                {...section.id ? { id: section.id } : {}}
                data-section-type={section._type}
            >
                <slot name="background" />
                <slot />
            </section>
        {/if}
    </div>
{/if}
