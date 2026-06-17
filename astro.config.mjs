import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  redirects: {
    '/': '/de',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});