<script lang="ts">
  import Icon from '../icons/Icon.svelte';

  export let onNext: () => void;
  export let onPrev: () => void;
  export let isFirstSlide: boolean;
  export let isLastSlide: boolean;
</script>

<div class="mx-auto relative z-10">
  <div class="flex justify-end mb-8">
    <div class="w-full lg:w-1/3">
      <div class="flex items-center justify-end">
        <button 
          on:click={onPrev} 
          class="inline-flex mr-3 w-14 h-14 items-center justify-center rounded-full bg-gray-100 hover:border-primary-900 hover:bg-gray-200 text-primary-900 hover:bg-gray-200 transition duration-200 {isFirstSlide ? 'opacity-50 cursor-not-allowed' : ''}"
          disabled={isFirstSlide}
          aria-label="Previous slide"
        >
          <Icon name="arrow-left" size={20} strokeWidth={1.5} className="ms-0" />
        </button>
        <button 
          on:click={onNext} 
          class="inline-flex w-14 h-14 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-primary-900 transition duration-200 {isLastSlide ? 'opacity-50 cursor-not-allowed' : ''}"
          disabled={isLastSlide}
          aria-label="Next slide"
        >
          <Icon name="arrow-right" size={20} strokeWidth={1.5} className="ms-0"  />
        </button>
      </div>
    </div>
  </div>
</div>
