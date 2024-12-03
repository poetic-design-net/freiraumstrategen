import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess()
  ],

  kit: {
    adapter: vercel({
      // Enable edge runtime for better performance
      runtime: 'edge',
      // Ensure all routes are processed
      routes: {
        include: ['/*'],
        exclude: []
      },
      // Enable streaming responses
      split: true
    })
  }
};

export default config;
