<script setup lang="ts">
/**
 * Same filter-sidebar pattern as PostsSidebar (search + a single-select
 * list, same card container). Projects have no category/tags fields, so
 * this reuses CategoryFilter directly against project stages instead of
 * building a near-duplicate StageFilter component.
 */
import SearchInput from './SearchInput.vue'
import CategoryFilter, { type CategoryOption } from './CategoryFilter.vue'

defineProps<{
  search: string
  stage: string | null
  stages: CategoryOption[]
}>()

defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:stage', value: string | null): void
}>()
</script>

<template>
  <aside class="bg-black border border-gloss-gray-800 rounded-xl shadow-sm overflow-hidden">
    <div class="p-5">
      <h2 class="text-sm font-semibold text-gh-text mb-3">Search</h2>
      <SearchInput :model-value="search" placeholder="Search projects…" @update:model-value="$emit('update:search', $event)" />
    </div>
    <div class="p-5 border-t border-gloss-gray-800">
      <h2 class="text-sm font-semibold text-gh-text mb-3">Stage</h2>
      <CategoryFilter :categories="stages" :model-value="stage" @update:model-value="$emit('update:stage', $event)" />
    </div>
  </aside>
</template>
