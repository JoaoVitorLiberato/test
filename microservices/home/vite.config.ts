import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import Sitemap from "vite-plugin-sitemap"
import { FeedBuilder } from '@xcommerceweb/google-merchant-feed'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { vitePluginVersionMark } from 'vite-plugin-version-mark'
import federation from "@originjs/vite-plugin-federation"

import URLS from './public/data/sitemap/urls.json'

import PORTIFIO_DEFAULT from "./src/data/portifolios/portifolioDefault.json"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env = { ...process.env, ...env }

  const VERSION_MARK_CONFIG = {
    ifGitSHA: false,
    ifShortSHA: false,
    ifMeta: false,
    ifLog: false,
    ifExport: true,
    ifGlobal: true,
  }

  return {
    plugins: [
      federation({
        name: 'mf_home',
        filename: 'remoteEntry.js',
        remotes: {
          core: "core@http://localhost:8080/core/remoteEntry.js"
        },
        exposes: {
          './App': './src/remote.ts'
        },
        shared: {
          vue: {
            singleton: true
          }
        }
      }),

      vue({
        template: {
          transformAssetUrls,
        },
      }),

      Sitemap({
        hostname: env.VITE_APP_WEB_URL,
        generateRobotsTxt: false,
        dynamicRoutes: (() => {
          const SITEMAP_URLS = []
          for (const url of Object.values(URLS)) {
            SITEMAP_URLS.push(url as string);
          }
          return SITEMAP_URLS;
        })(),
      }),

      vitePluginVersionMark({
        name: env.VITE_APP_WEB_TITLE || "googlemerchant.xml",
        outputFile: _version => ({
          path: 'googlemerchant.xml',
          content: (() => {
            const feedBuilder = new FeedBuilder();
            feedBuilder.withTitle(env.VITE_APP_WEB_TITLE)
            feedBuilder.withLink(env.VITE_APP_WEB_URL)
            feedBuilder.withDescription(env.VITE_APP_WEB_DESCRIPTION)

            for (const {
              sku,
              name,
              description,
              price
            } of Object.values(PORTIFIO_DEFAULT)) {
              feedBuilder.withProduct({
                id: sku,
                title: name,
                description: description.hero,
                link: `${env.VITE_APP_WEB_URL}/pedido/${sku}`,
                imageLink: "",
                additionalImageLinks: [],
                condition: "new",
                availability: "in_stock",
                price: {
                  currency: "BRL",
                  value: Number(price.fidelity) / 100
                },
                googleProductCategory: "491",
                productType: "Página inicial > Planos TIM para seu celular",
                taxCategory: "Planos de celular",
                customLabels: ["TIM Controle", "TIM Controle eSIM", "Plano para seu smartphone", "Chip", "Chip eSIM", "Plano Controle", "Plano Controle eSIM"],
                identifierExists: "no",
                brand: "tim",
                ageGroup: "adult",
                externalSellerId: "tim",
              });
            }

            return feedBuilder.buildXml()
          })(),
        }),
        ...VERSION_MARK_CONFIG
      }),

      vitePluginVersionMark({
        name: 'robots.txt',
        outputFile: () => ({
          path: 'robots.txt',
          content: `User-agent: *
            Allow: /
            Sitemap: /sitemap.xml
            Sitemap: ${env.VITE_APP_WEB_URL}/googlemerchant.xml
            Sitemap: ${env.VITE_APP_WEB_URL}/manifest.json
            Sitemap: ${env.VITE_APP_WEB_URL}/robots.txt
            Sitemap: ${env.VITE_APP_WEB_URL}/googlemerchant.xml
            Sitemap: ${env.VITE_APP_WEB_URL}/sitemap.xml`,
          }),
        ...VERSION_MARK_CONFIG,
      }),

      vuetify({ autoImport: true }),
    ],

    assetsInclude: ['**/*.html'],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },

    optimizeDeps: {
      include: ["vuetify", "vue-router"],
      exclude: [
        'unplugin-vue-router/runtime',
        'unplugin-vue-router/data-loaders',
        'unplugin-vue-router/data-loaders/basic',
      ]
    },

    define: {
      'process.env.VITE_APP_WEB_TITLE': JSON.stringify(env.VITE_APP_WEB_TITLE),
    },

    server: {
      port: 8081,
      cors: true,
      strictPort: true
    },

    preview: {
      port: 8081,
      strictPort: true
    },

    css: {
      preprocessorOptions: {
        sass: {},
        scss: {},
        stylus: {}
      },
    },

    build: {
      target: 'esnext',
      assetsInlineLimit: 126,
      sourcemap: 'hidden',
      minify: false,
      cssCodeSplit: false,
      assetsDir: '',

      base: '/mf-home/',

      rollupOptions: {
        // external: ["core"],
        input: 'index.html',
      }
    },
  }
})
