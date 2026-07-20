// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Swan's Office — static output. The standard view is pre-rendered semantic
// HTML (SEO baseline); the office mounts as a React island over it (CLAUDE.md §6).
// The real site URL is set in Phase 9 when the domain is bought.
export default defineConfig({
  site: 'https://swans-office.pages.dev',
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
