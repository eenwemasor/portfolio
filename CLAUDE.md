# Enwemasor Barnabas — Portfolio Site

## What this is

A Nuxt 4 personal portfolio/blog site for Enwemasor Barnabas (full-stack engineer, DevOps), built two ways at once:

1. **A Storybook component library** whose entire visual design system — fonts, colors, spacing, radii, shadows, and exact component markup/classes — is extracted **verbatim** from HTTrack mirrors of `githubnext.com` (the GitHub Next site). Nothing is invented; every color, font, and class string traces back to real source markup.
2. **The actual site**, built by composing those components with the owner's real content: a converted WordPress blog, his résumé, project write-ups, an About page.

**Golden rule for all future work on this repo: do not invent new colors, fonts, spacing, or layout patterns.** If a UI need arises that has no precedent in the extracted mirrors, either (a) find real precedent elsewhere in the mirrors and reuse it, or (b) compose only from tokens/patterns already in `app/assets/css/tokens.css` and existing components — document the reasoning in a comment when you do. This has been the standing instruction for the whole session and the user checks for it.

## Source mirrors (reference only, not shipped)

Three HTTrack-crawled directories at the repo root, gitignored, **do not delete without asking the user first** (they asked once, got two mid-decision interruptions, and it's still unresolved — see Open Items):

- `github-next-post/` — mirror of `githubnext.com/posts/`. Source for: header/nav, footer, post cards, post detail template, gradient hero background, all base design tokens (`app/assets/css/tokens.css`), the 6 variable fonts in `public/fonts/`.
- `github-next-project/` — mirror of `githubnext.com/projects/`. Source for: project cards, project detail hero, stage badges, share-icon row. Analyzed in depth to replace an earlier invented project-card design (see "Notable fixes" below).
- `mattrothenberg/` — a mirror of a different site, captured by the user but **not used** for anything in this project. Leave alone.

When you need to check real source markup/CSS again, these directories are still on disk. Useful technique: raw HTML in these mirrors is minified onto ~1 giant line per file; pretty-print before reading:
```bash
tidy -q -indent -wrap 200 --force-output yes --custom-tags yes <file.html> > /tmp/pretty.html
```
The CSS bundle to grep for tokens/classes is `githubnext.com/_astro/Header.DrXMuXCl.css` (same file, byte-identical, in both `github-next-post` and `github-next-project`).

`content/content-1.md` through `content-4.md` at the repo root are the **original raw WordPress HTML exports** the blog posts were converted from — kept as source reference, superseded by the clean versions in `content/posts/*.md`. Not gitignored currently; consider whether to remove once you're sure they're not needed.

## Tech stack & pinned versions — read before touching dependencies

This environment (Node 24.17.0, pnpm 11.15.1) is bleeding-edge enough that several "just install the latest" moves broke things during this session. Versions are pinned deliberately:

- **`nuxt` is pinned exactly to `4.4.8`** (not `^4.4.8`) in `package.json`. Nuxt `4.5.x` introduced a pluggable Nitro server-builder split that crashes when `@nuxtjs/storybook`'s eager `storybook/internal/core-server` import (which patches Node's `fs` via `graceful-fs`) collides with Nitro's synchronous dynamic-import path — a real, reproducible upstream bug, not an environment mistake. Do not bump Nuxt past 4.4.x without re-testing this interaction.
- **`@nuxtjs/storybook` is NOT installed.** It was tried and abandoned — same root cause as above, plus later versions pull in a second conflicting copy of `@storybook/vue3-vite`. Storybook is run **standalone** instead: `@vitejs/plugin-vue` is manually wired into `.storybook/main.ts` (the `@storybook/vue3-vite` framework preset does *not* auto-add it — that surprised us too, verify if you upgrade).
- **`storybook`, `@storybook/vue3-vite`, `@storybook/addon-docs`, `@storybook/addon-a11y` are pinned to exactly `9.1.2`** (matching versions across the board). Mismatched versions across these four packages caused a non-deterministic "Failed to fetch dynamically imported module" error in the dev server (not the static build) that took a while to diagnose — turned out to be peer-resolution drift from `pnpm add`ing different pins over time, fixed with a full `rm -rf node_modules pnpm-lock.yaml && pnpm install`.
- **`typescript` is pinned to `5.9.3`.** `vue-tsc` (used for `pnpm nuxi typecheck`) breaks on TypeScript 7.x (a bleeding-edge native-compiler preview) because `vue-tsc` internally requires `typescript/lib/tsc`, a subpath TS 7's `package.json` no longer exports.
- **Tailwind v4**, wired via `@tailwindcss/vite` (not the older `@nuxtjs/tailwindcss` module) — both in `nuxt.config.ts` (for the real site) and separately in `.storybook/main.ts`'s `viteFinal` (for Storybook, which doesn't share Nuxt's Vite config).
- **`@tailwindcss/typography`** — required for the `.prose`/`.prose-lg`/`.post-prose` classes used throughout (`ArticleProse.vue`) to do anything at all. Easy to forget if you scaffold a new prose-consuming page.
- **No `@nuxt/content`.** Deliberately avoided (risk of another Nitro/Vite compatibility landmine after the Nuxt version issue above). Content loading is hand-rolled — see "Content system" below.
- **No `gray-matter`.** It depends on Node's `Buffer`, which doesn't exist in the browser. It was used initially, then removed after it crashed client-side hydration on the post-detail page (frontmatter got parsed again during hydration since that page didn't originally go through `useAsyncData`). Replaced with a ~20-line dependency-free regex frontmatter parser in `app/utils/markdown.ts`. **Do not reintroduce `gray-matter` or any other Node-only parsing library into `app/` code that might run client-side** — check `app/utils/markdown.ts` and extend it instead if you need richer frontmatter (e.g. nested objects).
- **`gsap`** — used for one thing: the homepage hero's entrance animation (`app/pages/index.vue`, `onMounted` + `gsap.from(...)` on `[data-animate]` elements). Not used anywhere else.

If you ever need to bump any of the above, re-run the full verification workflow below before trusting it.

## Directory map

```
app/
  assets/css/
    main.css        — Tailwind entry, @plugin typography, body defaults, the .content-grid rule (see below)
    tokens.css       — @theme block: every color/font/radius/shadow token, extracted verbatim from Header.DrXMuXCl.css. @font-face rules for the 6 fonts.
  components/         — ~26 top-level components, every one has a matching *.stories.ts. See "Component inventory" below.
  components/icons/   — ~22 single-purpose icon SFCs (inline SVG, path data copied verbatim where the icon exists in the mirrors; a handful — GitHub/LinkedIn/Mail/Search/Close/Globe/Facebook/TwitterBird — are standard brand/utility icons added because the mirrors don't have every icon a real portfolio needs, but path style matches).
  composables/        — usePosts.ts, useProjects.ts, useCv.ts, useAbout.ts — see "Content system"
  utils/markdown.ts   — shared parseFrontmatter() + a configured MarkdownIt instance
  pages/              — file-based routes, see "Pages & routes"
content/
  posts/*.md          — 4 blog posts, converted from the raw WordPress exports at content root
  projects/*.md        — 5 project write-ups
  cv.md, about.md      — singleton content files
  content-1..4.md      — raw WP source, kept for reference (see above)
public/
  fonts/               — 6 woff2 files copied from the mirror
  images/               — a handful of hero/card images copied from the posts mirror + the owner's real headshot (enwemasorbarnabas.jpeg, used as site logo + favicon)
  rss.xml               — GENERATED, do not hand-edit (see scripts/generate-rss.mjs)
scripts/
  generate-rss.mjs     — standalone Node script (no Nuxt/Vite APIs), regenerates public/rss.xml from content/posts/*.md. Wired into dev/build/generate via package.json ("node scripts/generate-rss.mjs && nuxt ...").
.storybook/
  main.ts               — stories glob, staticDirs: ['../public'] (needed so /images/* resolve in stories), manual @vitejs/plugin-vue + tailwindcss() wiring, ~ and @ aliases to app/
  preview.ts             — imports app/assets/css/main.css, sets background swatches
```

## Design tokens

`app/assets/css/tokens.css` is a Tailwind v4 `@theme` block. Every value in it was grepped directly out of the mirror's compiled CSS — see the file header comment. Notable groups: `--color-gn-*` (brand), `--color-gh-*` (GitHub tones), `--color-gloss-gray-*`, `--color-lavender-*`, `--color-sand-*`, custom type scale `--text-gh0`..`--text-gh6` / `--text-gf1`..`--text-gf6`, and shadow tokens all tinted `#d1d1c5`. Fonts: Mona Sans (sans), five Monaspace variants (mono). Don't add new token values here without a real source to point to.

`app/assets/css/main.css` also defines `.content-grid` as a **plain CSS rule**, not a token — this was missing for a while (see "Notable fixes/bugs" below) even though the class name was already used in `ArticleProse.vue`.

## Component inventory

All components live flat in `app/components/` (icons in `app/components/icons/`), each with a same-named `*.stories.ts`. Grouped by purpose:

**Chrome:** `AppHeader`, `AppFooter`, `GradientBackground` (two variants: `strip` for the posts/projects listing top-of-page gradient, `hero` for a project detail page's full-bleed gradient with a custom 2-color pair — colors must come from the `gn-*` palette, not new hex values), `PageHero`, `NavLink`.

**Post-related:** `PostCard` (two markup variants depending on whether the post has a hero image — mirrors the source exactly), `PostsGrid`, `PostDetailHeader` (also reused, with several props made optional, as the homepage's bio-intro hero and the About page's header — see below), `ArticleProse` (drop-cap first paragraph, wraps `.content-grid`), `HeroImage`, `CodeBlock` (copy-to-clipboard), `Badge` (post/idea/link content-type pill).

**Project-related (rebuilt from `github-next-project` mirror — see Notable fixes):** `ProjectCard`, `ProjectStageBadge` (7 stage labels → 4 color families: green/blue/pink/purple, two markup variants `card`/`hero`), `ProjectDetailHeader`, `ProjectShareLinks` (Facebook/Twitter-bird/LinkedIn share-intent links).

**Filtering (posts sidebar — no precedent existed in the mirrors, built from established tokens/patterns; see the component doc comments for exactly which real pattern each borrows from):** `PostsSidebar`, `SearchInput`, `CategoryFilter`, `TagFilter`, `TagPill` (the one piece here with real precedent — copied from the site's actual "Related:" post-footer link pills).

**Generic UI (also no direct precedent, same caveat):** `Button` (primary/secondary/ghost — secondary matches the real RSS-subscribe pill, ghost matches the real nav-toggle button), `Link` (default/muted/primer variants), `InfinitePagination` (loading/error/end states + manual "Load more" fallback via IntersectionObserver), `AvatarStack` (overlapping avatars with hover fan-out; falls back to an initial-letter circle when no `avatarUrl` is given).

**Icons:** see `app/components/icons/`. `IconGallery.stories.ts` renders all of them in a grid — add new icons there too.

## Pages & routes

| Route | File | Notes |
|---|---|---|
| `/` | `app/pages/index.vue` | AppHeader + GradientBackground(strip) + PostDetailHeader-as-bio-intro + contact-icon row + PostsGrid of **all** posts + AppFooter. GSAP entrance animation on `[data-animate]`. |
| `/posts` | `app/pages/posts/index.vue` | Two-column layout: `PostsSidebar` (search/category/tags, client-side filtered) + masonry `PostCard` grid. |
| `/posts/[slug]` | `app/pages/posts/[slug].vue` | `PostDetailHeader` + `HeroImage` + `ArticleProse` rendering the post's markdown body. |
| `/projects` | `app/pages/projects/index.vue` | Masonry `ProjectCard` grid (`columns-1 md:columns-2 xl:columns-3`), matching the real listing page layout. |
| `/projects/[slug]` | `app/pages/projects/[slug].vue` | Full `min-h-[90vh]` gradient hero (`ProjectDetailHeader`) + `ArticleProse` body. |
| `/cv` | `app/pages/cv.vue` | `PostDetailHeader` (name/role) + contact-info row + `ArticleProse` rendering the full résumé. |
| `/about` | `app/pages/about.vue` | `PostDetailHeader` + `ArticleProse` (warm, first-person bio grounded in real CV facts) + CTA button row (Posts/Projects/CV). |

`app/app.vue` is just `<NuxtPage />` — no shared layout file yet.

AppHeader's default nav is Home (`/`) / Projects (`/projects`) / Posts (`/posts`) / About (`/about`) / CV (`/cv`) — **no trailing slashes**; every one of these was originally `/posts/`-style (copied from the mirror, which is a static Astro site) and had to be fixed to match Nuxt's actual route paths one at a time as each page was built. If you add a new top-level page, make sure the nav href has no trailing slash.

Every page passes `logo-src="/images/enwemasorbarnabas.jpeg"` to `AppHeader` (real photo as a circular logo, overriding the default `LogoMark` SVG) and sets `active-href` to match its own route.

## Content system

No CMS, no `@nuxt/content`. Each content type is: a folder/file under `content/` (frontmatter + markdown body) → a composable in `app/composables/` that does `import.meta.glob(..., { query: '?raw', eager: true })`, parses frontmatter with `app/utils/markdown.ts`, renders the body with `markdown-it`, and caches the result in a module-level variable → a page that calls it through `useAsyncData` (**always** — see the Buffer/hydration bug below for why this matters) → SSR-only static route params for `[slug].vue` pages via `getXBySlug(slug) ?? null` and a `throw createError({ statusCode: 404 })` guard.

- `usePosts.ts` — `getAllPosts()`, `getPostBySlug()`, `getCategoryOptions()`, `getAllTags()`. Post frontmatter: `title, excerpt, date, dateLabel, type (post|idea|link), category, image?, imageAlt?, authorName, authorUrl, authorAvatarUrl?, tags?`.
- `useProjects.ts` — `getAllProjects()`, `getProjectBySlug()`. Frontmatter: `title, summary, whatFor, date, dateLabel, stage, gradientColors (2 hex strings from gn-* palette), image?, authorName, authorUrl, authorAvatarUrl`.
- `useCv.ts` / `useAbout.ts` — singleton content, `getCv()` / `getAbout()`.

**If you add a new content type, follow this exact pattern** — don't reach for `@nuxt/content` or `gray-matter`.

## RSS feed

`public/rss.xml` is generated, not hand-written — `scripts/generate-rss.mjs` reads `content/posts/*.md` directly (own copy of the frontmatter parser, deliberately not importing from `app/` to keep it a zero-Nuxt-dependency script) and writes valid RSS 2.0. Wired into `pnpm dev`/`build`/`generate` (runs first via `&&`), also runnable standalone as `pnpm rss:generate`. `nuxt.config.ts` has a `<link rel="alternate" type="application/rss+xml">` pointing at it. `SITE_URL` inside the script is hardcoded to `https://enwemasorbarnabas.com` — update there if the real deploy domain differs.

## Notable fixes/bugs (context for why the code looks the way it does)

1. **Client-side hydration crash: `ReferenceError: Buffer is not defined`.** Root cause: `gray-matter` (Node-only) was being invoked directly in a page's `setup()` instead of through `useAsyncData`, so it re-ran in the browser during hydration. Fixed by removing `gray-matter` entirely (see Tech Stack section) and making sure every page fetches content through `useAsyncData`. **Any new content-consuming page must follow the same pattern** — don't call `getXBySlug`/`getAllX` directly in `setup()`.
2. **`.content-grid` class used but never defined.** `ArticleProse.vue` had `content-grid` in its class list (copied verbatim from the source markup) but the actual CSS Grid rule behind it was never extracted into our stylesheet — it silently did nothing. Posts pages looked fine anyway because of an unrelated `max-w-3xl mx-auto` wrapper; the projects detail page (which matches the source's literal `w-full` main, relying on `.content-grid` alone) rendered full-device-width until the rule was added to `main.css`. If you see a prose page with wrong width, check this rule is still in `main.css`.
3. **Storybook dev-server "Failed to fetch dynamically imported module".** Root cause: peer-version drift across `@storybook/vue3-vite`/`storybook`/addons from incremental `pnpm add` pins. Fixed by pinning all four to identical `9.1.2` and a clean `rm -rf node_modules pnpm-lock.yaml && pnpm install`. If this recurs, check `pnpm why storybook` / `pnpm why @storybook/vue3-vite` for duplicate resolved versions before assuming it's a config bug.
4. **`@storybook/vue3-vite`'s framework preset does not add `@vitejs/plugin-vue`.** Counter-intuitive but verified — it only adds a docgen plugin. `.storybook/main.ts` adds `@vitejs/plugin-vue` explicitly in `viteFinal`. Don't remove it thinking it's redundant.
5. **`AvatarStack` / `PostCard` authors without a photo.** Real blog posts have no author photo, so `AvatarStack`'s `avatarUrl` is optional and falls back to an initial-letter circle instead of a broken `<img src="">`.
6. **`PostDetailHeader`'s `backHref`/`type`/`authorName`/`authorUrl`/`authorAvatarUrl`/`date`/`dateLabel` are all optional**, each independently conditionally rendered — this component is reused as a generic "title + subtitle + optional byline" header for the homepage bio-hero, the About page, and the CV page, not just post detail pages.

## Known content overlaps / open items — flagged to the user, not yet resolved

- **`content/cv.md`'s "Independent Projects" section and `content/projects/*.md` describe the same 5 projects with separately-maintained prose** (by design, so each destination is self-contained) — editing one won't update the other.
- **The homepage (`/`) and `/posts` both list all posts** — homepage shows the full grid inline, `/posts` additionally offers search/category/tag filtering. User was asked if this duplication should be resolved (e.g. homepage links out instead); no decision made yet.
- **`github-next-post/`, `github-next-project/`, `mattrothenberg/` deletion**: user asked to clean these up, was offered three scope options (delete everything / images+crawler-junk-only / crawler-junk-only), the question was interrupted twice and never answered. Still on disk, still gitignored. Ask before deleting.
- **Talks page**: never mentioned again after the original GitHub-Next-style nav was adapted (About/CV replaced People/Talks at different points) — confirm current `AppHeader` nav item list reflects what the user actually wants before assuming any specific set of pages is "done."
- **`content/content-1.md`..`content-4.md`** (raw WP exports) are superseded but not deleted.

## Verification workflow — read this before claiming something works

Hard-earned lesson from this session: **`curl` against the Nuxt dev server is a reliable check** (it's SSR, so you get fully-rendered HTML back — confirmed useful repeatedly for checking post/project content, nav hrefs, badge classes, etc.) but **`curl` against the Storybook dev server is not** — Storybook's iframe is a client-side SPA; curl-ing a story bundle URL returns 200 with valid-looking JS even when the browser would fail with a real runtime error (this exact gap caused a false "it works" claim earlier in the session). For Storybook, `pnpm storybook:build` (the static production build, which runs through Rollup and *does* fail loudly on real compile errors) is the trustworthy signal; a full interactive browser check requires Playwright/Chromium, which is not a project dependency (see below).

Standard check sequence after any change:
```bash
rm -rf .nuxt && pnpm nuxi typecheck     # must exit 0, no output
pnpm storybook:build                     # must exit 0
# then start the dev server and curl every route:
pnpm dev &                               # note: script chain runs generate-rss.mjs first
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/posts
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/posts/kubernetes-mysql-laravel
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/projects
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/projects/tikirtin
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/cv
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/about
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/rss.xml
# then always stop it — the dev server was repeatedly left running/orphaned across turns this session:
lsof -ti:3000 -sTCP:LISTEN | xargs -r kill
```
**Always explicitly kill the dev server when done.** Multiple times this session a background `pnpm dev`/`pnpm storybook` process was left running across turns (sometimes on a fallback port like 3001/6007 because 3000/6006 was still held by an earlier orphaned process) and had to be hunted down with `lsof -ti:PORT -sTCP:LISTEN`.

If you need actual browser/hydration verification (not just SSR HTML), a temporary Playwright+Chromium install was used once via a scratch directory outside the project, then fully removed afterward at the user's request (including the npx cache). **If you reinstall Playwright for verification, clean it up completely afterward** (`~/Library/Caches/ms-playwright`, any `~/.npm/_npx/*` entries, any scratch `node_modules`) — don't leave it lying around, and don't add it as a project dependency without asking.

## User's working preferences (observed this session)

- **Wants real fixes, not workarounds.** When something's not exact-match, the expectation is either "make it exact" or "tell me clearly why not and what the tradeoff is" — not silent approximation.
- **Corrects scope creep quickly but isn't scope-phobic** — e.g. explicitly asked for a full dedicated Projects page rather than a workaround link when offered the choice; but also expects you to *ask* before that kind of expansion, not just do it.
- **Destructive/ambiguous actions need a real question, not a guess** — the github-next-post deletion prompt is the clearest example; don't delete source/reference material without explicit confirmation of scope.
- **Cares about environment hygiene** — explicitly asked to kill orphaned dev-server processes and fully remove temporary tooling (Playwright) installed outside the project.
- **Sends supplementary content mid-turn** (a résumé PDF, a reference screenshot, a "here's a sample" image) — treat these as context for the current task, not necessarily literal style/spec to copy (e.g. a reference screenshot from an unrelated site was explicitly used only for structural/UX inspiration, not visual style — the instruction "use style from @github-next-post/, do not invent styles" still governed the actual CSS).
- Prefers being told directly when something is a known limitation/gap (e.g. RSS feed didn't exist, nav links pointed nowhere) rather than having it silently glossed over — several fixes in this session originated from Claude proactively flagging a gap in a summary, which the user then asked to be fixed.

## Commands reference

```bash
pnpm dev                # generate rss.xml, then nuxt dev (default port 3000, falls back if busy)
pnpm build               # generate rss.xml, then nuxt build
pnpm generate             # generate rss.xml, then nuxt generate (static)
pnpm preview              # preview a built app
pnpm rss:generate         # just regenerate public/rss.xml
pnpm storybook            # storybook dev, port 6006 (falls back if busy)
pnpm storybook:build      # static storybook build -> storybook-static/ (gitignored)
pnpm nuxi typecheck       # vue-tsc across the project — must be run after `rm -rf .nuxt` if types seem stale
```
