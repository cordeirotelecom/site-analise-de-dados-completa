import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Configurações de build para produção
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'mui': ['@mui/material', '@mui/icons-material', '@mui/lab'],
          'charts': ['plotly.js', 'react-plotly.js', 'recharts'],
          'utils': ['axios', 'date-fns']
        }
      }
    }
  },
  
  // Otimizações de desenvolvimento
  server: {
    port: 3000,
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
    include: ['react', 'react-dom', '@mui/material', '@mui/icons-material']
  }
})
