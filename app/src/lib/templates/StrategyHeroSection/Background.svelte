<script lang="ts">
  import type { StrategyHeroProps } from './types';
  import SanityImage from '$lib/components/SanityImage.svelte';
  
  export let backgroundImage: StrategyHeroProps['backgroundImage'];

  const fallbackImage = '/assets/trader_coaching_tobias.jpg';
  
  // Debug log
  console.log('Background Image Data:', backgroundImage);
</script>

<div class="absolute inset-0">
  {#if backgroundImage}
    <SanityImage 
      value={backgroundImage} 
      customClass="w-full h-full object-cover"
    />
  {:else}
    <img 
      class="w-full h-full object-cover" 
    src="/assets/trader_coaching_tobias.jpg" 
      alt="Strategy Hero Background"
    />
  {/if}

  <!-- Gradient Overlay -->
  <div class="absolute inset-0 
    bg-gradient-to-b 
    from-black/25
    via-black/40 
    to-black/45"
  ></div>
  <div class="absolute inset-0 
    bg-black/20 backdrop-blur-sm
    backdrop-brightness-90 
    backdrop-contrast-110"
  ></div>
</div>
