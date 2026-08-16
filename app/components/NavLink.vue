<script setup lang="ts">
withDefaults(defineProps<{
  href: string
  active?: boolean
  mobileOnly?: boolean
}>(), {
  active: false,
  mobileOnly: false
})
</script>

<template>
  <a
    :href="href"
    :aria-current="active ? 'page' : undefined"
    class="relative z-10 rounded-full text-sm font-medium transition-colors duration-200 items-center md:flex px-4 py-3 max-md:pr-0 md:py-2"
    :class="[
      mobileOnly ? 'gap-3 md:gap-0 md:p-2.5 md:justify-center hidden' : '',
      active ? 'flex text-white' : 'hidden text-gray-400 hover:text-white hover:bg-white/10'
    ]"
  >
    <slot />
  </a>
</template>
