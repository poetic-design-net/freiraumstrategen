<script lang="ts">
  import type { StrategyHeroProps } from './types';
  
  export let statistics: StrategyHeroProps['statistics'];
</script>

{#if statistics}
  <div class="w-full max-w-md">
    <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-8">
      <!-- First Stat -->
      <div class="text-center">
        <span class="block text-xl xs:text-2xl font-semibold 
          bg-gradient-to-br from-primary-600 to-primary-400
          bg-clip-text text-transparent"
        >
          {statistics.firstStat.value}
        </span>
        <span class="block text-sm text-gray-200/90 font-medium mt-1">
          {statistics.firstStat.label}
        </span>
      </div>
      
      <!-- Divider -->
      <div class="h-12 w-px bg-gradient-to-b from-primary-200 to-transparent self-center"></div>
      
      <!-- Second Stat -->
      <div class="text-center">
        <span class="block text-xl xs:text-2xl font-semibold 
          bg-gradient-to-br from-primary-600 to-primary-400
          bg-clip-text text-transparent"
        >
          {statistics.secondStat.value}
        </span>
        <span class="block text-sm text-gray-200/90 font-medium mt-1">
          {statistics.secondStat.label}
        </span>
      </div>
    </div>
  </div>
{/if}
