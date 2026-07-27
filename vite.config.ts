import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Multi-page: one install, one build, two independent client sites + a portfolio index.
// base is the GitHub Pages repo path; relative asset URLs keep each entry self-contained.
export default defineConfig({
  base: '/webdev-portfolio/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        portfolio: path.resolve(__dirname, 'index.html'),
        roestwerk: path.resolve(__dirname, 'roestwerk/index.html'),
        roestwerkImpressum: path.resolve(__dirname, 'roestwerk/impressum.html'),
        roestwerkDatenschutz: path.resolve(__dirname, 'roestwerk/datenschutz.html'),
        kesselstrom: path.resolve(__dirname, 'kesselstrom/index.html'),
        kesselstromImpressum: path.resolve(__dirname, 'kesselstrom/impressum.html'),
        kesselstromDatenschutz: path.resolve(__dirname, 'kesselstrom/datenschutz.html'),
        apexRoofing: path.resolve(__dirname, 'apex-roofing/index.html'),
        hillsideRoof: path.resolve(__dirname, 'hillside-roof/index.html'),
        elmexabarber: path.resolve(__dirname, 'elmexabarber/index.html'),
        elmexabarberPrivacy: path.resolve(__dirname, 'elmexabarber/privacy.html'),
      },
    },
  },
})

