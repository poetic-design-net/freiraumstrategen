import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess()
  ],

  kit: {
    adapter: vercel({
      routes: {
        include: ['/*'],
        exclude: []
      },
      split: true
    }),
    prerender: {
      entries: ['/summer-academy'],
      handleHttpError: ({ path, referrer, message }) => {
        // During prerendering, treat 404s and 500s as warnings
        if ([404, 500].includes(Number(message.match(/^(\d+)/)?.[1]))) {
          console.warn(`Warning: ${message}`);
          return;
        }
        throw new Error(message);
      },
      handleMissingId: ({ id, path, referrers }) => {
        // Log missing IDs as warnings instead of failing the build
        console.warn(`Warning: Missing ID "${id}" on path "${path}". Referrers: ${referrers.join(', ')}`);
      }
    }
  }
};

export default config;
