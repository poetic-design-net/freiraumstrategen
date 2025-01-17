<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import { onMount } from 'svelte';

	export let value;
	export let customClass = '';
	export let quality = 75; // Reduced quality for better performance
	export let priority = false; // Priority loading for above-the-fold images
	export let blur = true; // Enable blur-up loading
	export let sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1200px';

	let mounted = false;
	let isLoading = true;
	let blurDataURL: string | null = null;
	let imageRef: HTMLImageElement;

	function sanitizeText(text: string) {
		return text ? text.replace(/[^\w\s]/gi, '').trim() : '';
	}

	// Calculate dimensions based on viewport
	function getDimensions() {
		if (typeof window !== 'undefined') {
			const width = window.innerWidth;
			if (width < 640) return { width: 640, height: 480 }; // Mobile 4:3
			if (width < 1024) return { width: 1024, height: 576 }; // Tablet 16:9
			return { width: 1200, height: 675 }; // Desktop 16:9
		}
		return { width: 1200, height: 675 }; // Default
	}

	$: dimensions = getDimensions();
	$: imageAsset = value?.asset?._ref;

	// Generate blur data URL
	$: {
		if (blur && imageAsset) {
			blurDataURL = urlFor(value)
				.width(20)
				.height(Math.round(20 * (dimensions.height / dimensions.width)))
				.quality(10)
				.blur(20)
				.url();
		}
	}

	// Generate srcset for responsive images
	$: srcSet = imageAsset ? [
		`${urlFor(value).width(640).height(480).quality(quality).auto('format').url()} 640w`,
		`${urlFor(value).width(1024).height(576).quality(quality).auto('format').url()} 1024w`,
		`${urlFor(value).width(1200).height(675).quality(quality).auto('format').url()} 1200w`,
		`${urlFor(value).width(1600).height(900).quality(quality).auto('format').url()} 1600w`
	].join(', ') : '';

	// Combine default and custom classes with transition
	$: imgClass = `w-full h-auto object-cover rounded-lg shadow-md mx-auto max-w-4xl transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${customClass}`.trim();

	function handleLoad() {
		isLoading = false;
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:window on:resize={() => dimensions = getDimensions()} />

{#if value && imageAsset && urlFor && mounted}
	<figure>
		<div class="relative" style="aspect-ratio: {dimensions.width}/{dimensions.height};">
			<picture>
				<source
					type="image/webp"
					srcset={srcSet}
					{sizes}
				/>
				<source
					type="image/jpeg"
					srcset={srcSet}
					{sizes}
				/>
				<img 
					bind:this={imageRef}
					class={imgClass}
					src={urlFor(value)
						.width(dimensions.width)
						.height(dimensions.height)
						.quality(quality)
						.fit('crop')
						.crop('focalpoint')
						.focalPoint(value.hotspot?.x, value.hotspot?.y)
						.auto('format')
						.url()}
					srcset={srcSet}
					{sizes}
					alt={sanitizeText(value.alt)}
					width={dimensions.width}
					height={dimensions.height}
					loading={priority ? 'eager' : 'lazy'}
					decoding={priority ? 'sync' : 'async'}
					fetchpriority={priority ? 'high' : 'auto'}
					on:load={handleLoad}
				/>
			</picture>
			{#if isLoading}
				<div 
					class="absolute inset-0 bg-gray-100 animate-pulse overflow-hidden"
					style="aspect-ratio: {dimensions.width}/{dimensions.height};"
				>
					{#if blur && blurDataURL}
						<img
							src={blurDataURL}
							alt=""
							class="w-full h-full object-cover filter blur-lg transform scale-110"
							aria-hidden="true"
						/>
					{/if}
				</div>
			{/if}
		</div>
		{#if value.caption}
			<figcaption class="text-center text-sm mt-2 text-gray-600">
				{value.caption}
			</figcaption>
		{/if}
	</figure>
{:else}
	<p class="error-message">Bild nicht verfügbar</p>
{/if}
