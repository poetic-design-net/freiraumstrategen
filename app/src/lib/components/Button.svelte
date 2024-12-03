<script lang="ts">
  import Icon from './icons/Icon.svelte';
  import type { IconName } from './icons';

  export let text = "Treffe die Experten";
  export let href = "/";
  export let variant: 'primary' | 'secondary' | 'orange' | 'outline' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let icon: IconName | 'none' = 'none';

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-4 px-8 text-base',
    lg: 'py-5 px-10 text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  $: isOutline = variant === 'outline';
</script>

{#if isOutline}
  <div class="relative glow-icon-container">
    <div class="absolute -inset-1 opacity-20 rounded-full bg-primary-500/5 blur-sm"></div>
    <a 
      class="relative group inline-flex items-center justify-center {sizeClasses[size]} font-medium rounded-md text-white border-2 border-white/20 hover:bg-white/10 transition-colors"  
      {href} 
      aria-label={text}
    >
      <span class="flex items-center justify-center gap-2">
        {text}
        {#if icon !== 'none'}
          <Icon 
            name={icon} 
            size={iconSizes[size]} 
            className="transform group-hover:translate-x-1 transition-transform duration-300"
          />
        {/if}
      </span>
    </a>
  </div>
{:else}
  <a 
    class="relative group inline-flex items-center justify-center {sizeClasses[size]} font-medium rounded-md overflow-hidden transition-all duration-200 bg-gradient-3 text-white shadow {
      variant === 'primary' ? 'bg-primary-800' : variant === 'orange' ? 'bg-orange-600' : 'bg-secondary-800'
    }"  
    {href} 
    aria-label={text}
  >
    <div class="absolute top-0 right-full w-full h-full transform group-hover:translate-x-full transition-transform duration-500 {
      variant === 'primary' ? 'bg-primary-600' : variant === 'orange' ? 'bg-orange-600' : 'bg-secondary-600'
    }"></div>
    <span class="relative flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-200">
      {text}
      {#if icon !== 'none'}
        <Icon 
          name={icon} 
          size={iconSizes[size]} 
          className="transform group-hover:translate-x-1 transition-transform duration-300"
        />
      {/if}
    </span>
  </a>
{/if}
