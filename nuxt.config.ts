// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/tailwind.css", "@/assets/scss/main.scss"],
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-icon",
  ],
  imports: {
    dirs: ["stores", "locales"],
  },
  typescript: {
    strict: true,
  },
});
