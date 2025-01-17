<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import SanityImage from './SanityImage.svelte';

  export let logos: Array<{ image: any }> = [];
  
  let carouselTrack: HTMLElement;
  let carouselWrapper: HTMLElement;

  onMount(() => {
    if (!logos.length) return;

    // Clone the logos to create a seamless loop
    const clonedLogos = logos.map(logo => ({ ...logo }));
    logos = [...logos, ...clonedLogos];

    // Set up GSAP animation
    const duration = logos.length * 2; // Adjust speed based on number of logos
    
    gsap.to(carouselTrack, {
      x: '-50%',
      duration: duration,
      ease: 'none',
      repeat: -1,
      onComplete: () => {
        gsap.set(carouselTrack, { x: '0%' });
      }
    });

    return () => {
      gsap.killTweensOf(carouselTrack);
    };
  });
</script>

<style>
  .carousel-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .carousel-wrapper {
    position: relative;
    width: 100%;
  }

  /* Create fade effect using masks */
  .carousel-wrapper::before,
  .carousel-wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 2;
    pointer-events: none;
  }

  .carousel-wrapper::before {
    left: 0;
    background: linear-gradient(to right, 
      rgb(var(--background-color) / 1) 0%,
      rgb(var(--background-color) / 0) 100%
    );
  }

  .carousel-wrapper::after {
    right: 0;
    background: linear-gradient(to left, 
      rgb(var(--background-color) / 1) 0%,
      rgb(var(--background-color) / 0) 100%
    );
  }

  .carousel-track {
    display: flex;
    gap: 2rem;
    width: fit-content;
  }

  .logo-item {
    flex: 0 0 auto;
    width: 120px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.logo-item img) {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
</style>

<div class="carousel-container">
  <div class="carousel-wrapper" bind:this={carouselWrapper}>
    <div class="carousel-track" bind:this={carouselTrack}>
      {#each logos as logo}
        <div class="logo-item">
          <SanityImage value={logo.image} />
        </div>
      {/each}
    </div>
  </div>
</div>
