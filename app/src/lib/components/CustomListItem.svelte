<script lang="ts">
  import Icon from './icons/Icon.svelte';
  export const portableText = null; // Definiere die exportierte Konstante für externe Referenz
</script>

<li class="flex mb-6 items-start">
  <div class="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
    <Icon name="check" size={16} className="text-primary-800" />
  </div>
  <span class="flex-1 text-lg xs:text-lg text-primary-950 leading-normal"><slot></slot></span>
</li>
