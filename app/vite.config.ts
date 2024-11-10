import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  base: '/',
  optimizeDeps: {
    include: ['gsap', 'gsap/all']
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.js', '.ts', '.svelte'],
    alias: {
      'gsap/all': '@gsap/shockingly/all'
    }
  }
});
