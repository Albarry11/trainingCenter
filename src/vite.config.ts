import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Pure Frontend Vite Configuration - No Backend Dependencies
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    target: 'es2020',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'motion'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
  },
  define: {
    // Pure frontend environment - completely disable backend
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    'process.env.VITE_FRONTEND_ONLY': '"true"',
    'global': 'globalThis',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'motion'],
    exclude: [
      // Backend/Server dependencies
      'mongodb', 
      '@vercel/node', 
      '@supabase/supabase-js',
      'supabase',
      'recharts',
      // Node.js built-ins
      'fs',
      'path',
      'crypto',
      'node:*',
      // Any potential server-side libraries
      'express',
      'next',
      'serverless',
      'edge-runtime'
    ],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  resolve: {
    alias: {
      // Completely prevent any backend/server modules
      'mongodb': false,
      'fs': false,
      'path': false,
      'crypto': false,
      '@supabase/supabase-js': false,
      'supabase': false,
      'node:crypto': false,
      'node:fs': false,
      'node:path': false,
      // Prevent edge runtime
      'edge-runtime': false,
      '@vercel/edge': false,
    }
  },
  // Completely disable workers that might trigger edge functions
  worker: {
    format: 'es',
    plugins: []
  }
})