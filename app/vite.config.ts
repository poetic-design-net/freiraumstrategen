import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  base: '/', // Der Basis-Pfad kann so bleiben, solange die App im Root der Subdomain läuft
});
