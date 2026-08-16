<script setup lang="ts">
/**
 * Exact match of the project card on githubnext.com/projects/: whole card
 * is one <a>, full-bleed absolutely-positioned background thumbnail (no
 * scrim), top row = date + stage badge, bottom-pinned (mt-auto) block =
 * title + line-clamp-4 description + overlapping avatar stack.
 */
import ProjectStageBadge, { type ProjectStage } from './ProjectStageBadge.vue'
import AvatarStack, { type AvatarStackAuthor } from './AvatarStack.vue'

withDefaults(defineProps<{
  href: string
  title: string
  summary: string
  date: string
  dateLabel: string
  stage: ProjectStage
  image?: string
  authors: AvatarStackAuthor[]
}>(), {
  image: undefined
})
</script>

<template>
  <a :href="href" class="block no-underline text-inherit">
    <div class="bg-white rounded-xl overflow-hidden border border-sand-100 shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-1">
      <div class="relative flex flex-col gap-4 px-5 pt-4 pb-5 min-h-[280px]">
        <img
          v-if="image"
          :src="image"
          alt=""
          loading="lazy"
          decoding="async"
          width="880"
          height="560"
          class="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
        >

        <div class="relative z-10 flex items-center gap-4 font-mono text-xs">
          <time :datetime="date" class="text-gray-500">{{ dateLabel }}</time>
          <ProjectStageBadge :stage="stage" variant="card" />
        </div>

        <div class="relative z-10 mt-auto flex flex-col gap-3">
          <h2 class="m-0 text-2xl font-semibold text-gray-900 leading-tight">{{ title }}</h2>
          <p class="m-0 text-sm text-black/70 leading-snug overflow-hidden line-clamp-4">{{ summary }}</p>
          <AvatarStack :authors="authors" />
        </div>
      </div>
    </div>
  </a>
</template>
