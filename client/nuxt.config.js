import colors from 'vuetify/es5/util/colors'

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
    ]
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.BACKEND_URL || 'http://localhost:3002/graphql'
      }
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
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
    fallback: 'fallback-spa.html'
  },
  /*
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
    extend(config, ctx) {}
  }
}
