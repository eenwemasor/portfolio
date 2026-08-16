import MarkdownIt from 'markdown-it'

export const markdown = new MarkdownIt({ html: false, linkify: true, typographer: true })

/**
 * Minimal, dependency-free frontmatter parser. Deliberately avoids
 * gray-matter, which pulls in Node's Buffer — a global unavailable in the
 * browser, so it crashed during client-side hydration. Our frontmatter is
 * always flat `key: "value"` / `key: [...]` pairs, so a small regex parser
 * is enough and stays isomorphic (server + client) without polyfills.
 */
export function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const frontmatter = match[1] ?? ''
  const content = match[2] ?? ''
  const data: Record<string, unknown> = {}
  for (const line of frontmatter.split(/\r?\n/)) {
    const lineMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/)
    if (!lineMatch) continue
    const key = lineMatch[1]
    const rawValue = lineMatch[2] ?? ''
    if (!key) continue
    const value = rawValue.trim()
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = JSON.parse(value)
    } else if (value.startsWith('"') && value.endsWith('"')) {
      data[key] = value.slice(1, -1)
    } else {
      data[key] = value
    }
  }
  return { data, content: content.trim() }
}
