import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess()
  ],

  kit: {
    adapter: vercel(),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore asset 404s and recursive path issues
        if (path.includes('/assets/') || 
            path.includes('/saturn-assets/') || 
            path.includes(path.split('/').pop())) {
          console.warn(`[prerender] Warning: ${message}`);
          return;
        }
        // For other 404s, throw an error
        throw new Error(message);
      },
      entries: ['*'],
      handleMissingId: 'ignore'
    }
  }
};

export default config;
