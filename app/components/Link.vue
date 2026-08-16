<script setup lang="ts">
/**
 * Text-link variants sourced from patterns already in the mirror:
 * `default` matches the prose/excerpt link rule
 * `[&_a]:text-lavender-600 [&_a:hover]:underline`, `muted` matches the
 * post-detail author/back links, and `primer` surfaces the extracted
 * --color-gh-primer-link token (defined in the source palette, GitHub's
 * own link blue) for contexts that want it.
 */
export type LinkVariant = 'default' | 'muted' | 'primer'

withDefaults(defineProps<{
  href: string
  variant?: LinkVariant
  underline?: boolean
}>(), {
  variant: 'default',
  underline: false
})

const variantClasses: Record<LinkVariant, string> = {
  default: 'text-lavender-600 hover:underline',
  muted: 'text-gray-600 hover:underline hover:text-gray-900 decoration-gray-900/25 transition-all duration-150',
  primer: 'text-gh-primer-link hover:underline'
}
</script>

<template>
  <a :href="href" class="inline-flex items-center gap-2" :class="[variantClasses[variant], underline ? 'underline' : 'no-underline']">
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </a>
</template>
