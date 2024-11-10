<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '$lib/components/LiveMode.svelte';
	import "../app.pcss";
	import Header from '$lib/templates/Header.svelte';
	import Footer from '$lib/templates/Footer.svelte';
	import { afterNavigate } from '$app/navigation';
	export let data;
	import CookieConsentComponent from '$lib/cookie/cookieconsent.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { dev } from '$app/environment';

  let contentLoaded = false;
  let ready = false;
  let environment = dev ? 'development' : 'production';

  console.log(`Environment: ${environment}`);
  console.log('Initial ready state:', ready);

  if (browser) {
    console.log('Browser detected, setting ready');
    ready = true;
  }

  onMount(() => {
    console.log('Layout mounted');
    ready = true;
    console.log('Ready state after mount:', ready);

    // Content Check mit detaillierten Logs
    const checkContent = () => {
      const mainContent = document.querySelector('main');
      console.log('Checking content...', {
        mainExists: !!mainContent,
        childrenCount: mainContent?.children?.length,
        slotContent: mainContent?.querySelector('slot'),
        visibilityState: document.visibilityState,
        readyState: document.readyState
      });

      if (mainContent && mainContent.children.length > 0) {
        console.log('Content loaded successfully');
        contentLoaded = true;
      } else {
        console.log('Content not ready, requesting next frame');
        requestAnimationFrame(checkContent);
      }
    };
    
    checkContent();
  });

  afterNavigate(() => {
    console.log('Navigation occurred');
    ready = true;
    isArticlePage = $page.url.pathname.startsWith('/post');
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('article-page', isArticlePage);
    }
  });

  $: {
    console.log('Ready state changed:', ready);
    console.log('Content loaded state:', contentLoaded);
    console.log('Combined ready state:', isReady);
  }

  // Kombinierter State
  $: isReady = ready && contentLoaded;

</script>

{#if $isPreviewing}
	<a href={`/preview/disable?redirect=${$page.url.pathname}`} class="preview-toggle">
		<span>Preview Enabled</span>
		<span>Disable Preview</span>
	</a>
{/if}

<Header {data} />	
	
	<main>
		{#if browser}
			<div style="display: none">
				Environment: {environment}
				Ready: {ready}
				Content: {contentLoaded}
				Combined: {isReady}
			</div>
		{/if}

		<div 
			class="page-transition" 
			class:page-ready={isReady}
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


	:global(body.article-page) {
    @apply bg-radial-gradient;
    backface-visibility: hidden;
  	}
	

	.footer {
		display: flex;
		justify-content: flex-end;
		padding: 0 var(--space-3);
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
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		color: #1f2937;
		display: block;
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1rem;
		padding-bottom: 0.5rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.5rem;
		position: fixed;
		right: 1rem;
		text-align: center;
		text-decoration: none;
		z-index: 50;
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
    transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
    transition-delay: 0.1s;
  }

  .page-transition.page-ready {
    opacity: 1;
    visibility: visible;
  }



</style>



