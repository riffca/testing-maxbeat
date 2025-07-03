// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  ssr: false,
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxt/eslint"],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:3000",
    },
  },
  postcss: {
    plugins: {
      "postcss-nested": {},
      "postcss-custom-media": {},
    },
  },
});
