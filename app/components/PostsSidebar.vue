<script setup lang="ts">
import SearchInput from './SearchInput.vue'
import CategoryFilter, { type CategoryOption } from './CategoryFilter.vue'
import TagFilter from './TagFilter.vue'

defineProps<{
  search: string
  category: string | null
  tags: string[]
  categories: CategoryOption[]
  allTags: string[]
}>()

defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:category', value: string | null): void
  (e: 'update:tags', value: string[]): void
}>()
</script>

<template>
  <aside class="bg-white border border-sand-100 rounded-xl shadow-sm overflow-hidden">
    <div class="p-5">
      <h2 class="text-sm font-semibold text-gh-text mb-3">Search</h2>
      <SearchInput :model-value="search" @update:model-value="$emit('update:search', $event)" />
    </div>
    <div class="p-5 border-t border-gray-200">
      <h2 class="text-sm font-semibold text-gh-text mb-3">Categories</h2>
      <CategoryFilter :categories="categories" :model-value="category" @update:model-value="$emit('update:category', $event)" />
    </div>
    <div class="p-5 border-t border-gray-200">
      <h2 class="text-sm font-semibold text-gh-text mb-3">Tags</h2>
      <TagFilter :tags="allTags" :model-value="tags" @update:model-value="$emit('update:tags', $event)" />
    </div>
  </aside>
</template>
