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
    <main class="max-w-7xl mx-auto px-4 pb-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectCard
          v-for="project in projects"
          :key="project.slug"
          :title="project.title"
          :summary="project.summary"
          :date-label="project.dateLabel"
          :tech-stack="project.techStack"
        />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
