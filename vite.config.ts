import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://invadetechsolutionz.com', // Replace with your actual domain
      dynamicRoutes: [
        '/',
        '/about',
        '/services',
        '/contact',
        '/career',
        '/tech-buzz',
      ],
    }),
  ],
})
