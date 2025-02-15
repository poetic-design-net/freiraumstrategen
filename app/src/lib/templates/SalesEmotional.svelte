<script lang="ts">
  import type { SalesEmotionalSection } from '$lib/types/salesEmotionalSection'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import Icon from '$lib/components/icons/Icon.svelte';
  import CleanText from '$lib/components/CleanText.svelte';
  import Button from '$lib/components/Button.svelte';
  import { isSicherheitVisible } from '$lib/stores/sicherheit';

  export let data: SalesEmotionalSection

  // Click-Handler für den Button
  function handleShowSicherheit() {
    isSicherheitVisible.set(true);
    // Warte kurz, bis der DOM aktualisiert wurde
    setTimeout(() => {
      document.getElementById('sicherheit')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }
</script>


<div class="w-full py-24 flex items-center">
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
  <div class="absolute inset-0 bg-gradient-to-b from-[#B1763F]/[0.25] via-[#B1763F]/[0.50] to-[#B1763F]/[0.66]"></div>
  
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
          className="inline-block font-medium text-white mb-8 uppercase"
        />
      {/if}
      <CleanText 
        text={data.title}
        tag="h2"
        className="text-4xl lg:text-5xl font-bold text-white mb-8"
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
          className="text-2xl font-light text-white "
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
            icon="chevron-down"
            size="md"
            variant="primary"
            on:click={handleShowSicherheit}
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
