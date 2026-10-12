import { rmSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves this as a project page at /VelixTech-WebSite/, so assets
// need that prefix only when the build runs in the GitHub Pages workflow
// (GitHub Actions sets GITHUB_ACTIONS automatically). Everywhere else —
// Cloudflare Pages (velixtech.com.br), Netlify and local previews — the site
// is served at the domain root.
const isGitHubPages = !!process.env.GITHUB_ACTIONS

// public/404.html is the GitHub Pages SPA-routing workaround and assumes the
// /VelixTech-WebSite/ prefix. On root-served hosts it would break client-side
// routes (Cloudflare Pages uses 404.html instead of its built-in SPA fallback),
// so drop it from the output there.
const dropGitHubPages404 = {
  name: 'drop-github-pages-404',
  apply: 'build',
  closeBundle() {
    if (!isGitHubPages) rmSync(resolve('dist', '404.html'), { force: true })
  },
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), dropGitHubPages404],
  base: command === 'build' && isGitHubPages ? '/VelixTech-WebSite/' : '/',
}))
