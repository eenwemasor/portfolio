<script setup lang="ts">
import Badge, { type BadgeType } from './Badge.vue'
import IconChevronLeft from './icons/IconChevronLeft.vue'

withDefaults(defineProps<{
  backHref?: string
  type?: BadgeType
  title: string
  subtitle?: string
  authorName?: string
  authorUrl?: string
  authorAvatarUrl?: string
  date?: string
  dateLabel?: string
}>(), {
  backHref: undefined,
  type: undefined,
  subtitle: undefined,
  authorName: undefined,
  authorUrl: undefined,
  authorAvatarUrl: undefined,
  date: undefined,
  dateLabel: undefined
})
</script>

<template>
  <header class="not-prose mb-12 pb-8 border-b border-gray-300">
    <div v-if="backHref || type" class="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
      <a v-if="backHref" :href="backHref" class="inline-flex items-center gap-2 text-sm text-gray-500 no-underline hover:text-gray-700 transition-colors">
        <IconChevronLeft />
        Back to Posts
      </a>
      <Badge v-if="type" :type="type" />
    </div>
    <h1 class="m-0 mb-5 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900 break-words">{{ title }}</h1>
    <p v-if="subtitle" class="m-0 mb-4 text-lg md:text-xl text-gray-600 leading-relaxed break-words">{{ subtitle }}</p>
    <div v-if="authorName || dateLabel" class="flex items-center gap-x-3 gap-y-2 flex-wrap">
      <a v-if="authorName" :href="authorUrl" :title="authorName" class="inline-flex items-center gap-2 text-sm text-gray-700 no-underline hover:underline decoration-gray-50 hover:decoration-gray-900/25 hover:text-gray-900 transition-all duration-150">
        <img v-if="authorAvatarUrl" :src="authorAvatarUrl" :alt="authorName" width="32" height="32" loading="lazy" class="rounded-full shrink-0 border-2 border-white w-8 h-8">
        <span>{{ authorName }}</span>
      </a>
      <time v-if="dateLabel" :datetime="date" class="text-sm text-gray-500">{{ dateLabel }}</time>
    </div>
  </header>
</template>
