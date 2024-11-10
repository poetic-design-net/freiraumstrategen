<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '$lib/components/LiveMode.svelte';
	import "../app.pcss";
	import Header from '$lib/templates/Header.svelte';
	import Footer from '$lib/templates/Footer.svelte';
	import { afterNavigate } from '$app/navigation';
	import CookieConsentComponent from '$lib/cookie/cookieconsent.svelte';
	import { browser } from '$app/environment';
	
	export let data;
	let isArticlePage = false;
	let ready = false;

	if (browser) {
		ready = true;
	}

	afterNavigate(() => {
		ready = true;
		isArticlePage = $page.url.pathname.startsWith('/post');
		if (typeof document !== 'undefined') {
			document.body.classList.toggle('article-page', isArticlePage);
		}
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
		<CookieConsentComponent/>
	</div>
</main>

<Footer />

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}

<style lang="postcss">
	.page-transition {
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
	}

	.page-transition.page-ready {
		opacity: 1;
		visibility: visible;
	}

	/* ... rest der Styles ... */
</style>



