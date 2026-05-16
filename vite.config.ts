import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://13.234.78.55:8080',
      '/admin': 'http://13.234.78.55:8080',
      '/uploads': 'http://13.234.78.55:8080',
    }
  }
})
