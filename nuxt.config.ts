export default defineNuxtConfig({
  buildModules: ['@nuxt/typescript-build'],
  vite: {
    server: {
      fs: {
        strict: true,
      },
    },
  },
});