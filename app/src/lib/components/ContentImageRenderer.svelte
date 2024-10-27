<!-- ContentImageRenderer.svelte -->
<script lang="ts">
 import { urlFor } from '$lib/sanity/image';
 export let portableText;

 function sanitizeAlt(text: string | undefined) {
   return text ? text.replace(/[^\w\s]/gi, '').trim() : '';
 }

 $: imageUrl = portableText?.value ? urlFor(portableText.value).url() : null;
 $: altText = sanitizeAlt(portableText?.value?.alt);
</script>

{#if imageUrl}
<div class="">
 <img 
   class="w-full object-cover rounded-lg aspect-[16/9] shadow-md mx-auto max-w-4xl"
   src={imageUrl} 
   alt={altText} 
 />
</div>
{:else}
 <p class="error-message">Bild nicht verfügbar</p>
	{/if}
