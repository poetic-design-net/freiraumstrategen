<script lang="ts">
  import type { SalesEmotionalSection } from '$lib/types/salesEmotionalSection'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import Icon from '$lib/components/icons/Icon.svelte';
  import CleanText from '$lib/components/CleanText.svelte';
  import Button from '$lib/components/Button.svelte';

  export let data: SalesEmotionalSection
</script>


<div class="w-full min-h-[80vh] flex items-center">
  <!-- Background Image Layer -->
  <div class="absolute inset-0">
    {#if data.backgroundImage}
      <SanityImage 
        value={data.backgroundImage}
        customClass="w-full h-full object-cover motion-safe:parallax"
      />
    {/if}
  </div>

  <!-- Overlay Layer -->
  <div class="absolute inset-0 bg-black/40"></div>
  
  <!-- Content Layer -->
  <div class="container px-4 mx-auto relative z-10">
    <div class="max-w-3xl {
      data.alignment === 'right' ? 'ml-auto text-right' : 
      data.alignment === 'center' ? 'mx-auto text-center' : 
      'mr-auto text-left'
    }">
      {#if data.badge}
        <CleanText 
          text={data.badge}
          className="inline-block py-1 px-3 mb-4 text-xs font-medium text-white bg-primary-600/70 shadow backdrop-blur-sm rounded-full shadow"
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
      {#if data.quote}
        <CleanText 
          text={`${data.quote}`}
          className="text-2xl font-light text-white italic"
        />
      {/if}
      {#if data.ctaButton}
        <div class="mt-8 {
          data.alignment === 'right' ? 'flex justify-end' : 
          data.alignment === 'center' ? 'flex justify-center' : 
          ''
        }">
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

<style>
  @media (prefers-reduced-motion: no-preference) {
    .parallax {
      transform: translateZ(0);
      transition: transform 0.3s ease-out;
      will-change: transform;
    }

    .parallax:hover {
      transform: scale(1.05);
    }
  }
</style>
