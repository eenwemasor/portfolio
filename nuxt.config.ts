import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: ['nuxt-gtag'],

  gtag: {
    id: 'G-8XTC70LWEG'
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/images/enwemasorbarnabas.jpeg' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'Enwemasor Barnabas', href: '/rss.xml' }
      ],
      titleTemplate: '%s · Enwemasor Barnabas',
      meta: [
        { name: 'description', content: 'Full-stack engineer who takes products from idea to production and keeps them running.' }
      ]
    }
  }
})