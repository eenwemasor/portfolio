<script setup lang="ts">
/**
 * Numbered index-list row group (tag pills + large title + index number,
 * spine rule down the left edge). No precedent for this layout exists in
 * the githubnext.com mirrors (verified) — the user supplied an external
 * reference screenshot for structural inspiration only (list shape, pill
 * placement, index numbering), per standing instruction that such
 * references govern layout, never color/type. Built entirely from tokens
 * already in tokens.css: gloss-gray borders, font-mono index numbers,
 * the same pill vocabulary as TagPill/Badge.
 */
export interface IndexEntry {
  href: string
  title: string
  tags: string[]
  index: string
}

defineProps<{
  entries: IndexEntry[]
}>()
</script>

<template>
  <ol class="flex flex-col border-l border-gloss-gray-800 pl-5 sm:pl-8">
    <li v-for="entry in entries" :key="entry.href" class="border-b border-gloss-gray-800 last:border-b-0 py-5 first:pt-0 last:pb-0">
      <a :href="entry.href" class="group flex flex-wrap items-baseline gap-x-3 gap-y-2 no-underline">
        <span
          v-for="tag in entry.tags"
          :key="tag"
          class="inline-flex items-center rounded-full border border-gloss-gray-700 bg-gloss-gray-900 px-3 py-1 text-xs font-mono uppercase tracking-wide text-gray-400 shrink-0"
        >{{ tag }}</span>
        <span class="flex items-baseline gap-2 min-w-0">
          <span class="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight break-words group-hover:text-gray-300 transition-colors">{{ entry.title }}</span>
          <span class="text-xs font-mono text-gray-500 shrink-0">{{ entry.index }}</span>
        </span>
      </a>
    </li>
  </ol>
</template>
