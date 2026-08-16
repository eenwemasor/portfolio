<script setup lang="ts">
import IconGitHub from './icons/IconGitHub.vue'
import IconLinkedIn from './icons/IconLinkedIn.vue'
import IconX from './icons/IconX.vue'
import IconGlobe from './icons/IconGlobe.vue'
import IconRss from './icons/IconRss.vue'

withDefaults(defineProps<{
  name?: string
  year?: number
  rssHref?: string
}>(), {
  name: 'Enwemasor Barnabas',
  year: () => new Date().getFullYear(),
  rssHref: '/rss.xml'
})

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/eenwemasor', icon: IconGitHub },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/eenwemasor/', icon: IconLinkedIn },
  { name: 'X', href: 'https://x.com/EEnwemasor', icon: IconX },
  { name: 'Website', href: 'https://enwemasorbarnabas.com/', icon: IconGlobe }
]
</script>

<template>
  <footer class="pt-[64px] px-4 pb-24 text-gray-400 text-center">
    <span class="text-xxs uppercase tracking-wide">© {{ year }} {{ name }} · All rights reserved</span>
    <div class="mt-4">
      <div class="flex flex-col items-center gap-8">
        <div class="flex justify-center gap-4 opacity-75">
          <a v-for="social in socialLinks" :key="social.name" :href="social.href" target="_blank" class="no-underline">
            <span class="sr-only">{{ social.name }}</span>
            <component :is="social.icon" />
          </a>
        </div>
        <a
          :href="rssHref"
          class="inline-flex items-center gap-2 rounded-full border border-gloss-gray-800 bg-bg-base px-4 py-2 text-sm font-medium text-gloss-gray-400 shadow-sm shadow-black/5 transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-gloss-gray-600 focus:ring-offset-2 focus:ring-offset-black no-underline"
        >
          <IconRss class="w-4 h-4 fill-current text-gloss-gray-400 transition-colors duration-200" />
          <span>Subscribe via RSS</span>
        </a>
      </div>
    </div>
  </footer>
</template>
