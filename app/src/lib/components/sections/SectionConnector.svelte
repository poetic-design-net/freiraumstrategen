<script lang="ts">
  import { onMount } from 'svelte';
  
  export let image: string = "saturn-assets/images/headers/blue-light-left-bottom.png";
  export let position: "top" | "center" | "bottom" = "top";
  
  let connector: HTMLElement;
  
  onMount(() => {
    // Position the connector relative to the viewport
    const updatePosition = () => {
      if (!connector) return;
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const rect = connector.getBoundingClientRect();
      
      // Adjust position based on scroll to maintain visual connection
      connector.style.transform = `translate3d(0, ${scrollPosition * 0.3}px, 0) scale-y(-1)`;
    };
    
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    
    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  });
</script>

<style>
  .section-connector {
    position: absolute;
    left: 0;
    z-index: 0;
    pointer-events: none;
    will-change: transform;
  }
  
  .section-connector.top {
    top: 5rem;
  }
  
  .section-connector.center {
    top: 50%;
    transform: translateY(-50%) scale-y(-1);
  }
  
  .section-connector.bottom {
    bottom: 5rem;
  }
</style>

<div 
  bind:this={connector}
  class="section-connector {position}"
>
  <img 
    src={image} 
    alt=""
    class="w-auto h-auto"
  />
</div>
