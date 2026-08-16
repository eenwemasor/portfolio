<script setup lang="ts">
/**
 * Homepage teaser section: heading + EntryIndexList + a CTA linking to
 * the full listing page. Shared by the Posts and Projects sections on
 * the homepage so both present identically, per standing instruction.
 */
import EntryIndexList, { type IndexEntry } from './EntryIndexList.vue'
import Button from './Button.vue'

defineProps<{
  heading: string
  entries: IndexEntry[]
  viewAllHref: string
  viewAllLabel: string
}>()
</script>

<template>
  <section class="max-w-4xl mx-auto px-4 py-12 border-gloss-gray-800">
    <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8">{{ heading }}</h2>
    <EntryIndexList :entries="entries" />
    <div class="mt-8 pl-5 sm:pl-8">
      <Button variant="secondary" :href="viewAllHref">{{ viewAllLabel }}</Button>
    </div>
  </section>
</template>
