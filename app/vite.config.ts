import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  base: '/',
  optimizeDeps: {
    include: ['gsap', 'gsap/all']
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Create a chunk for GSAP
          if (id.includes('gsap')) {
            return 'gsap';
          }
          // Create a chunk for Sanity
          if (id.includes('@sanity')) {
            return 'sanity';
          }
        }
      }
    }
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.js', '.ts', '.svelte'],
    alias: {
      'gsap/all': '@gsap/shockingly/all'
    }
  }
});
