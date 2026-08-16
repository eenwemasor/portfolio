<script setup lang="ts">
import { ref } from 'vue'

export interface MediaItem {
  type: 'image' | 'video'
  src: string
  alt?: string
}

const props = defineProps<{
  items: MediaItem[]
}>()

const active = ref(0)

function go(index: number) {
  const count = props.items.length
  active.value = (index + count) % count
}
</script>

<template>
  <div data-media-stack class="relative">
    <div class="relative aspect-[16/10] rounded-md overflow-hidden bg-sand-100 border border-sand-200 shadow-sm">
      <div
        v-for="(item, index) in items"
        :key="item.src"
        data-media-slide
        class="absolute inset-0 transition-opacity duration-200"
        :style="{ opacity: index === active ? '1' : '0', pointerEvents: index === active ? 'auto' : 'none' }"
      >
        <video v-if="item.type === 'video'" :src="item.src" class="w-full h-full object-cover" autoplay muted loop playsinline preload="metadata" :aria-label="item.alt" />
        <img v-else :src="item.src" :alt="item.alt" class="w-full h-full object-cover">
      </div>

      <template v-if="items.length > 1">
        <button
          type="button"
          data-media-prev
          aria-label="Previous"
          class="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-white/80 text-gh-text shadow-sm hover:bg-white transition-colors"
          @click="go(active - 1)"
        >
          ‹
        </button>
        <button
          type="button"
          data-media-next
          aria-label="Next"
          class="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-white/80 text-gh-text shadow-sm hover:bg-white transition-colors"
          @click="go(active + 1)"
        >
          ›
        </button>
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          <button
            v-for="(item, index) in items"
            :key="item.src"
            type="button"
            data-media-dot
            :aria-label="`Go to slide ${index + 1}`"
            class="w-1.5 h-1.5 rounded-full transition-colors"
            :class="index === active ? 'bg-black/70' : 'bg-black/30'"
            @click="go(index)"
          />
        </div>
      </template>
    </div>
  </div>
</template>
