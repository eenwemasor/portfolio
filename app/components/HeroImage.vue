<script setup lang="ts">
defineProps<{
  src: string
  alt: string
}>()
</script>

<template>
  <div class="mb-8">
    <img :src="src" :alt="alt" loading="lazy" decoding="async" width="720" height="360" class="rounded-xl w-full h-auto">
  </div>
</template>
