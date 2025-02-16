<script lang="ts">
    import { getSectionClasses } from '$lib/utils/sections';
    import { transformSectionStyles } from '$lib/utils/sections/transformers/sectionStyles';
    import { isSicherheitVisible } from '$lib/stores/sicherheit';
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';
    import { elasticOut } from 'svelte/easing';

    export let sticky = false;
    export let showOverlay = false;
    export let overlayOpacity = 0;
    export let section: any;
    export let fullHeight = false;

    // Initial state für die Sicherheit-Section
    onMount(() => {
        if (section.id === 'sicherheit') {
            isSicherheitVisible.set(false);
        }
    });

    let isSicherheit: boolean;
    
    $: isSicherheit = section.id === 'sicherheit';

    // Kombinierte Transition-Funktionen
  function combinedTransition(node: HTMLElement, {
    duration = 600
  }) {
    return {
      duration,
      css: (t: number) => {
        const eased = elasticOut(t);
        return `
          transform: translateY(${(1 - eased) * 100}px);
          opacity: ${eased};
        `;
      }
    };
  }
    
    // Transform and ensure styles are properly set with defaults
    const transformedStyles = transformSectionStyles(section.styles, section._type);
    
    // Get section classes once and ensure theme styles take precedence
    const sectionClasses = `${getSectionClasses(section._type, transformedStyles)} ${fullHeight ? '' : ''} scroll-mt-24`;
</script>

{#if isSicherheit}
    {#if $isSicherheitVisible}
        {#if sticky}
            <section
                transition:slide|local={{
                    duration: 600,
                    easing: elasticOut
                }}
                class={sectionClasses}
                id={section.id}
                data-section-type={section._type}
            >
                <div class="relative lg:sticky lg:top-0 w-full min-h-dvh">
                    <slot />
                </div>
            </section>
        {:else if showOverlay}
            <section
                transition:slide|local={{
                    duration: 600,
                    easing: elasticOut
                }}
                class={sectionClasses}
                id={section.id}
                data-section-type={section._type}
            >
                <div class="absolute inset-0 hidden lg:block" style="opacity: {overlayOpacity};" />
                <slot />
            </section>
        {:else}
            <section
                transition:slide|local={{
                    duration: 600,
                    easing: elasticOut
                }}
                class={sectionClasses}
                id={section.id}
                data-section-type={section._type}
            >
                <slot />
            </section>
        {/if}
    {/if}
{:else}
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
        <section
            class={sectionClasses}
            {...section.id ? { id: section.id } : {}}
            data-section-type={section._type}
        >
            <slot />
        </section>
    {/if}
{/if}
