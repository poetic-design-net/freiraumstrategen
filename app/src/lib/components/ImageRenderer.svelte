<script lang="ts">
	import { urlFor } from '$lib/sanity/image';

	export let value;
	export let customClass = ''; // Add support for custom classes
    
	function sanitizeText(text: string) {
		return text ? text.replace(/[^\w\s]/gi, '').trim() : '';
	}

	// Funktion zur Berechnung des Seitenverhältnisses basierend auf dem Viewport
	function getAspectRatio() {
		if (typeof window !== 'undefined') {
			const width = window.innerWidth;
			if (width < 640) return 4 / 3; // Für mobile Geräte
			if (width < 1024) return 16 / 9; // Für Tablets
			return 16 / 9; // Für Desktop
		}
		return 16 / 9; // Standardwert
	}

	$: aspectRatio = getAspectRatio();

	$: imageAsset = value?.asset?._ref;

	// Combine default and custom classes
	$: imgClass = `w-full h-auto object-cover rounded-lg shadow-md mx-auto max-w-4xl ${customClass}`.trim();
</script>

<svelte:window on:resize={() => aspectRatio = getAspectRatio()} />

{#if value && imageAsset && urlFor}
	<figure>
		<img 
			class={imgClass}
			src={urlFor(value)
				.width(1200)
				.height(Math.round(1200 / aspectRatio))
				.fit('crop')
				.crop('focalpoint')
				.focalPoint(value.hotspot?.x, value.hotspot?.y)
				.auto('format')
				.url()} 
			alt={sanitizeText(value.alt)} 
		/>
		{#if value.caption}
			<figcaption class="text-center text-sm mt-2 text-gray-600">
				{value.caption}
			</figcaption>
		{/if}
	</figure>
{:else}
	<p class="error-message">Bild nicht verfügbar</p>
{/if}
