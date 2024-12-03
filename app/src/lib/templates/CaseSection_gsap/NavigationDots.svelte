<script lang="ts">
  export let totalSlides: number;
  export let currentIndex: number;
  export let onDotClick: (index: number) => void;
  export let isAnimating: boolean;
</script>

<div class="flex justify-center mt-8 gap-2">
  {#each Array(totalSlides) as _, i}
    <button 
      class="w-2 h-2 rounded-full transition-all duration-300 {
        i === currentIndex 
          ? 'bg-primary-600 w-6' 
          : 'bg-gray-300 hover:bg-gray-400'
      }"
      on:click={() => onDotClick(i)}
      disabled={isAnimating}
      aria-label="Gehe zu Slide {i + 1}"
    />
  {/each}
</div>
