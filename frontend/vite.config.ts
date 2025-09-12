import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Configurações de build para produção otimizadas
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'charts': ['chart.js', 'react-chartjs-2', 'recharts', 'plotly.js'],
          'utils': ['axios', 'date-fns', 'papaparse']
        }
      }
    }
  },
  
  // Configurar polyfills para Node.js modules
  define: {
    global: 'globalThis',
  },
  
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
      util: 'util',
    },
  },
  
  // Otimizações de desenvolvimento
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled']
  },
  
  // Servidor de desenvolvimento
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },
  
  // Preview para produção local
  preview: {
    port: 4173,
    host: true
  },
  
  // Configurações de base para deploy
  base: '/',
  
  // Otimizações de performance
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled', 'buffer', 'process']
  }
})
