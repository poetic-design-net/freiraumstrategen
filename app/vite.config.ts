import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  base: '/',
  optimizeDeps: {
    include: ['gsap']
  },
  build: {
    target: 'esnext'
  },
  ssr: {
    noExternal: ['gsap']
  }
});
