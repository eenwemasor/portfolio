<script setup lang="ts">
/**
 * Project "stage" badge — exact match of githubnext.com/projects/. Two
 * markup variants found in the source: `card` (rounded-[4px], font-medium,
 * bg-{c}-100/text-{c}-700, used on listing cards) and `hero` (rounded-md,
 * uppercase tracking-widest font-semibold, bg-{c}-100/80 text-{c}-600,
 * border-white/20, used on the project detail hero). Color-family mapping
 * verified against all 35 real projects in the mirror:
 *   green  = Research Prototype, Napkin Sketch
 *   blue   = Completed, Product, Open Sourced
 *   pink   = WIP
 *   purple = Prototype
 */
export type ProjectStage = 'Research Prototype' | 'Napkin Sketch' | 'WIP' | 'Prototype' | 'Completed' | 'Product' | 'Open Sourced'

withDefaults(defineProps<{
  stage: ProjectStage
  variant?: 'card' | 'hero'
}>(), {
  variant: 'card'
})

const colorFamily: Record<ProjectStage, string> = {
  'Research Prototype': 'green',
  'Napkin Sketch': 'green',
  WIP: 'pink',
  Prototype: 'purple',
  Completed: 'blue',
  Product: 'blue',
  'Open Sourced': 'blue'
}

const cardClasses: Record<string, string> = {
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
  pink: 'bg-pink-100 text-pink-700',
  purple: 'bg-purple-100 text-purple-700'
}

const heroClasses: Record<string, string> = {
  green: 'bg-green-100/80 text-green-600',
  blue: 'bg-blue-100/80 text-blue-600',
  pink: 'bg-pink-100/80 text-pink-600',
  purple: 'bg-purple-100/80 text-purple-600'
}
</script>

<template>
  <span
    v-if="variant === 'card'"
    class="inline-block rounded-[4px] pt-[6px] pb-[6px] pl-[8px] pr-[6px] text-xs font-medium leading-none"
    :class="cardClasses[colorFamily[stage]]"
  >{{ stage }}</span>
  <span
    v-else
    class="inline-block px-3 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-md border border-white/20"
    :class="heroClasses[colorFamily[stage]]"
  >{{ stage }}</span>
</template>
