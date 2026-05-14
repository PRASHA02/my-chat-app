import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This allows the container to be accessed from your browser
    host: '0.0.0.0',
    port: 5173,
    // Polling is often necessary for Hot Module Replacement (HMR)
    // to work correctly when using Docker on Windows
    watch: {
      usePolling: true,
    },
  },
})