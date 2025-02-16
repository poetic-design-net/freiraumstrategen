<script lang="ts">
  import Icon from './icons/Icon.svelte';
  import type { IconName } from './icons';

  type ButtonStyle = 'primary' | 'secondary' | 'orange' | 'green' | 'green_white';
  type ButtonSize = 'sm' | 'md' | 'lg';
  type ButtonIcon = 'none' | IconName;
  type ButtonPosition = 'start' | 'center' | 'end';

  interface ButtonValue {
    _type: 'button';
    text?: string;
    url?: string;
    style?: ButtonStyle;
    size?: ButtonSize;
    icon?: ButtonIcon;
    position?: ButtonPosition;
  }

  export let portableText: {
    value: ButtonValue;
  };

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-2 px-8 text-base',
    lg: 'py-2 px-8 text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  // Get theme from closest parent with bg-primary-900 class
  let isDarkTheme = false;
  
  function updateTheme(node: HTMLElement) {
    const parent = node.closest('[class*="bg-primary-900"]');
    isDarkTheme = !!parent;
    return {
      destroy() {}
    };
  }
  
  $: value = portableText.value;
  $: buttonStyle = (value?.style || 'primary') as ButtonStyle;
  $: buttonSize = (value?.size || 'md') as ButtonSize;
  $: buttonPosition = (value?.position || 'start') as ButtonPosition;
  $: icon = value?.icon;

  // Style mappings based on button style and theme
  $: styleClasses = {
    primary: isDarkTheme
      ? 'bg-white text-primary-800 hover:bg-green hover:text-white uppercase'
      : 'bg-primary-800 text-white hover:bg-green hover:text-white uppercase',
    secondary: isDarkTheme
      ? 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-800'
      : 'bg-transparent text-primary-800 border-2 border-primary-800 hover:bg-primary-800 hover:text-white',
    orange: 'bg-orange-500 text-white hover:bg-orange-600 uppercase',
    green: 'bg-green text-white hover:bg-primary-800 uppercase',
    green_white: 'bg-green text-white hover:bg-white hover:text-green uppercase'
  };

  // Position classes
  $: positionClasses = {
    start: 'text-start',
    center: 'text-center mx-auto',
    end: 'text-end ms-auto'
  };
</script>

{#if value?.url && value?.text}
  <div class="pt-4 w-full {positionClasses[buttonPosition]}" use:updateTheme>
    <a 
      href={value.url}
      class="group inline-block w-full sm:w-auto transition-colors rounded-full duration-300 {sizeClasses[buttonSize]} {styleClasses[buttonStyle]}"
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={value.text}
    >
      <div class="relative flex items-center justify-center gap-2">
        <span>{value.text}</span>
        {#if icon && icon !== 'none'}
          <span class="transform group-hover:translate-x-0.5 duration-100">
            <Icon name={icon} size={iconSizes[buttonSize]} />
          </span>
        {/if}
      </div>
    </a>
  </div>
{/if}
