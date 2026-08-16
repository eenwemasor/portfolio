<script setup lang="ts">
import { getCv } from '../composables/useCv'
import IconMail from '../components/icons/IconMail.vue'

const { data: cv } = await useAsyncData('cv', () => Promise.resolve(getCv()))

if (cv.value) {
  useSeoMeta({
    title: `${cv.value.name} — CV`,
    description: cv.value.role,
    ogTitle: `${cv.value.name} — CV`,
    ogDescription: cv.value.role
  })
}
</script>

<template>
  <div v-if="cv">
    <AppHeader active-href="/cv" logo-src="/images/enwemasorbarnabas.jpeg" logo-alt="Enwemasor Barnabas" />
    <main class="max-w-3xl mx-auto px-4 py-12">
      <ArticleProse>
        <PostDetailHeader back-href="/" :title="cv.name" :subtitle="cv.role" />
        <div class="not-prose flex flex-wrap items-center gap-x-6 gap-y-2 -mt-6 mb-10 font-mono text-xs text-gh-text-light">
          <Link :href="`mailto:${cv.email}`" variant="muted"><template #icon-left><IconMail class="w-4 h-4 fill-current" /></template>{{ cv.email }}</Link>
          <span>{{ cv.phone }}</span>
          <span>{{ cv.location }}</span>
          <Link :href="cv.website" variant="primer">{{ cv.website.replace('https://', '') }}</Link>
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="cv.html" />
      </ArticleProse>
    </main>
    <AppFooter />
  </div>
</template>
