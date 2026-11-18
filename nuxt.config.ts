// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/a11y',
    '@nuxt/content',
    '@nuxt/image'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: {
      // Node's built-in node:sqlite (Node >= 22.5) instead of the native better-sqlite3 build
      sqliteConnector: 'native'
    }
  },

  // Light mode only: the theme is built around ink on fog, so no color-mode module or toggle.
  ui: {
    colorMode: false
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      crawlLinks: true,
      // Not linked from the site, so the crawler won't find it on its own.
      routes: ['/styleguide']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    families: [{
      // One variable family; the width axis does the display/body split (expanded headings, normal body).
      name: 'Archivo',
      provider: 'google',
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin'],
      providerOptions: {
        google: {
          experimental: {
            variableAxis: { wdth: [['62', '125']] }
          }
        }
      }
    }, {
      // Mono accent: static cuts, only the weights the theme uses.
      name: 'IBM Plex Mono',
      provider: 'google',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin']
    }]
  }
})
