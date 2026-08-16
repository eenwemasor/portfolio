<script setup lang="ts">
import { computed, ref } from 'vue'
import { getAllProjects, getStageOptions } from '../../composables/useProjects'

const { data: projects } = await useAsyncData('projects', () => Promise.resolve(getAllProjects()))
const { data: stages } = await useAsyncData('project-stages', () => Promise.resolve(getStageOptions()))

const search = ref('')
const stage = ref<string | null>(null)

const filteredProjects = computed(() => {
  const query = search.value.trim().toLowerCase()
  return (projects.value ?? []).filter((project) => {
    const matchesSearch = !query
      || project.title.toLowerCase().includes(query)
      || project.summary.toLowerCase().includes(query)
    const matchesStage = !stage.value || project.stage === stage.value
    return matchesSearch && matchesStage
  })
})

useSeoMeta({
  title: 'Projects',
  description: 'Independent products I\'ve built and operated end to end: infrastructure platforms, a component library, an event-driven notification system, and more.'
})
</script>

<template>
  <div class="relative overflow-hidden">
    <GradientBackground variant="strip" />
    <div class="relative z-20">
      <AppHeader active-href="/projects" logo-src="/images/enwemasorbarnabas.jpeg" logo-alt="Enwemasor Barnabas" />
    </div>
    <div class="relative z-10">
      <PageHero>Projects</PageHero>
      <main class="max-w-7xl mx-auto px-4 pb-16">
        <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <div class="lg:sticky lg:top-8 lg:self-start">
            <ProjectsSidebar
              v-model:search="search"
              v-model:stage="stage"
              :stages="stages ?? []"
            />
          </div>

          <div>
            <p v-if="filteredProjects.length === 0" class="text-sm text-gray-400 font-mono">
              No projects match your filters.
            </p>
            <div v-else class="columns-1 md:columns-2 gap-4">
              <ProjectCard
                v-for="project in filteredProjects"
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
        </div>
      </main>
      <AppFooter />
    </div>
  </div>
</template>
