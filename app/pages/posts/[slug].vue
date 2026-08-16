<script setup lang="ts">
import { getPostBySlug } from '../../composables/usePosts'

const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`post-${slug}`, () => Promise.resolve(getPostBySlug(slug) ?? null))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.excerpt,
  ogTitle: post.value.title,
  ogDescription: post.value.excerpt,
  ogImage: post.value.image
})
</script>

<template>
  <div v-if="post">
    <AppHeader active-href="/" logo-src="/images/enwemasorbarnabas.jpeg" logo-alt="Enwemasor Barnabas" />
    <main class="max-w-3xl mx-auto px-4 py-12">
      <ArticleProse>
        <PostDetailHeader
          back-href="/"
          :type="post.type"
          :title="post.title"
          :subtitle="post.excerpt"
          :author-name="post.authorName"
          :author-url="post.authorUrl"
          :author-avatar-url="post.authorAvatarUrl"
          :date="post.date"
          :date-label="post.dateLabel"
        />
        <HeroImage v-if="post.image" :src="post.image" :alt="post.imageAlt ?? post.title" />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="post.html" />
      </ArticleProse>
    </main>
    <AppFooter />
  </div>
</template>
