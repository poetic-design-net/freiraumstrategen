<script lang="ts">
  export let text = "Treffe die Experten";
  export let href = "/";
  export let variant: 'primary' | 'secondary' | 'orange' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let icon: 'arrow-right' | 'arrow-left' | 'arrow-up' | 'arrow-down' | 'arrow-down-right' | 'arrow-my-down' | 'none' = 'none';

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-4 px-8 text-base',
    lg: 'py-5 px-10 text-lg'
  };

  const iconClasses = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6'
  };
</script>

<a 
  class="relative group bg-gradient-3 inline-block w-full sm:w-auto {sizeClasses[size]} text-white shadow font-medium rounded-md overflow-hidden {
    variant === 'primary' ? 'bg-primary-800' : variant === 'orange' ? 'bg-orange-600' : 'bg-secondary-800'
  }"  
  {href} 
  aria-label={text}
>
    <div class="absolute top-0 right-full w-full h-full transform group-hover:translate-x-full group-hover:scale-102 transition duration-500 {
      variant === 'primary' ? 'bg-primary-600' : variant === 'orange' ? 'bg-orange-600' : 'bg-secondary-600'
    }"></div>
    <div class="relative flex items-center justify-center">
      <span class={icon !== 'none' ? 'mr-4' : ''}>{text}</span>
      {#if icon !== 'none'}
        <span class="transform group-hover:translate-x-1 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg"  stroke-width="1.5" viewBox="0 0 24 24" fill="currentColor" class={iconClasses[size]}>
            {#if icon === 'arrow-right'}
              <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd" />
            {:else if icon === 'arrow-left'}
              <path fill-rule="evenodd" d="M14.78 14.78a.75.75 0 0 1-1.06 0L6.5 7.56v5.69a.75.75 0 0 1-1.5 0v-7.5A.75.75 0 0 1 5.75 5h7.5a.75.75 0 0 1 0 1.5H7.56l7.22 7.22a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
            {:else if icon === 'arrow-up'}
              <path fill-rule="evenodd" d="M14.78 9.78a.75.75 0 0 0 0-1.06L7.56 1.5h5.69a.75.75 0 0 0 0-1.5h-7.5A.75.75 0 0 0 5 .75v7.5a.75.75 0 0 0 1.5 0V2.56l7.22 7.22a.75.75 0 0 0 1.06 0Z" clip-rule="evenodd" />
            {:else if icon === 'arrow-down-right'}         
              <path fill-rule="evenodd" d="M4.22 5.22a.75.75 0 0 0 0 1.06l7.22 7.22h-5.69a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 .75-.75v-7.5a.75.75 0 0 0-1.5 0v5.69L5.28 5.22a.75.75 0 0 0-1.06 0Z" clip-rule="evenodd" />
            {:else if icon === 'arrow-down'}
              <path fill-rule="evenodd" d="M14.78 14.22a.75.75 0 0 1-1.06 0L6.5 7v5.69a.75.75 0 0 1-1.5 0v-7.5A.75.75 0 0 1 5.75 5h7.5a.75.75 0 0 1 0 1.5H7.56l7.22 7.22a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
            {:else if icon === 'arrow-my-down'}
              <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clip-rule="evenodd"  />
            {/if} 
          </svg>
        </span>
      {/if}
    </div>
</a>

<style>
 
</style>
