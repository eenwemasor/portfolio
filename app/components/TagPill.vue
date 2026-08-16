<script setup lang="ts">
/**
 * Tag/category chip. Styling is the site's own "Related:" footer-link
 * pattern (found on post-detail pages: rounded-md, lavender-500/10 fill,
 * font-mono text-[13px], text-lavender-600, hover -> lavender-500/30),
 * reused here as a toggleable filter pill via an `active` state.
 */
withDefaults(defineProps<{
  active?: boolean
}>(), {
  active: false
})

defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <button
    type="button"
    class="inline-block rounded-md px-2 py-0.5 font-mono text-[13px] no-underline transition-colors"
    :class="active
      ? 'bg-lavender-600 text-white'
      : 'bg-lavender-500/10 text-lavender-600 hover:bg-lavender-500/30 hover:text-lavender-700'"
    :aria-pressed="active"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
