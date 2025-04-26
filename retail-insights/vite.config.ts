// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ['.'], // allow access to all files (default)
      deny: ['api'], // deny access to /api folder
    },
  },
})
