<script>
import { onMount } from 'svelte';
import config from './cookieconsent-config';

let isInitialized = false;

/**
 * Initialize cookie consent after user interaction
 */
const initCookieConsent = async () => {
  if (isInitialized) return;
  
  try {
    // Importiere zuerst die CSS
    await import('vanilla-cookieconsent/dist/cookieconsent.css');
    
    // Dann das Modul
    const { run } = await import('vanilla-cookieconsent');
    
    // Initialisiere das Cookie-Banner
    run(config);
    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize cookie consent:', error);
  }
};

onMount(() => {
  // Initialize on user interaction
  const handleInteraction = () => {
    initCookieConsent();
    // Clean up event listeners
    document.removeEventListener('scroll', handleInteraction);
    document.removeEventListener('mousemove', handleInteraction);
    document.removeEventListener('touchstart', handleInteraction);
  };

  // Add event listeners with passive option for better performance
  document.addEventListener('scroll', handleInteraction, { passive: true });
  document.addEventListener('mousemove', handleInteraction, { passive: true });
  document.addEventListener('touchstart', handleInteraction, { passive: true });

  // Fallback initialization after 3 seconds if no interaction
  setTimeout(handleInteraction, 3000);

  return () => {
    // Cleanup on component destroy
    document.removeEventListener('scroll', handleInteraction);
    document.removeEventListener('mousemove', handleInteraction);
    document.removeEventListener('touchstart', handleInteraction);
  };
});
</script>

<style>
/* Override default cookie consent styles with higher specificity */

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
