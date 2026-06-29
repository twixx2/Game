import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    svgr(),
    visualizer({
      open: true,
      filename: 'stats.html',
      gzipSize: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // @ts-ignore
        api: 'modern-compiler'
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@context': path.resolve(__dirname, './src/app/providers'),
      '@layouts': path.resolve(__dirname, './src/app/layouts'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})
