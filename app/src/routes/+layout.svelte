<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import LiveMode from '$lib/components/LiveMode.svelte';
	import "../app.pcss";
	import Header from '$lib/templates/Header.svelte';
	import Footer from '$lib/templates/Footer.svelte';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { cleanText } from '$lib/utils/textCleaner';
	
	// Make cleanText available to all components
	if (browser) {
		(window as any).cleanText = cleanText;
	}
	
	export let data;
	let isArticlePage = false;
	let ready = false;
	let scrollProgress = 0;
	let scrollTimeout: number;
	let rafId: number;
	let CookieConsentComponent: any = null;

	if (browser) {
		ready = true;
		// Load cookie consent component
		import('$lib/cookie/cookieconsent.svelte').then(module => {
			CookieConsentComponent = module.default;
		});
	}

	afterNavigate(() => {
		ready = true;
		isArticlePage = $page.url.pathname.startsWith('/post');
		if (typeof document !== 'undefined') {
			document.body.classList.toggle('article-page', isArticlePage);
		}
	});

	// Optimized scroll handler with debounce and RAF
	function handleScroll() {
		if (scrollTimeout) {
			clearTimeout(scrollTimeout);
		}

		scrollTimeout = window.setTimeout(() => {
			if (rafId) {
				cancelAnimationFrame(rafId);
			}

			rafId = requestAnimationFrame(() => {
				const section = document.querySelector('section:has(.sticky)') as HTMLElement;
				if (section) {
					const viewportHeight = window.innerHeight;
					const totalHeight = section.offsetHeight + viewportHeight;
					const scrolled = window.scrollY;
					scrollProgress = Math.min(Math.max(scrolled / totalHeight, 0), 1);
				}
			});
		}, 16); // ~60fps
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll, { passive: true });
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('scroll', handleScroll);
				if (scrollTimeout) {
					clearTimeout(scrollTimeout);
				}
				if (rafId) {
					cancelAnimationFrame(rafId);
				}
			}
		};
	});
</script>

<Header {data} />	
	
<main>
	<div 
		class="page-transition" 
		class:page-ready={ready}
		style="transition-duration: 0.3s"
	>
		<slot />
		{#if browser && CookieConsentComponent}
			<svelte:component this={CookieConsentComponent} />
		{/if}
	</div>
</main>

<Footer />

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}

<style lang="postcss">
	:global(body.article-page) {
		@apply bg-radial-gradient;
		transform: translate3d(0, 0, 0);
		will-change: transform;
	}
	
	.footer {
		display: flex;
		justify-content: flex-end;
		padding: 0 var(--space-3);
		transform: translate3d(0, 0, 0);
		will-change: transform;
	}

	.footer .footer__text {
		font-size: var(--font-size-1);
		line-height: var(--line-height-1);
		display: flex;
		align-items: center;
		gap: 2px;
	}

	@media (min-width: 575px) {
		main {
			margin-top: unset;
		}
	}

	.preview-toggle {
		backdrop-filter: blur(12px);
		border-radius: 0.25rem;
		bottom: 1rem;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05);
		color: #1f2937;
		display: block;
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1rem;
		padding: 0.5rem 0.75rem;
		position: fixed;
		right: 1rem;
		text-align: center;
		text-decoration: none;
		z-index: 50;
		transform: translate3d(0, 0, 0);
		will-change: transform;
	}

	.preview-toggle:hover {
		background-color: #ef4444;
		color: #ffffff;
	}

	.preview-toggle span:first-child {
		display: block;
	}
	.preview-toggle:hover span:first-child {
		display: none;
	}

	.preview-toggle span:last-child {
		display: none;
	}
	.preview-toggle:hover span:last-child {
		display: block;
	}

	.page-transition {
		opacity: 0;
		visibility: hidden;
		transform: translate3d(0, 10px, 0);
		transition: opacity 0.3s ease-out, visibility 0.3s ease-out, transform 0.3s ease-out;
		transition-delay: 0.1s;
		will-change: transform, opacity;
	}

	.page-transition.page-ready {
		opacity: 1;
		visibility: visible;
		transform: translate3d(0, 0, 0);
	}
</style>
