// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@clerk/nuxt',
    '@vueuse/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  // Color mode configuration
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  // i18n configuration
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        dir: 'ltr'
      },
      {
        code: 'ar',
        name: 'العربية',
        file: 'ar.json',
        dir: 'rtl'
      }
    ],
    lazy: false,
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    clerkSecretKey: process.env.NUXT_CLERK_SECRET_KEY,
    databaseUrl: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_URL,

    // Public keys (exposed to client-side)
    public: {
      clerkPublishableKey: process.env.NUXT_CLERK_PUBLISHABLE_KEY,
      supabaseUrl: process.env.NUXT_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_SUPABASE_ANON_KEY
    }
  },

  // TypeScript configuration
  typescript: {
    typeCheck: false
  },

  // Build configuration
  build: {
    transpile: ['@prisma/client', '@clerk/nuxt']
  },

  // Nitro configuration for Prisma
  nitro: {
    experimental: {
      wasm: true
    }
  }
})