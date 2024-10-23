import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      // Fügen Sie diese Zeilen hinzu
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false
    }),
    
    // Fügen Sie diese Zeile hinzu
    outDir: 'build',
    
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
