import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess()
  ],

  kit: {
    adapter: vercel({
      runtime: 'nodejs18.x', // Changed from 'edge' to 'nodejs18.x'
      routes: {
        include: ['/*'],
        exclude: []
      },
      split: true
    }),
    prerender: {
      entries: ['*'],
      handleHttpError: ({ path, referrer, message }) => {
        // During prerendering, treat 404s and 500s as warnings
        if ([404, 500].includes(Number(message.match(/^(\d+)/)?.[1]))) {
          console.warn(`Warning: ${message}`);
          return;
        }
        throw new Error(message);
      }
    }
  }
};

export default config;
