<script setup lang="ts">
import { ref } from 'vue'
import LogoMark from './icons/LogoMark.vue'
import IconHome from './icons/IconHome.vue'
import IconChevronDown from './icons/IconChevronDown.vue'
import IconGitHub from './icons/IconGitHub.vue'
import IconLinkedIn from './icons/IconLinkedIn.vue'
import IconX from './icons/IconX.vue'
import IconGlobe from './icons/IconGlobe.vue'

export interface NavItem {
  label: string
  href: string
}

const props = withDefaults(defineProps<{
  navItems?: NavItem[]
  activeHref?: string
  showSocial?: boolean
  logoSrc?: string
  logoAlt?: string
  logoHref?: string
}>(), {
  navItems: () => [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Posts', href: '/posts' },
    { label: 'About', href: '/about' },
    { label: 'CV', href: '/cv' },
  ],
  activeHref: '/posts',
  showSocial: true,
  logoSrc: undefined,
  logoAlt: 'Logo',
  logoHref: '/'
})

const sheetOpen = ref(false)

function isActive(href: string) {
  return href === props.activeHref
}

const desktopLinkClass = (active: boolean) => [
  'relative z-10 rounded-full text-sm font-medium transition-colors duration-200 items-center md:flex gap-3 px-4 py-3 max-md:pr-0 md:gap-0 md:p-2.5 md:justify-center hidden',
  active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
]

const mobileLinkClass = (active: boolean) => [
  'rounded-full px-5 py-3 text-base font-medium transition-[opacity,color,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
  active
    ? 'text-gray-900 bg-white shadow-sm shadow-muted-purple/10 ring-1 ring-muted-purple/[0.03]'
    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/eenwemasor', icon: IconGitHub },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/eenwemasor/', icon: IconLinkedIn },
  { name: 'X', href: 'https://x.com/EEnwemasor', icon: IconX },
  { name: 'Website', href: 'https://enwemasorbarnabas.com/', icon: IconGlobe }
]
</script>

<template>
  <header class="py-3 pl-3 pr-2 md:py-4 md:px-4" data-astro-transition-persist="site-header">
    <nav class="flex items-center justify-between max-w-[1400px] mx-auto px-1 md:px-4">
      <a :href="logoHref" class="text-gray-800 hover:text-gray-900 transition-colors shrink-0">
        <span class="sr-only">{{ logoAlt }}</span>
        <img v-if="logoSrc" :src="logoSrc" :alt="logoAlt" width="48" height="48"
          class="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm">
        <LogoMark v-else />
      </a>

      <div class="relative md:static">
        <div data-nav
          class="relative flex items-center md:absolute md:left-1/2 md:-translate-x-1/2 bg-white/50 backdrop-blur-xl rounded-full px-1 py-1 border border-white/40 shadow-md shadow-black/2 ring-1 ring-black/[0.02]">
          <a v-for="item in navItems" :key="item.href" :href="item.href"
            :aria-label="item.label === 'Home' ? 'Home' : undefined"
            :aria-current="isActive(item.href) ? 'page' : undefined" :class="desktopLinkClass(isActive(item.href))">
            <IconHome v-if="item.label === 'Home'" />
            <span :class="item.label === 'Home' ? 'md:hidden' : ''">{{ item.label }}</span>
          </a>

          <button type="button" :aria-expanded="sheetOpen" aria-controls="nav-sheet" aria-label="More navigation"
            class="md:hidden relative z-10 rounded-full p-3 text-gray-600 hover:text-gray-900 flex items-center active:scale-95 transition-[color,transform] duration-150"
            @click="sheetOpen = !sheetOpen">
            <IconChevronDown :class="sheetOpen ? 'rotate-180' : ''" />
          </button>
        </div>

        <div id="nav-sheet" :data-state="sheetOpen ? 'open' : 'closed'" :aria-hidden="!sheetOpen"
          class="group md:hidden absolute right-0 top-full mt-2 w-48 flex flex-col bg-white/70 backdrop-blur-xl rounded-3xl p-1 border border-white/40 shadow-md shadow-black/5 ring-1 ring-black/[0.02] z-[100] origin-top-right transition-[opacity,transform] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          :class="sheetOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'">
          <a v-for="item in navItems" :key="item.href" :href="item.href"
            :aria-current="isActive(item.href) ? 'page' : undefined" :class="mobileLinkClass(isActive(item.href))">
            {{ item.label }}
          </a>
        </div>
      </div>

      <div v-if="showSocial" class="shrink-0 hidden md:block">
        <div class="flex flex-col items-center gap-4">
          <div class="flex justify-center gap-4 opacity-75">
            <a v-for="social in socialLinks" :key="social.name" :href="social.href" target="_blank"
              class="no-underline">
              <span class="sr-only">{{ social.name }}</span>
              <component :is="social.icon" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
