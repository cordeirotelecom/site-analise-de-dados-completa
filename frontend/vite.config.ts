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
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'mui';
            }
            if (id.includes('plotly') || id.includes('chart') || id.includes('recharts')) {
              return 'charts';
            }
            return 'vendor';
          }
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
    include: ['react', 'react-dom', '@mui/material', '@mui/icons-material', 'buffer', 'process']
  }
})
