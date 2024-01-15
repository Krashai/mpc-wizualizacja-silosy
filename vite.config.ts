import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    cors: false,
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 100,
  },
  preview: {
    cors: false,
    host: 'localhost',
    port: 100,
  },
})
