<script setup lang="ts">
import { getAllProjects } from '../../composables/useProjects'

const { data: projects } = await useAsyncData('projects', () => Promise.resolve(getAllProjects()))

useSeoMeta({
  title: 'Projects',
  description: 'Independent products I\'ve built and operated end to end: infrastructure platforms, a component library, an event-driven notification system, and more.'
})
</script>

<template>
  <div>
    <AppHeader active-href="/projects" logo-src="/images/enwemasorbarnabas.jpeg" logo-alt="Enwemasor Barnabas" />
    <PageHero>Projects</PageHero>
    <main class="relative z-10">
      <div class="max-w-7xl mx-auto px-4 pb-16">
        <div class="columns-1 md:columns-2 xl:columns-3 gap-4">
          <ProjectCard
            v-for="project in projects"
            :key="project.slug"
            :href="`/projects/${project.slug}`"
            :title="project.title"
            :summary="project.summary"
            :date="project.date"
            :date-label="project.dateLabel"
            :stage="project.stage"
            :image="project.image"
            :authors="[{ name: project.authorName, avatarUrl: project.authorAvatarUrl }]"
            class="block mb-4 break-inside-avoid w-full"
          />
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
