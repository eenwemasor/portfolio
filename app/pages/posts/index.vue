<script setup lang="ts">
import { computed, ref } from 'vue'
import { getAllPosts, getAllTags, getCategoryOptions } from '../../composables/usePosts'

const { data: posts } = await useAsyncData('all-posts', () => Promise.resolve(getAllPosts()))
const { data: categories } = await useAsyncData('post-categories', () => Promise.resolve(getCategoryOptions()))
const { data: allTags } = await useAsyncData('post-tags', () => Promise.resolve(getAllTags()))

const search = ref('')
const category = ref<string | null>(null)
const selectedTags = ref<string[]>([])

const filteredPosts = computed(() => {
  const query = search.value.trim().toLowerCase()
  return (posts.value ?? []).filter((post) => {
    const matchesSearch = !query
      || post.title.toLowerCase().includes(query)
      || (post.excerpt ?? '').toLowerCase().includes(query)
    const matchesCategory = !category.value || post.category === category.value
    const matchesTags = selectedTags.value.every((tag) => (post.tags ?? []).includes(tag))
    return matchesSearch && matchesCategory && matchesTags
  })
})

useSeoMeta({
  title: 'Posts',
  description: 'Posts on Kubernetes, Laravel, versioning conventions, and software engineering practice.'
})
</script>

<template>
  <div class="relative overflow-hidden">
    <GradientBackground variant="strip" />
    <div class="relative z-20">
      <AppHeader active-href="/posts" logo-src="/images/enwemasorbarnabas.jpeg" logo-alt="Enwemasor Barnabas" />
    </div>
    <div class="relative z-10">
      <PageHero>Posts</PageHero>
      <main class="max-w-7xl mx-auto px-4 pb-16">
        <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <div class="lg:sticky lg:top-8 lg:self-start">
            <PostsSidebar
              v-model:search="search"
              v-model:category="category"
              v-model:tags="selectedTags"
              :categories="categories ?? []"
              :all-tags="allTags ?? []"
            />
          </div>

          <div>
            <p v-if="filteredPosts.length === 0" class="text-sm text-gray-400 font-mono">
              No posts match your filters.
            </p>
            <div v-else class="columns-1 md:columns-2 gap-4">
              <PostCard
                v-for="post in filteredPosts"
                :key="post.slug"
                :href="`/posts/${post.slug}`"
                :type="post.type"
                :date="post.date"
                :date-label="post.dateLabel"
                :title="post.title"
                :excerpt="post.excerpt"
                :authors="[{ name: post.authorName, avatarUrl: post.authorAvatarUrl }]"
                :hero-image="post.image"
                :hero-image-alt="post.imageAlt"
              />
            </div>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  </div>
</template>
