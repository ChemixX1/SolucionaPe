import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/SolucionaPe/',
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
