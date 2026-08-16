// Generates public/rss.xml from content/posts/*.md.
// Deliberately dependency-free (no Nuxt/Vite/Nitro APIs) so it runs the
// same way in dev, build, and CI without depending on any bundler's
// support for import.meta.glob inside server routes.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const postsDir = path.join(rootDir, 'content', 'posts')
const outFile = path.join(rootDir, 'public', 'rss.xml')

const SITE_URL = 'https://enwemasorbarnabas.com'
const SITE_TITLE = 'Enwemasor Barnabas'
const SITE_DESCRIPTION = 'Full-stack engineer who takes products from idea to production and keeps them running.'

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const frontmatter = match[1] ?? ''
  const content = match[2] ?? ''
  const data = {}
  for (const line of frontmatter.split(/\r?\n/)) {
    const lineMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/)
    if (!lineMatch) continue
    const key = lineMatch[1]
    const rawValue = lineMatch[2] ?? ''
    if (!key) continue
    const value = rawValue.trim()
    if (value.startsWith('[') && value.endsWith(']')) data[key] = JSON.parse(value)
    else if (value.startsWith('"') && value.endsWith('"')) data[key] = value.slice(1, -1)
    else data[key] = value
  }
  return { data, content: content.trim() }
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const files = readdirSync(postsDir).filter((file) => file.endsWith('.md'))

const posts = files.map((file) => {
  const raw = readFileSync(path.join(postsDir, file), 'utf-8')
  const { data } = parseFrontmatter(raw)
  return {
    slug: file.replace(/\.md$/, ''),
    title: data.title,
    excerpt: data.excerpt ?? '',
    date: data.date
  }
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const items = posts.map((post) => {
  const url = `${SITE_URL}/posts/${post.slug}`
  const pubDate = new Date(post.date).toUTCString()
  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`
}).join('\n')

const buildDate = new Date().toUTCString()

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

writeFileSync(outFile, xml, 'utf-8')
console.log(`Wrote ${outFile} with ${posts.length} posts`)
