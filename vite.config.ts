import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // When deploying to GitHub Pages for the ftg-simulation repository,
  // set the base to the repository name so assets are referenced correctly.
  base: process.env.NODE_ENV === 'production' ? '/ftg-simulation/' : '/',
})
