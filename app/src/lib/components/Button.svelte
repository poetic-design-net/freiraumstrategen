<script lang="ts">
  import Icon from './icons/Icon.svelte';
  import type { IconName } from './icons';

  export let text = "Treffe die Experten";
  export let href: string | undefined = undefined;
  export let variant: 'primary' | 'secondary' | 'orange' | 'outline' | 'green' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let icon: IconName | 'none' = 'none';
  export let target: string | undefined = undefined;
  export let rel: string | undefined = undefined;

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

  const baseClasses = `group inline-flex items-center justify-center ${sizeClasses[size]} uppercase font-normal rounded-full text-white transition-colors duration-300`;
  
  $: classes = isOutline
    ? `${baseClasses} border hover:bg-white/10`
    : `${baseClasses} uppercase overflow-hidden ${
        variant === 'green' ? 'bg-green hover:bg-green-400' :
        variant === 'primary' ? 'bg-primary-800 hover:bg-primary-700' :
        variant === 'orange' ? 'bg-orange-600' :
        'bg-secondary-800'
      }`;
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
