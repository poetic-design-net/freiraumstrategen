
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    prerender: {
      entries: ['/'],
      handleHttpError: 'warn'
    },
    vite: {
      resolve: {
        alias: {
          $static: path.resolve('./static')
        }
      }
    }
  }
};

export default config;
