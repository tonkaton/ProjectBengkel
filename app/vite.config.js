import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi resmi Vite 5 + React
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
      },
    },
  },
  build: {
    rollupOptions: {},
  },
})