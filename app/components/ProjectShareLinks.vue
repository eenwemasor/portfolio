<script setup lang="ts">
/**
 * Exact match of the "Share" row on githubnext.com project detail pages:
 * Facebook / Twitter / LinkedIn share-intent links, 20x20 currentColor
 * icons, text-gh-text -> hover:text-gh-primer-link. LinkedIn path is
 * inlined here rather than reusing icons/IconLinkedIn.vue, which hardcodes
 * its own hover color for the footer/header social row.
 */
import IconFacebook from './icons/IconFacebook.vue'
import IconTwitterBird from './icons/IconTwitterBird.vue'

const props = defineProps<{
  url: string
  title: string
}>()

const encodedUrl = encodeURIComponent(props.url)
const encodedTitle = encodeURIComponent(props.title)
</script>

<template>
  <div class="flex items-center gap-3">
    <a
      :href="`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`"
      target="_blank" rel="noopener noreferrer"
      class="text-gh-text hover:text-gh-primer-link transition-colors"
      aria-label="Share on Facebook"
    >
      <IconFacebook />
    </a>
    <a
      :href="`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`"
      target="_blank" rel="noopener noreferrer"
      class="text-gh-text hover:text-gh-primer-link transition-colors"
      aria-label="Share on Twitter"
    >
      <IconTwitterBird />
    </a>
    <a
      :href="`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`"
      target="_blank" rel="noopener noreferrer"
      class="text-gh-text hover:text-gh-primer-link transition-colors"
      aria-label="Share on LinkedIn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </a>
  </div>
</template>
