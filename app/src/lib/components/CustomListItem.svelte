<script lang="ts">
  import Icon from './icons/Icon.svelte';
  export const portableText = null; // Definiere die exportierte Konstante für externe Referenz
</script>

<li class="flex mb-2 items-start pl-4 relative before:content-['•'] before:absolute before:left-0 before:-top-0.5 before:text-primary">
  <span class="flex-1 text-lg xs:text-lg text-primary-950 leading-normal"><slot></slot></span>
</li>
