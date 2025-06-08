import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Import path module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure this is correct
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Ensure this resolves correctly
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
    historyApiFallback: true, // SPA fallback
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'main.jsx'), // Explicitly set the entry point
    },
  },
})
