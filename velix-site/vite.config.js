import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this as a project page at /VelixTech-WebSite/,
  // so assets need that prefix in production builds.
  base: command === 'build' ? '/VelixTech-WebSite/' : '/',
}))
