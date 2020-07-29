/* eslint-disable no-param-reassign */
import colors from 'vuetify/es5/util/colors'

import { resolve } from 'path'
// const { resolve } = require('path')

export default {
  // mode: 'universal',
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: `%s - ${process.env.npm_package_name}`,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  env: {
    test: true
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: colors.teal.darken1, height: '4px', continuous: true },
  /*
   ** Global CSS
   */
  css: ['@/assets/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // '@/plugins/test.js'
    '@/plugins/main.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    // '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    [
      'nuxt-compress',
      {
        gzip: {
          cache: true
        },
        brotli: {
          threshold: 10240
        }
      }
    ],
    '@nuxtjs/proxy'
  ],
  apollo: {
    tokenName: 'muninn.cid',
    cookieAttributes: {
      expires: undefined // optional, default: 7 (days)
      //   path: '/', // optional
      //   // domain: 'example.com', // optional
      //   secure: process.env.NODE_ENV === 'production'
    },
    clientConfigs: {
      default: {
        tokenName: 'muninn.cid',
        httpEndpoint: process.env.BACKEND_URL || 'http://localhost:3000/graphql'
      }
    }
  },
  proxy: {
    '/graphql': {
      target: 'http://localhost:3002/graphql'
      // pathRewrite: {
      //   '^/api': '/'
      // }
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  generate: {
    routes: ['/']
  },
  /*     fallback: 'fallback-spa.html',
   ** Build configuration
   */
  build: {
    babel: {
      // envName: server, client, modern
      presets({ envName }) {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias['~shared'] = resolve('../shared')
      // config.devtool = 'inline-source-map'
      // config.devtool = 'eval-source-map'
      if (ctx.isClient) {
        config.devtool = 'source-map'
      }
      if (ctx.isServer) {
        config.devtool = 'inline-source-map'
      }
      // if (ctx.isDev) {
      //   config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      // }
    }
  }
}
