<script lang="ts">
  import type { SalesEmotionalFreedomSection } from '$lib/types/salesEmotionalFreedomSection'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import Icon from '$lib/components/icons/Icon.svelte';
  import CleanText from '$lib/components/CleanText.svelte';
  import Button from '$lib/components/Button.svelte';

  export let data: SalesEmotionalFreedomSection
</script>

<div class="w-full min-h-[80vh] flex items-center">
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
  <div class="absolute inset-0 w-full h-full bg-black/40"></div>
  
  <!-- Content Layer -->
  <div class="relative z-10 w-full">
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
          className="text-4xl lg:text-5xl font-bold text-white mb-6"
        />
        {#if data.description}
          <CleanText 
            text={data.description}
            tag="p"
            className="text-xl text-white mb-8"
          />
        {/if}
        {#if data.additionalText}
          <CleanText 
            text={data.additionalText}
            tag="p"
            className="text-lg text-white/90"
          />
        {/if}
        {#if data.ctaButton}
          <div class="mt-8">
            <Button 
              text={data.ctaButton.text}
              href={data.ctaButton.link}
              icon="arrow-right"
              size="md"
              variant="outline"
            />
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
