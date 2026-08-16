<script setup lang="ts">
/**
 * No search/form precedent exists anywhere in the mirror (verified), so
 * this field is built from the site's own tokens rather than any literal
 * source markup: sand-100 border, rounded-lg radius, lavender-300 focus
 * ring, font-sans text-sm — the same vocabulary used everywhere else.
 */
import IconSearch from './icons/IconSearch.vue'
import IconClose from './icons/IconClose.vue'

const model = defineModel<string>({ default: '' })

withDefaults(defineProps<{
  placeholder?: string
}>(), {
  placeholder: 'Search posts…'
})
</script>

<template>
  <div class="relative">
    <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      <IconSearch />
    </span>
    <input
      v-model="model"
      type="search"
      :placeholder="placeholder"
      class="w-full rounded-lg border border-sand-200 bg-white py-2 pl-9 text-sm text-gh-text placeholder:text-gray-400 shadow-sm transition-colors focus:border-lavender-400 focus:outline-none focus:ring-2 focus:ring-lavender-300"
      :class="model ? 'pr-9' : 'pr-3'"
    >
    <button
      v-if="model"
      type="button"
      aria-label="Clear search"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
      @click="model = ''"
    >
      <IconClose />
    </button>
  </div>
</template>
