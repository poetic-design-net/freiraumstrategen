<script>
	import { onMount } from 'svelte';
	import * as CookieConsent from 'vanilla-cookieconsent';
	import config from './cookieconsent-config';
	import 'vanilla-cookieconsent/dist/cookieconsent.css';

	/**
	 * Only run plugin on the client side
	 */
	onMount(() => {
		CookieConsent.run(config);
	});
</script>


<!--
<button on:click={CookieConsent.showPreferences}>Open consent preferences</button>
-->

<style>

/* Variante 1: Globaler Scope mit :root */
:root {
     --cc-font-family: inherit;
     --cc-btn-primary-bg: #015261 !important;
     --cc-btn-primary-border-color: #000000;
     --cc-btn-primary-hover-bg: #0b8695;
     --cc-btn-primary-hover-border-color: #0b8695;
     --cc-toggle-on-bg: var(--cc-btn-primary-bg);
     --cc-btn-border-radius: 10px;
}

</style>
