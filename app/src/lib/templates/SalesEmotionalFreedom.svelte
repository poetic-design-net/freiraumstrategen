<script lang="ts">
  import type { SalesEmotionalFreedomSection } from '$lib/types/salesEmotionalFreedomSection'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import Icon from '$lib/components/icons/Icon.svelte';
  import CleanText from '$lib/components/CleanText.svelte';
  import PortableTextContent from '$lib/components/PortableTextContent.svelte';
  import Button from '$lib/components/Button.svelte';
  import { getThemeStyles } from '$lib/utils/sections'
  import { isSicherheitVisible } from '$lib/stores/sicherheit';

  export let data: SalesEmotionalFreedomSection

  // Get theme-based styles for content
  const theme = getThemeStyles(data.styles?.theme)

  // Click-Handler für den Button
  function handleShowSicherheit() {
    isSicherheitVisible.set(true);
    // Scroll zur Section
    document.getElementById('sicherheit')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<!-- Background Image Layer -->
<div class="absolute inset-0 w-full h-full">
  {#if data.backgroundImage}
    <SanityImage 
      value={data.backgroundImage}
      customClass="w-full h-full object-cover motion-safe:parallax"
    />
  {/if}
</div>

<!-- Overlay Layer -->
<div class="absolute inset-0 bg-gradient-to-b from-[#C3660D]/[0.30] via-[#2F1700]/[0.65] to-[#2F1700]/[0.80]"></div>
<!-- Content Layer -->
<div class="relative z-10 w-full min-h-[80vh] flex items-center">
  <div class="container px-4 mx-auto">
    <div class="max-w-3xl">
      {#if data.badge}
        <CleanText 
          text={data.badge}
          className="inline-block py-1 px-3 mb-4 text-xs font-medium text-white bg-black/30 backdrop-blur-sm rounded-full shadow"
        />
      {/if}
      <CleanText 
        text={data.title}
        tag="h2"
        className="{theme.headings} text-4xl lg:text-5xl font-medium text-white mb-6"
      />
      {#if data.description}
        <div class="{theme.text} text-lg font-light text-white mb-8">
          <PortableTextContent value={data.description} />
        </div>
      {/if}
      {#if data.additionalText}
        <div class="{theme.text} text-lg font-light text-white">
          <PortableTextContent value={data.additionalText} />
        </div>
      {/if}
      {#if data.ctaButton}
        <div class="mt-8">
          <Button
            text={data.ctaButton.text}
            size="md"
            variant="outline"
          />
        </div>
      {/if}
    </div>
  </div>
</div>
