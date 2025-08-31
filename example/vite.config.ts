import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      'responsive-chessboard': path.resolve(__dirname, '../src')
    }
  },
  optimizeDeps: {
    exclude: ['responsive-chessboard']
  }
})