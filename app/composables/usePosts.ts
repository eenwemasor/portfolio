import type { BadgeType } from '../components/Badge.vue'
import { markdown, parseFrontmatter } from '../utils/markdown'

export interface PostFrontmatter {
  title: string
  excerpt?: string
  date: string
  dateLabel: string
  type: BadgeType
  category: string
  image?: string
  imageAlt?: string
  authorName: string
  authorUrl: string
  authorAvatarUrl?: string
  tags?: string[]
}

export interface Post extends PostFrontmatter {
  slug: string
  html: string
}

const rawModules = import.meta.glob('../../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

function slugFromPath(path: string): string {
  return path.match(/([^/]+)\.md$/)?.[1] ?? path
}

let cachedPosts: Post[] | null = null

export function getAllPosts(): Post[] {
  if (cachedPosts) return cachedPosts
  const posts = Object.entries(rawModules).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      ...(data as unknown as PostFrontmatter),
      html: markdown.render(content)
    }
  })
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  cachedPosts = posts
  return posts
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug)
}

export interface CategoryCount {
  label: string
  count: number
}

export function getCategoryOptions(): CategoryCount[] {
  const counts = new Map<string, number>()
  for (const post of getAllPosts()) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags ?? []) tags.add(tag)
  }
  return Array.from(tags).sort()
}
