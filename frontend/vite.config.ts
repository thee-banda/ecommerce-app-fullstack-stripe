import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Use relative paths so the build works whether Pages serves from a repo subfolder or a custom domain root.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: './',
})
