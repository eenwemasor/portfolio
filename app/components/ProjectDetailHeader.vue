<script setup lang="ts">
/**
 * Exact match of the project detail hero on githubnext.com/projects/:
 * full-bleed gradient (rendered by the page via <GradientBackground
 * variant="hero">, alongside AppHeader, in the same overflow-hidden
 * wrapper — this component is just the title/subtitle/3-column info grid
 * that sits below them), H1 + subtitle, then a 3-column grid: (What's it
 * for? + Share) / (Stage badge + Published date) / (Who made it? —
 * full-row contributor list, distinct from the overlapping avatar stack
 * used on cards).
 */
import ProjectStageBadge, { type ProjectStage } from './ProjectStageBadge.vue'
import ProjectShareLinks from './ProjectShareLinks.vue'

export interface Contributor {
  name: string
  avatarUrl: string
  url: string
}

defineProps<{
  title: string
  subtitle: string
  whatFor: string
  stage: ProjectStage
  date: string
  dateLabel: string
  contributors: Contributor[]
  shareUrl: string
}>()
</script>

<template>
  <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 flex flex-col justify-center min-h-[calc(90vh-100px)]">
    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-gh0 font-extrabold tracking-tight text-gh-text mb-4 lg:mb-6 break-words">{{ title }}</h1>
    <p class="text-lg sm:text-xl md:text-2xl text-gh-text font-normal mb-12 lg:mb-16 max-w-3xl break-words">{{ subtitle }}</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
      <div>
        <h3 class="text-xs font-medium uppercase tracking-widest text-current opacity-75 mb-3">What's it for?</h3>
        <p class="text-base text-gh-text mb-6">{{ whatFor }}</p>
        <h3 class="text-xs font-medium uppercase tracking-widest text-current opacity-75 mb-3">Share</h3>
        <ProjectShareLinks :url="shareUrl" :title="title" />
      </div>

      <div>
        <h3 class="text-xs font-medium uppercase tracking-widest text-current opacity-75 mb-3">Stage</h3>
        <ProjectStageBadge :stage="stage" variant="hero" />
        <h3 class="text-xs font-medium uppercase tracking-widest text-current opacity-75 mb-3 mt-10">Published</h3>
        <time :datetime="date" class="text-base text-gh-text">{{ dateLabel }}</time>
      </div>

      <div>
        <h3 class="text-xs font-medium uppercase tracking-widest text-current opacity-75 mb-3">Who made it?</h3>
        <div class="flex flex-col gap-3">
          <a
            v-for="contributor in contributors"
            :key="contributor.name"
            :href="contributor.url"
            class="flex items-center gap-3 text-gh-text no-underline hover:text-gh-primer-link transition-colors group"
          >
            <img :src="contributor.avatarUrl" :alt="contributor.name" width="40" height="40" loading="lazy" class="rounded-full">
            <span class="text-base group-hover:underline">{{ contributor.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
