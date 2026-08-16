<script setup lang="ts">
/**
 * Project card. Reuses PostCard's exact container styling (bg-white,
 * border-sand-100, rounded-xl, shadow-sm, hover lift) and TagPill for the
 * tech-stack chips, in place of PostCard's type-badge/avatar-stack pattern
 * which doesn't apply to a project.
 */
import TagPill from './TagPill.vue'

defineProps<{
  title: string
  summary: string
  dateLabel: string
  techStack: string[]
}>()
</script>

<template>
  <article class="bg-white px-7 py-6 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border border-sand-100 shadow-sm">
    <div class="flex items-center justify-between gap-3 mb-3">
      <h2 class="m-0 text-xl font-medium text-black/80 leading-tight">{{ title }}</h2>
      <time class="font-mono text-xs text-black/50 whitespace-nowrap shrink-0">{{ dateLabel }}</time>
    </div>
    <p class="m-0 mb-4 text-sm leading-[1.4] text-black/70">{{ summary }}</p>
    <div class="flex flex-wrap gap-2">
      <TagPill v-for="tech in techStack" :key="tech">{{ tech }}</TagPill>
    </div>
  </article>
</template>
