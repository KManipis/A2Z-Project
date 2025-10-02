import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/a2z-project/', // Repo Name
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173, // optional: lets you control dev server port
    open: true  // optional: auto-opens browser when running `npm run dev`
  }
})
