// packages/core/vite.config.ts
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'core',
      filename: 'remoteEntry.[hash].js',
      manifest: true,
      exposes: {
        './index': './src/index.ts'
      },
      shared: {
        vue: { singleton: true },
        pinia: { singleton: true, eager: true }
      },
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    base: '/core/',
    target: 'esnext',
    minify: 'terser',
    cssCodeSplit: false,

    assetsInlineLimit: 126,
    sourcemap: 'hidden',

    lib: {
      entry: 'src/index.ts',  // ← importante pro remote puro
      formats: ['es']
    },
    rollupOptions: {
      output: {
        entryFileNames: 'entry/[name]-[hash].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
})