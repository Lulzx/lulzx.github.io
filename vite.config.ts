// Builds the standalone /gallery page (React + the @ag/lightbox registry component).
// Everything else on the site stays hand-written, no build step.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  root: 'gallery-src',
  base: '/gallery/',
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./gallery-src/src', import.meta.url)) } },
  build: { outDir: '../gallery', emptyOutDir: false, assetsDir: 'assets' },
})
