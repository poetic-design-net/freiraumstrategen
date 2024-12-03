<script lang="ts">
  import { icons, type IconName } from '.';

  export let name: IconName;
  export let size: number = 20;
  export let className: string = '';
  export let strokeWidth: number = 1.5;

  $: icon = icons[name];
  $: isStrokeIcon = !icon?.hasRule && (!icon?.path || name === 'mail');
</script>

{#if icon}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={icon.viewBox}
    width={size}
    height={size}
    fill={isStrokeIcon ? 'none' : 'currentColor'}
    stroke={isStrokeIcon ? 'currentColor' : 'none'}
    class="inline-block {className}"
    aria-hidden="true"
  >
    {#if icon.spinner}
      <circle 
        class="opacity-25" 
        cx={icon.spinner.circle.cx} 
        cy={icon.spinner.circle.cy} 
        r={icon.spinner.circle.r} 
        stroke="currentColor" 
        stroke-width="4"
      />
      <path 
        class="opacity-75" 
        fill="currentColor" 
        d={icon.spinner.path}
      />
    {:else if icon.paths}
      {#each icon.paths as path}
        <path 
          d={path}
          stroke-width={strokeWidth}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      {/each}
    {:else if icon.path}
      <path 
        d={icon.path}
        stroke-width={isStrokeIcon ? strokeWidth : undefined}
        stroke-linecap={isStrokeIcon ? 'round' : undefined}
        stroke-linejoin={isStrokeIcon ? 'round' : undefined}
        fill={isStrokeIcon ? 'none' : 'currentColor'}
        fill-rule={icon.hasRule ? 'evenodd' : undefined}
        clip-rule={icon.hasRule ? 'evenodd' : undefined}
      />
    {/if}
  </svg>
{/if}
