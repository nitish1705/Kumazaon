import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This exposes the server to the cloud network
    port: 3000,      // Forces Vite to use port 3000 (which your cloud IDE prefers)
    strictPort: true, 
    allowedHosts: true, // Allows the specific .ws4.app domain to connect
    cors: true
  }
})
