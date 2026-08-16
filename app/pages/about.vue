<script setup lang="ts">
import { getAbout } from '../composables/useAbout'

const { data: about } = await useAsyncData('about', () => Promise.resolve(getAbout()))

if (about.value) {
  useSeoMeta({
    title: about.value.title,
    description: about.value.tagline,
    ogTitle: about.value.title,
    ogDescription: about.value.tagline
  })
}
</script>

<template>
  <div v-if="about">
    <AppHeader active-href="/about" logo-src="/images/enwemasorbarnabas.jpeg" logo-alt="Enwemasor Barnabas" />
    <main class="max-w-3xl mx-auto px-4 py-12">
      <ArticleProse>
        <PostDetailHeader back-href="/" title="About" :subtitle="about.tagline" />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="about.html" />
      </ArticleProse>
      <div class="not-prose flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-gloss-gray-800">
        <Button variant="secondary" href="/posts">Read the posts</Button>
        <Button variant="secondary" href="/projects">See my projects</Button>
        <Button variant="primary" href="/cv">View my CV</Button>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
