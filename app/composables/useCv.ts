import { markdown, parseFrontmatter } from '../utils/markdown'

export interface CvFrontmatter {
  name: string
  role: string
  email: string
  phone: string
  location: string
  website: string
}

export interface Cv extends CvFrontmatter {
  html: string
}

const rawModules = import.meta.glob('../../content/cv.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

let cachedCv: Cv | null = null

export function getCv(): Cv {
  if (cachedCv) return cachedCv
  const raw = Object.values(rawModules)[0] ?? ''
  const { data, content } = parseFrontmatter(raw)
  cachedCv = {
    ...(data as unknown as CvFrontmatter),
    html: markdown.render(content)
  }
  return cachedCv
}
