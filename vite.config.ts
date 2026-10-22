import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {viteSingleFile} from 'vite-plugin-singlefile';

export default defineConfig(({mode}) => {
  // `npm run build:single` inlines all JS and CSS into one shareable HTML file.
  const isSingleFile = mode === 'singlefile';
  return {
    // GitHub Pages serves the site from /<repo>/; the deploy workflow sets BASE_PATH.
    base: process.env.BASE_PATH || '/',
    plugins: [react(), tailwindcss(), ...(isSingleFile ? [viteSingleFile()] : [])],
    build: {copyPublicDir: !isSingleFile},
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
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
