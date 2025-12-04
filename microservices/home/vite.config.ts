import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import Sitemap from "vite-plugin-sitemap"
import { FeedBuilder } from '@xcommerceweb/google-merchant-feed'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { vitePluginVersionMark } from 'vite-plugin-version-mark'

import federation from "@originjs/vite-plugin-federation"

import URLS from './public/data/sitemap/urls.json'

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
        exposes: {
          './App': './src/main.ts'
        },
        shared: ["vue"]
      }),

      vue({
        template: {
          transformAssetUrls,
        },
      }),

      Sitemap({
        hostname: 'https://teste.online',
        outDir: path.resolve(__dirname, 'dist'),
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
            // https://github.com/xcommerceweb/google-merchant-feed
            feedBuilder.withTitle(env.VITE_APP_WEB_TITLE)
            feedBuilder.withLink(env.VITE_APP_WEB_URL)
            feedBuilder.withDescription(env.VITE_APP_WEB_DESCRIPTION)

            fetch(`${env.VITE_APP_VERTEX_APPLICATION_SEED_API}?canalvendas=varejo&segmento=controle-fatura&regiao=SP&ddd=11`, {
              method: "GET"
            })
              .then((responseSeedWorker) => responseSeedWorker.json())
              .then((data) => {
                if ("status" in data && data.status === 200) return

                for (const {
                  sku,
                  name,
                  description,
                  price,
                } of Object.values(data) as any) {
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
                      value: Number(price.base) / 100,
                    },
                    // https://www.google.com/basepages/producttype/taxonomy-with-ids.pt-BR.txt
                    googleProductCategory: "491",
                    productType: "Página inicial > Planos para seu celular",
                    taxCategory: "Planos de celular",
                    customLabels: ["smartphone", "Plano para seu smartphone", "Chip", "Chip eSIM", "Plano Controle", "Plano Controle eSIM"],
                    identifierExists: "no",
                    brand: "tim",
                    ageGroup: "adult",
                    externalSellerId: "tim",
                  });
                }
              })
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

    optimizeDeps: {
      include: [
        "vuetify",
        "vue-router",
      ],
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

    base: "/mf-home/",

    build: {
      target: 'esnext',
      assetsInlineLimit: 126,
      sourcemap: 'hidden',
      minify: false,
      cssCodeSplit: false,
      assetsDir: '',
      // rollupOptions: {
      //   output: {
      //     publicPath: "/mf-home/"
      //   }
      // }
    },
  }
})
