import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import { fileURLToPath, URL } from 'url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env = { ...process.env, ...env }

  return {
    plugins: [
      vue(),
      federation({
        name: "core",
        filename: "remoteEntry.js",
        exposes: {
          ".": "./src/index.ts"
        },
        shared: {
          vue: {
            singleton: true
          },
          pinia: {
            singleton: true,
            eager: true,
          },
        }
      })
    ],
    
    assetsInclude: ['**/*.html', "src/**/*.html"],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url)),
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    },

    define: {
      'process.env.VITE_APP_WEB_TITLE': JSON.stringify(env.VITE_APP_WEB_TITLE),
    },

    server: {
      port: 3000,
      cors: true,
      strictPort: true
    },

    preview: {
      port: 3000,
      strictPort: true
    },

    build: {
      target: 'esnext',
      assetsInlineLimit: 126,
      sourcemap: 'hidden',
      minify: false,
      cssCodeSplit: false,
      assetsDir: '',

      base: '/core/',

      rollupOptions: {
        external: ['vue', 'pinia'],
        output: {
          globals: {
            vue: 'Vue',
            pinia: 'Pinia',
          },
        },
      },
    },
  }
})