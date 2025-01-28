<script lang="ts">
 import { urlFor } from '$lib/sanity/image';
 export let portableText;

 function sanitizeAlt(text: string | undefined) {
   return text ? text.replace(/[^\w\s]/gi, '').trim() : '';
 }

 function isValidImageObject(obj: any) {
   return obj && obj._type === 'image' && obj.asset && obj.asset._ref;
 }

 $: console.log('Debug - Image object:', portableText?.value);
 
 $: imageData = (() => {
   const value = portableText?.value;
   if (!isValidImageObject(value)) {
     console.log('Invalid or incomplete image object:', value);
     return null;
   }

   try {
     const url = urlFor(value).url();
     const alt = sanitizeAlt(value.alt);
     return { url, alt };
   } catch (err) {
     console.error('Error generating image URL:', err);
     return null;
   }
 })();
</script>

{#if imageData}
  <div class="">
    <img 
      class="w-full object-cover rounded-lg aspect-[16/9] shadow-md mx-auto max-w-4xl"
      src={imageData.url} 
      alt={imageData.alt} 
    />
  </div>
{:else if import.meta.env.DEV}
  <p class="error-message">Bild nicht verfügbar</p>
{/if}
