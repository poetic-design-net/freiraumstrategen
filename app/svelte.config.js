import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess()
  ],

  kit: {
    adapter: vercel({
      runtime: 'edge',
      routes: {
        include: ['/*'],
        exclude: []
      },
      split: true
    }),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore 404s and 500s during prerendering
        if ([404, 500].includes(Number(message.match(/^(\d+)/)?.[1]))) {
          return;
        }
        // Otherwise, fail the build
        throw new Error(message);
      }
    }
  }
};

export default config;
