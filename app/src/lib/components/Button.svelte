<script lang="ts">
  import Icon from './icons/Icon.svelte';
  import type { IconName } from './icons';

  export let text = "Treffe die Experten";
  export let href: string | undefined = undefined;
  export let variant: 'primary' | 'secondary' | 'orange' | 'outline' | 'green' | 'green_white' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let icon: IconName | 'none' = 'none';
  export let target: string | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let className = '';
  const sizeClasses = {
    sm: 'py-1 px-5 text-sm',
    md: 'py-2 px-8 text-base',
    lg: 'py-2 px-8 text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  $: isOutline = variant === 'outline';
  
  const baseClasses = "group inline-flex items-center justify-center uppercase font-normal rounded-full transition-all duration-300";
  
  function getVariantClasses(variant: string) {
    if (isOutline) {
      return "border text-white hover:bg-primary-800 hover:border-primary-800";
    }
    
    switch (variant) {
      case 'green':
        return "bg-green text-white hover:bg-primary-800";
      case 'green_white':
        return "bg-green text-white hover:bg-white hover:text-green";
      case 'primary':
        return "bg-primary-800 text-white hover:bg-green";
      case 'orange':
        return "bg-orange-600 text-white";
      default:
        return "bg-secondary-800 text-white hover:bg-green";
    }
  }

  $: variantClasses = getVariantClasses(variant);
  $: classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses} ${className}`;
</script>

{#if href !== undefined}
  <a {href} class={classes} aria-label={text} {target} {rel}>
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
{:else}
  <button type="button" class={classes} on:click aria-label={text}>
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
  </button>
{/if}
