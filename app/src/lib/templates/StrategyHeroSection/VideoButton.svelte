<script lang="ts">
  import type { StrategyHeroProps } from './types';
  
  export let video: StrategyHeroProps['video'];
  export let onToggle: () => void;
</script>

{#if video?.youtubeId}
  <div 
    class="fixed z-20 
      bottom-6 right-6 
      md:bottom-12 md:right-12"
  >
    <button 
      class="group relative flex items-center 
        md:gap-4 
        bg-gray-900/75 hover:bg-gray-900/85
        backdrop-blur-sm 
        rounded-full md:rounded-2xl 
        p-2.5 md:p-4 
        md:pr-6 
        transition-all duration-300 
        hover:scale-105
        shadow-lg shadow-gray-900/10 
        hover:shadow-xl hover:shadow-gray-900/20"
      on:click={onToggle}
    >
      <!-- Pulsierender Play Button -->
      <div class="relative">
        <div class="absolute 
          -inset-2.5 md:-inset-4 
          animate-ping 
          rounded-full 
          bg-primary-500/10 
          duration-1000"
        ></div>
        <div class="relative 
          h-9 w-9 
          md:h-12 md:w-12 
          rounded-full 
          bg-primary-500/90 
          flex items-center justify-center 
          shadow-lg shadow-primary-500/20"
        >
          <svg 
            class="w-4 h-4 md:w-6 md:h-6 
              text-white 
              translate-x-0.5" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <path 
              fill="currentColor" 
              d="M8 5v14l11-7z"
            />
          </svg>
        </div>
      </div>
      
      <!-- Text - nur auf Desktop -->
      <div class="hidden md:block text-left">
        <p class="text-white font-medium text-sm md:text-base">
          {video.buttonText}
        </p>
        <p class="text-white/80 text-xs md:text-sm">
          {video.duration}
        </p>
      </div>

      <!-- Hover Line Effect -->
      <div class="hidden md:block absolute inset-x-0 -bottom-px h-px 
        bg-gradient-to-r from-transparent via-primary-500/50 to-transparent 
        scale-x-0 group-hover:scale-x-100 
        transition-transform duration-500"
      ></div>
    </button>
  </div>
{/if}
