import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import viteCompression from 'vite-plugin-compression'

export default defineConfig(async ({ mode }) => {
  const plugins = [
    react(),
    viteCompression({
      verbose: false,
      disable: false,
      threshold: 2048,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    viteCompression({
      verbose: false,
      disable: false,
      threshold: 2048,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ]

  if (mode === 'analyze') {
    try {
      const mod = await import('rollup-plugin-visualizer')
      const visualizer =
        typeof mod === 'object' && mod !== null && 'visualizer' in mod
          ? (mod as { visualizer: (opts: Record<string, unknown>) => unknown }).visualizer
          : undefined
      if (visualizer) {
        plugins.unshift(
          visualizer({
            filename: 'dist/bundle-treemap.html',
            template: 'treemap',
            gzipSize: true,
            brotliSize: true,
          })
        )
      }
    } catch {
      console.warn('rollup-plugin-visualizer not available; skipping analysis')
    }
  }

  return {
    plugins,
    resolve: {
      alias: Object.fromEntries(
        Object.entries({
          '@': path.resolve(__dirname, 'src'),
          ...(process.env.VITEST
            ? { 'embla-carousel-react': path.resolve(__dirname, 'src/test/stubs/embla-carousel-react.ts') }
            : {})
        })
      ),
    },
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            router: ['react-router-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      css: true,
    },
  }
})
