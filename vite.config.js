import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      integration: {
        closeBundleOrder: 'post',
      },
      includeAssets: [
        'favicon.svg',
        'apple-touch-180.png',
        'icon-192.png',
        'icon-512.png',
        'icon-maskable-512.png',
      ],
      manifest: {
        name: 'CMOCS — Gestión de flotas y maquinaria',
        short_name: 'CMOCS',
        description:
          'Centro de mando para empresas de flota, maquinaria y transporte de carga: vehículos, órdenes de trabajo, FUEC, rastreo, facturación y más.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#0d141c',
        theme_color: '#ffffff',
        lang: 'es-CO',
        categories: ['business', 'productivity'],
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
