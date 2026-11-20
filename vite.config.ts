import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifest: false,
        workbox: {
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2,webmanifest}'],
          globIgnores: ['**/assets/aistudio/**'],
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api\//],
          runtimeCaching: [
            {
              urlPattern: ({url}) => url.pathname.startsWith('/api/'),
              handler: 'NetworkOnly',
              method: 'GET',
            },
            {
              urlPattern: ({url}) => url.pathname.startsWith('/api/'),
              handler: 'NetworkOnly',
              method: 'POST',
            },
            {
              urlPattern: /^https:\/\/script\.google\.com\/.*/i,
              handler: 'NetworkOnly',
              method: 'GET',
            },
            {
              urlPattern: /^https:\/\/script\.google\.com\/.*/i,
              handler: 'NetworkOnly',
              method: 'POST',
            },
            {
              urlPattern: /^https:\/\/script\.googleusercontent\.com\/.*/i,
              handler: 'NetworkOnly',
              method: 'GET',
            },
            {
              urlPattern: /^https:\/\/script\.googleusercontent\.com\/.*/i,
              handler: 'NetworkOnly',
              method: 'POST',
            },
            {
              urlPattern: /^https:\/\/(sheets\.googleapis\.com|docs\.google\.com)\/.*/i,
              handler: 'NetworkOnly',
              method: 'GET',
            },
            {
              urlPattern: /^https:\/\/(sheets\.googleapis\.com|docs\.google\.com)\/.*/i,
              handler: 'NetworkOnly',
              method: 'POST',
            },
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-stylesheets',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-webfonts',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
