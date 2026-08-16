<script setup lang="ts">
import IconPost from './icons/IconPost.vue'
import IconLittleIdea from './icons/IconLittleIdea.vue'
import IconLink from './icons/IconLink.vue'

export type BadgeType = 'post' | 'idea' | 'link'

withDefaults(defineProps<{
  type: BadgeType
  label?: string
}>(), {
  label: undefined
})

const defaultLabel: Record<BadgeType, string> = {
  post: 'Post',
  idea: 'Little ideas',
  link: 'Link'
}
</script>

<template>
  <span v-if="type === 'post'" class="flex items-center gap-2 text-lavender-600 whitespace-nowrap font-mono text-xs">
    <IconPost />
    <span>{{ label ?? defaultLabel.post }}</span>
  </span>
  <span v-else-if="type === 'idea'" class="flex items-center gap-2 text-lavender-600 whitespace-nowrap font-mono text-xs">
    <IconLittleIdea />
    <span>{{ label ?? defaultLabel.idea }}</span>
  </span>
  <span v-else class="flex items-center gap-2 text-post-link whitespace-nowrap font-mono text-xs">
    <IconLink />
    <span>{{ label ?? defaultLabel.link }}</span>
  </span>
</template>
