<script setup lang="ts">
import TagPill from './TagPill.vue'

const props = defineProps<{
  tags: string[]
  modelValue: string[]
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: string[]): void }>()

function toggle(tag: string) {
  const next = props.modelValue.includes(tag)
    ? props.modelValue.filter((t) => t !== tag)
    : [...props.modelValue, tag]
  emit('update:modelValue', next)
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <TagPill v-for="tag in tags" :key="tag" :active="modelValue.includes(tag)" @click="toggle(tag)">
      {{ tag }}
    </TagPill>
  </div>
</template>
