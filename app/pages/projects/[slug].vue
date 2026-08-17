<script setup lang="ts">
import { getProjectBySlug } from '../../composables/useProjects'

const route = useRoute()
const slug = route.params.slug as string

const { data: project } = await useAsyncData(`project-${slug}`, () => Promise.resolve(getProjectBySlug(slug) ?? null))

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title: project.value.title,
  description: project.value.summary,
  ogTitle: project.value.title,
  ogDescription: project.value.summary
})
</script>

<template>
  <div v-if="project">
    <div class="relative overflow-hidden min-h-[90vh]">
      <GradientBackground variant="hero" :colors="project.gradientColors" />
      <div class="relative z-20">
        <AppHeader active-href="/projects" logo-src="/images/enwemasorbarnabas.jpeg" logo-alt="Enwemasor Barnabas" />
      </div>
      <ProjectDetailHeader
        :title="project.title"
        :subtitle="project.summary"
        :what-for="project.whatFor"
        :stage="project.stage"
        :date="project.date"
        :date-label="project.dateLabel"
        :share-url="`https://enwemasorbarnabas.com/projects/${project.slug}`"
        :contributors="[{ name: project.authorName, avatarUrl: project.authorAvatarUrl, url: project.authorUrl }]"
      />
    </div>
    <main class="w-full py-12 lg:py-16">
      <ArticleProse>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="project.html" />
      </ArticleProse>
    </main>
    <AppFooter />
  </div>
</template>
