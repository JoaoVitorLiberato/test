import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite'
import { fileURLToPath, URL } from 'url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env = { ...process.env, ...env }

  return {
    plugins: [
      vue(),

      federation({
        name: 'container',
        filename: 'remoteEntry.[hash].js',
        manifest: true,

        remotes: {
          mf_home: "http://localhost:8080/mf-home/.vite/manifest.json"
        },

        shared: {
          vue: { singleton: true }
        },
      })
    ],

    assetsInclude: ['src/**/*.html'],

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
      port: 9000,
      cors: true,
      strictPort: true
    },

    preview: {
      port: 9000,
      strictPort: true
    },


    optimizeDeps: {
      include: [
        "vue-router",
      ],
      exclude: [
        'unplugin-vue-router/runtime',
        'unplugin-vue-router/data-loaders',
        'unplugin-vue-router/data-loaders/basic',
      ]
    },


    build: {
      target: 'esnext',
      cssCodeSplit: false,
      rollupOptions: {
        input: 'index.html',
      },
    },
  }
})