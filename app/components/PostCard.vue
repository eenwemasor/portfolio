<script setup lang="ts">
import Badge, { type BadgeType } from './Badge.vue'
import AvatarStack, { type AvatarStackAuthor } from './AvatarStack.vue'
import MediaStack, { type MediaItem } from './MediaStack.vue'

withDefaults(defineProps<{
  href: string
  type: BadgeType
  date: string
  dateLabel: string
  title: string
  excerpt?: string
  authors: AvatarStackAuthor[]
  heroImage?: string
  heroImageAlt?: string
  media?: MediaItem[]
  linkUrl?: string
}>(), {
  excerpt: undefined,
  heroImage: undefined,
  heroImageAlt: undefined,
  media: undefined,
  linkUrl: undefined
})
</script>

<template>
  <!-- Card variant with an optional hero image: the whole card is a link -->
  <a v-if="!media" :href="href" class="group block no-underline text-inherit cursor-pointer break-inside-avoid mb-4">
    <article>
      <div class="bg-white px-7 py-6 rounded-xl transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5 border border-sand-100 shadow-sm !p-0 overflow-hidden">
        <div v-if="heroImage" class="p-[7px]">
          <img :src="heroImage" :alt="heroImageAlt" loading="lazy" decoding="async" width="768" height="432" class="w-full h-[216px] object-cover rounded-md">
        </div>
        <div class="pl-[18px] pr-3 pb-5 flex flex-col gap-2.5" :class="heroImage ? 'pt-1' : 'pt-3'">
          <div class="flex items-center justify-between gap-3 font-mono text-xs" :class="heroImage ? '' : 'mb-3'">
            <div class="flex items-center gap-4 min-w-0">
              <Badge :type="type" />
              <time :datetime="date" class="text-black/50 whitespace-nowrap shrink-0">{{ dateLabel }}</time>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <AvatarStack :authors="authors" />
            </div>
          </div>
          <h2 class="m-0 text-xl font-medium text-black/80 leading-tight">{{ title }}</h2>
          <p v-if="excerpt" class="m-0 text-sm leading-[1.4] text-black/70 line-clamp-3">{{ excerpt }}</p>
        </div>
      </div>
    </article>
  </a>

  <!-- Card variant with inline media (video/carousel): only the title is a link -->
  <article v-else class="bg-white rounded-xl border border-sand-100 shadow-sm pl-5 pr-3 pt-3 pb-4 break-inside-avoid mb-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
    <header class="flex items-center justify-between mb-5 gap-3">
      <div class="flex items-center gap-2 min-w-0">
        <Badge :type="type" />
        <time :datetime="date" class="font-mono text-xs text-black/50 whitespace-nowrap">{{ dateLabel }}</time>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <AvatarStack :authors="authors" />
      </div>
    </header>
    <h2 class="m-0 mb-3 text-xl font-medium leading-tight">
      <a :href="href" class="no-underline text-black/80 hover:text-black hover:underline">{{ title }}</a>
    </h2>
    <p v-if="linkUrl" class="m-0 mb-3">
      <span class="inline-block max-w-full truncate rounded-md bg-post-link/10 px-2 py-0.5 font-mono text-[13px] text-post-link align-bottom">{{ linkUrl }}</span>
    </p>
    <div class="relative mb-3">
      <MediaStack :items="media" />
    </div>
    <div v-if="excerpt" class="text-[14px] leading-[1.4] text-black/70 [&>p]:m-0 [&>p:not(:last-child)]:mb-2 [&_a]:text-lavender-600 [&_a:hover]:underline">
      <p>{{ excerpt }}</p>
    </div>
  </article>
</template>
