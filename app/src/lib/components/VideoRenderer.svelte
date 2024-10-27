<script lang="ts">
	export let portableText;
  
	// Extrahiere die YouTube-Video-ID
	const videoUrl = portableText.value?.url || '';
	const videoId = videoUrl.includes('youtube.com') ? videoUrl.split('v=')[1] : '';
  
	const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  </script>
  
  {#if embedUrl}
	<iframe
	  class="w-full aspect-[16/9] rounded-lg mt-12 mb-12"
	  src={embedUrl}
	  title="YouTube-Video"
	  frameborder="0"
	  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	  allowfullscreen
	></iframe>
  {:else}
	<p class="error-message">Video nicht verfügbar oder ungültige URL</p>
  {/if}
