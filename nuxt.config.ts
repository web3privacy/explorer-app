// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    'nuxt-lodash',
    'nuxt-headlessui',
    '@nuxt/image',
    '@vee-validate/nuxt',
  ],
  sourcemap: {
    server: true,
    client: false,
  },
  pinia: {
    storesDirs: ['~/composables'],
  },
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    // typedPages: true,
    componentIslands: true,
  },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  nitro: {
    preset: 'vercel',
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },
  vite: {
    build: {
      target: 'esnext',
    },
  },
  lodash: {
    prefix: '_',
  },
  runtimeConfig: {
    localDataPath: process.env.LOCAL_DATA_PATH,
    app: {
      github: {
        appId: process.env.GITHUB_APP_ID,
        privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
        installationId: process.env.GITHUB_INSTALLATION_ID,
        owner: process.env.GITHUB_OWNER,
        baseBranch: process.env.GITHUB_BASE_BRANCH || 'main',
        repo: process.env.GITHUB_REPO,
      },
    },
  },
})
