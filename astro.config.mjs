import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://majesta.net',
  trailingSlash: 'never',
  vite: {
    build: {
      // Keep client JS as files so Netlify can apply script-src 'self'.
      assetsInlineLimit: 0,
    },
  },
  fonts: [
    {
      name: 'Josefin Sans',
      cssVariable: '--font-display',
      provider: fontProviders.google(),
      weights: [300, 400],
      styles: ['normal'],
      subsets: ['latin'],
      formats: ['woff2'],
    },
    {
      name: 'Inter',
      cssVariable: '--font-text',
      provider: fontProviders.google(),
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      formats: ['woff2'],
    },
  ],
});
