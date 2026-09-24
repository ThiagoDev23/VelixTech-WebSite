import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this as a project page at /VelixTech-WebSite/, so assets
  // need that prefix in production builds there. Netlify serves the site at the
  // domain root, so skip the prefix when building on Netlify (env var it sets
  // automatically) or for local previews.
  base: command === 'build' && !process.env.NETLIFY ? '/VelixTech-WebSite/' : '/',
}))
