<script setup lang="ts">
/**
 * Single-select category list. Active/inactive states reuse the exact
 * classes from AppHeader's mobile nav-sheet links (text-gray-900 bg-white
 * shadow-sm ring-1 ring-muted-purple/[0.03] vs text-gray-600 hover:...) —
 * the site's own established pattern for an active item in a vertical list.
 */
export interface CategoryOption {
  label: string
  count: number
}

defineProps<{
  categories: CategoryOption[]
  modelValue: string | null
}>()

defineEmits<{ (e: 'update:modelValue', value: string | null): void }>()

const itemClass = (active: boolean) => [
  'w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors',
  active
    ? 'text-gray-900 bg-white shadow-sm shadow-muted-purple/10 ring-1 ring-muted-purple/[0.03]'
    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
]
</script>

<template>
  <ul class="flex flex-col gap-1">
    <li>
      <button type="button" :class="itemClass(modelValue === null)" @click="$emit('update:modelValue', null)">
        <span>All</span>
      </button>
    </li>
    <li v-for="category in categories" :key="category.label">
      <button type="button" :class="itemClass(modelValue === category.label)" @click="$emit('update:modelValue', category.label)">
        <span>{{ category.label }}</span>
        <span class="font-mono text-xs text-gray-400">{{ category.count }}</span>
      </button>
    </li>
  </ul>
</template>
