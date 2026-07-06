import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import basicSsl from "@vitejs/plugin-basic-ssl";
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    basicSsl(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://192.168.0.129:8000',
        changeOrigin: true,
        secure: false
      },
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
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
