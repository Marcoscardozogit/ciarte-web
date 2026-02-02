import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ciarte-ellaberinto.netlify.app',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/admin'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    })
  ],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
