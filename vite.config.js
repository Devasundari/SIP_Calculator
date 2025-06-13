import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: 'localhost',
    port: 5173,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
    fs: {
      strict: false,
    },
  },
  build: {
    rollupOptions: {
      // ✅ FIXED: Correct entry point inside src folder
      input: path.resolve(__dirname, 'index.html'),
    },
  },
})
