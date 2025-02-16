<script lang="ts">
    import { getSectionClasses } from '$lib/utils/sections';
    import { transformSectionStyles } from '$lib/utils/sections/transformers/sectionStyles';
    import { isSicherheitVisible } from '$lib/stores/sicherheit';
    import { isHighlightsAnimated } from '$lib/stores/highlights';
    import { onMount } from 'svelte';
  
    export let sticky = false;
    export let showOverlay = false;
    export let overlayOpacity = 0;
    export let section: any;
    export let fullHeight = false;
  
    let hasBeenShown = false;
  
    onMount(() => {
      if (section.id === 'sicherheit') {
        isSicherheitVisible.set(false);
        isHighlightsAnimated.set(false);
      }
    });
  
    // Effect um hasBeenShown zu setzen
    $: if ($isSicherheitVisible && section.id === 'sicherheit') {
      hasBeenShown = true;
    }
  
    let isAnimating = false;

    // Wenn Sicherheit ausgeblendet wird und es die Highlights-Sektion ist
    $: if (!$isSicherheitVisible && section.id === 'highlights' && hasBeenShown) {
      if (!isAnimating) {
        isAnimating = true;
        isHighlightsAnimated.set(false);
        setTimeout(() => {
          isHighlightsAnimated.set(true);
          setTimeout(() => {
            isAnimating = false;
          }, 400); // Animation duration
        }, 10);
      }
    }

    // Computed class für die Sichtbarkeit und Animation
    $: visibilityClass = section.id === 'sicherheit'
      ? (!$isSicherheitVisible
        ? 'hidden'
        : (hasBeenShown ? 'animate-fade-in' : ''))
      : '';

    $: animationClass = section.id === 'highlights' && $isHighlightsAnimated
      ? 'animate-bounce-in'
      : '';
  
    // Transform and ensure styles are properly set with defaults
    const transformedStyles = transformSectionStyles(section.styles, section._type);
  
    // Get section classes once and ensure theme styles take precedence
    $: sectionClasses = `${getSectionClasses(section._type, transformedStyles)} ${
      fullHeight ? '' : ''
    } scroll-mt-24 ${visibilityClass} ${animationClass}`;
  </script>

{#if sticky}
  <section
    class={sectionClasses}
    {...(section.id ? { id: section.id } : {})}
    data-section-type={section._type}
  >
    <div class="relative lg:sticky lg:top-0 w-full min-h-dvh">
      <slot />
    </div>
  </section>
{:else if showOverlay}
  <section
    class={sectionClasses}
    {...(section.id ? { id: section.id } : {})}
    data-section-type={section._type}
  >
    <div
      class="absolute inset-0 hidden lg:block"
      style="opacity: {overlayOpacity};"
    />
    <slot />
  </section>
{:else}
  <section
    class={sectionClasses}
    {...(section.id ? { id: section.id } : {})}
    data-section-type={section._type}
  >
    <slot />
  </section>
{/if}