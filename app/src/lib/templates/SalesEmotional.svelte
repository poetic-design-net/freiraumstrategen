<script lang="ts">
  import { fade } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import type { SalesEmotionalSection } from '$lib/types/salesEmotionalSection'
  import SanityImage from '$lib/components/SanityImage.svelte'
  import Icon from '$lib/components/icons/Icon.svelte';
  import { onMount } from 'svelte';
  import CleanText from '$lib/components/CleanText.svelte';
  import Button from '$lib/components/Button.svelte';
  import { isSicherheitVisible } from '$lib/stores/sicherheit';
  import { isHighlightsAnimated } from '$lib/stores/highlights';

  export let data: SalesEmotionalSection;
  let isVisible: boolean;
  let isAnimating = false;
  
  isSicherheitVisible.subscribe(value => {
    isVisible = value;
    // Wenn Sicherheit ausgeblendet wird
    if (!value && !isAnimating) {
      isAnimating = true;
      // Animation zurücksetzen
      isHighlightsAnimated.set(false);
      // Kurz warten und dann neu triggern
      setTimeout(() => {
        isHighlightsAnimated.set(true);
        // Animation-Lock nach der Animation aufheben
        setTimeout(() => {
          isAnimating = false;
        }, 400); // Animation duration
      }, 10);
    }
  });

  function handleShowSicherheit() {
    isSicherheitVisible.set(!isVisible);
    if (!isVisible) {
      isHighlightsAnimated.set(false);
      setTimeout(() => {
        document.getElementById('sicherheit')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
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
            text={isVisible ? "Weniger sehen" : data.ctaButton.text}
            icon={isVisible ? "chevron-up" : "chevron-down"}
            size="md"
            variant={isVisible ? "green_white" : "primary"}
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

  :global(.bounce-fade-in) {
    animation: bounceIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  :global(.bounce-fade-out) {
    animation: bounceOut 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.95) translateY(10px);
    }
    70% {
      opacity: 0.9;
      transform: scale(1.02) translateY(-3px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes bounceOut {
    0% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    30% {
      opacity: 0.9;
      transform: scale(1.02) translateY(3px);
    }
    100% {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
    }
  }
</style>
