<script setup lang="ts">
import { ref } from 'vue'

export interface AvatarStackAuthor {
  name: string
  avatarUrl?: string
}

function initial(name: string) {
  return name.trim().charAt(0).toUpperCase()
}

defineProps<{
  authors: AvatarStackAuthor[]
}>()

const handleName = ref('')
const handleOpacity = ref('0')

function onEnter(name: string, index: number, items: HTMLElement[]) {
  items.forEach((el, i) => {
    if (i < index) el.style.transform = 'translateX(-6px)'
    else if (i > index) el.style.transform = 'translateX(6px)'
  })
  handleName.value = name
  handleOpacity.value = '1'
}

function onLeave(items: HTMLElement[]) {
  items.forEach((el) => { el.style.transform = '' })
  handleOpacity.value = '0'
}

const itemRefs = ref<HTMLElement[]>([])

function setItemRef(el: unknown, index: number) {
  if (el) itemRefs.value[index] = el as HTMLElement
}
</script>

<template>
  <div class="flex items-center gap-2 avatar-stack-interactive flex-row-reverse">
    <div class="flex items-center">
      <span
        v-for="(author, index) in authors"
        :key="author.name"
        :ref="(el) => setItemRef(el, index)"
        :title="author.name"
        class="inline-flex items-center gap-0.5 [&_img]:border-2 [&_img]:border-white [&_img]:rounded-full [&_img]:w-7 [&_img]:h-7 avatar-item transition-transform duration-200 ease-out"
        :class="index > 0 ? '-ml-4' : ''"
        @mouseenter="onEnter(author.name, index, itemRefs)"
        @mouseleave="onLeave(itemRefs)"
      >
        <img v-if="author.avatarUrl" :src="author.avatarUrl" :alt="author.name" width="24" height="24" loading="lazy" class="rounded-full shrink-0 border-2 border-bg-base mr-1.5">
        <span v-else class="flex items-center justify-center rounded-full shrink-0 border-2 border-bg-base mr-1.5 w-7 h-7 bg-lavender-100 text-lavender-700 text-xs font-medium">{{ initial(author.name) }}</span>
      </span>
    </div>
    <span class="avatar-handle text-xs text-gh-text-light whitespace-nowrap transition-opacity duration-150" :style="{ opacity: handleOpacity }">{{ handleName }}</span>
  </div>
</template>
