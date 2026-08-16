<script setup lang="ts">
/**
 * Infinite-scroll loader. No direct precedent in the mirror (the posts
 * index renders every post in one page), so this is built purely from
 * already-extracted tokens: the meta-text style used for card dates
 * (font-mono text-xs, originally text-black/50, inverted to text-white/50
 * for the dark theme), the footer's uppercase copyright text style for
 * the end-of-list message, and the new Button component for the
 * accessible manual-trigger fallback.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Button from './Button.vue'

const props = withDefaults(defineProps<{
  loading?: boolean
  hasMore?: boolean
  error?: string
}>(), {
  loading: false,
  hasMore: true,
  error: undefined
})

const emit = defineEmits<{ (e: 'load-more'): void }>()

const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | undefined

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting && props.hasMore && !props.loading && !props.error) {
      emit('load-more')
    }
  }, { rootMargin: '200px' })
  if (sentinel.value) observer.observe(sentinel.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="flex flex-col items-center gap-3 py-10">
    <div ref="sentinel" class="h-px w-full" aria-hidden="true" />

    <template v-if="error">
      <p class="font-mono text-xs text-white/60">{{ error }}</p>
      <Button variant="secondary" size="sm" @click="emit('load-more')">Try again</Button>
    </template>

    <template v-else-if="loading">
      <span class="inline-block w-5 h-5 rounded-full border-2 border-gn-copper border-t-transparent animate-spin" role="status" aria-label="Loading more posts" />
      <span class="font-mono text-xs text-white/50">Loading more posts…</span>
    </template>

    <template v-else-if="hasMore">
      <Button variant="secondary" size="sm" @click="emit('load-more')">Load more</Button>
    </template>

    <template v-else>
      <span class="text-xxs uppercase tracking-wide text-gray-400">You’re all caught up</span>
    </template>
  </div>
</template>
