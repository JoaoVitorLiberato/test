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
        name: "container",
        remotes: {
          mf_home: "http://localhost:8080/mf-home/remoteEntry.js"
          // home: "http://localhost:8081/remoteEntry.js"
        },
        shared: ["vue"]
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
      assetsInlineLimit: 126,
      sourcemap: 'hidden',
      minify: false,
      cssCodeSplit: false,
      assetsDir: './',

      rollupOptions: {
        // output: {
        //   // 3. Remove hashes do HTML (opcional, mas facilita o debug)
        //   assetFileNames: (assetInfo) => {
        //     if (assetInfo.name === 'index.html') {
        //       return '[name].[ext]';
        //     }
        //     return 'assets/[name]-[hash].[ext]';
        //   }
        // },
        // 4. Garante que o index.html seja o ponto de entrada principal
        input: 'index.html', 
      }
    },
  }
})