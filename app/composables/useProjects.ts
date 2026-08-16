import type { ProjectStage } from '../components/ProjectStageBadge.vue'
import { markdown, parseFrontmatter } from '../utils/markdown'

export interface ProjectFrontmatter {
  title: string
  summary: string
  whatFor: string
  date: string
  dateLabel: string
  stage: ProjectStage
  gradientColors: string[]
  image?: string
  authorName: string
  authorUrl: string
  authorAvatarUrl: string
}

export interface Project extends ProjectFrontmatter {
  slug: string
  html: string
}

const rawModules = import.meta.glob('../../content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

function slugFromPath(path: string): string {
  return path.match(/([^/]+)\.md$/)?.[1] ?? path
}

let cachedProjects: Project[] | null = null

export function getAllProjects(): Project[] {
  if (cachedProjects) return cachedProjects
  const projects = Object.entries(rawModules).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      ...(data as unknown as ProjectFrontmatter),
      html: markdown.render(content)
    }
  })
  projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  cachedProjects = projects
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug)
}
