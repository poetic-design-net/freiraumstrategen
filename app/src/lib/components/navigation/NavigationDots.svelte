<script lang="ts">
  export let totalSlides: number;
  export let currentIndex: number;
  export let onDotClick: (index: number) => void;
  export let isAnimating: boolean;
  export let vertical: boolean = false; // Neuer prop mit default false für horizontale Ausrichtung
 </script>
 
 <div class="flex justify-center mt-8 gap-2" class:flex-col={vertical}>
  {#each Array(totalSlides) as _, i}
   <button
     class="rounded-full transition-all duration-300 {
       i === currentIndex
         ? `bg-primary-600 ${vertical ? 'w-2 h-6' : 'h-2 w-6'}`
         : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
     }"
     on:click={() => onDotClick(i)}
     disabled={isAnimating}
     aria-label="Gehe zu Slide {i + 1}"
   />
  {/each}
 </div>