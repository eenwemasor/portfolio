<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import gsap from 'gsap'
import { getAllPosts } from '../composables/usePosts'
import IconGitHub from '../components/icons/IconGitHub.vue'
import IconLinkedIn from '../components/icons/IconLinkedIn.vue'
import IconX from '../components/icons/IconX.vue'
import IconMail from '../components/icons/IconMail.vue'
import IconGlobe from '../components/icons/IconGlobe.vue'

const { data: posts } = await useAsyncData('posts', () => Promise.resolve(getAllPosts()))

useSeoMeta({
  title: 'Enwemasor Barnabas — Full-Stack Engineer, DevOps',
  description: 'Full-stack engineer who takes products from idea to production and keeps them running — front end, API, infrastructure and CI/CD.',
  ogTitle: 'Enwemasor Barnabas — Full-Stack Engineer, DevOps',
  ogDescription: 'Full-stack engineer who takes products from idea to production and keeps them running — front end, API, infrastructure and CI/CD.'
})

const heroRef = useTemplateRef<HTMLElement>('hero')

onMounted(() => {
  if (!heroRef.value) return
  const targets = heroRef.value.querySelectorAll('[data-animate]')
  gsap.from(targets, {
    opacity: 0,
    y: 24,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.12
  })
})
</script>

<template>
  <div class="relative overflow-hidden">
    <GradientBackground />
    <div class="relative z-20">
      <AppHeader active-href="/" logo-src="/images/enwemasorbarnabas.jpeg" logo-alt="Enwemasor Barnabas" />
    </div>
    <div ref="hero" class="relative z-10 max-w-4xl mx-auto px-4 pt-16 pb-8">
      <div data-animate>
        <PostDetailHeader
          title="Enwemasor Barnabas"
          subtitle="Full-stack engineer who takes products from idea to production and keeps them running — front end, API, infrastructure and CI/CD — with 8+ years of experience building and operating products independently."
          author-name="Full-Stack Engineer — DevOps"
          author-url="https://github.com/eenwemasor"
        />
      </div>
      <div data-animate class="flex items-center gap-4 -mt-8 opacity-75">
        <Link href="mailto:enwemasorbarnabas@gmail.com" variant="muted"><span class="sr-only">Email</span><template #icon-left><IconMail class="w-5 h-5 fill-current" /></template></Link>
        <Link href="https://github.com/eenwemasor" variant="muted"><span class="sr-only">GitHub</span><template #icon-left><IconGitHub class="w-5 h-5 fill-current" /></template></Link>
        <Link href="https://www.linkedin.com/in/eenwemasor/" variant="muted"><span class="sr-only">LinkedIn</span><template #icon-left><IconLinkedIn class="w-5 h-5 fill-current" /></template></Link>
        <Link href="https://x.com/EEnwemasor" variant="muted"><span class="sr-only">X</span><template #icon-left><IconX class="w-5 h-5 fill-current" /></template></Link>
        <Link href="https://enwemasorbarnabas.com/" variant="muted"><span class="sr-only">Website</span><template #icon-left><IconGlobe class="w-5 h-5 fill-current" /></template></Link>
      </div>
    </div>

    <main class="relative z-10">
      <PageHero>Posts</PageHero>
      <PostsGrid>
        <PostCard
          v-for="post in posts"
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
      </PostsGrid>
      <InfinitePagination :has-more="false" />
      <AppFooter />
    </main>
  </div>
</template>
