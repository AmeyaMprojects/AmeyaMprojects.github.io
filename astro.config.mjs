// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production URL: canonical, OG and sitemap depend on it. Served by GitHub Pages.
export default defineConfig({
  site: 'https://ameyamprojects.github.io',
  trailingSlash: 'always',
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
});
