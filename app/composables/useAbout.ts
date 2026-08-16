import { markdown, parseFrontmatter } from '../utils/markdown'

export interface AboutFrontmatter {
  title: string
  tagline: string
}

export interface About extends AboutFrontmatter {
  html: string
}

const rawModules = import.meta.glob('../../content/about.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

let cachedAbout: About | null = null

export function getAbout(): About {
  if (cachedAbout) return cachedAbout
  const raw = Object.values(rawModules)[0] ?? ''
  const { data, content } = parseFrontmatter(raw)
  cachedAbout = {
    ...(data as unknown as AboutFrontmatter),
    html: markdown.render(content)
  }
  return cachedAbout
}
