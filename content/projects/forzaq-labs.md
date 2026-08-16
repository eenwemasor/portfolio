---
title: "Forzaq Labs — Product Suite"
summary: "A three-repo product suite: a Laravel/Filament API on Octane, a Nuxt 4 marketing site, and a published Vue 3 component library."
whatFor: "Give Forzaq Labs a production API, marketing site, and component library that all ship and deploy independently."
date: "2026-03-01"
dateLabel: "Mar 2026"
stage: "Product"
gradientColors: ["#ce6d53", "#c4d7d9"]
authorName: "Enwemasor Barnabas"
authorUrl: "https://github.com/eenwemasor"
authorAvatarUrl: "https://github.com/eenwemasor.png?size=80"
---

- Built and independently operates a three-repo product suite: a Laravel/Filament API on the Octane (FrankenPHP) runtime, a Nuxt 4 marketing site with a Nuxt Content blog engine, and a published Vue 3 component library.
- Authored the component library as a versioned, npm-installable package — 48 components spanning charts, forms, marketing sections and data display, documented in Storybook and consumed by the web app as a dependency.
- Locked down the admin surfaces with IP-allowlist middleware and proxy-aware client-IP resolution for the Horizon queue dashboard and log viewer.
- Each repo ships through its own GitHub Actions pipeline: build, push to GitHub Container Registry, and deploy to Docker Swarm on the VPS via `docker stack deploy`.

**Tech stack:** Laravel 13, Filament, Octane (FrankenPHP), Nuxt 4, Vue 3, Storybook, Docker Swarm, GHCR

## Requirements

- Capture and qualify inbound leads through three differentiated forms — general enquiry, fintech/bank, and mid-market — into one structured `Lead` model: source, industry, use case, applicable regulations, support needed, compliance challenge, data stack, and target readiness date.
- Give a solo founder a working CRM without building one: a Filament admin panel to triage leads, attach follow-up notes, and track status.
- Protect both the public API (`X-Api-Key` header checked with `hash_equals`, plus `throttle:10,1`) and the `/admin` path (a separate, higher-priority Traefik router with an IP allowlist — infrastructure-level, not application-level) — necessary for a practice that handles NDPA/CBN-regulated client data.
- Share one design system across the marketing site and any future Forzaq product instead of copy-pasted components — hence a separately versioned, installable Vue 3 library.
- Run four independently-versioned repos on a single VPS without them colliding: one Traefik ingress, one Docker Swarm, one CI/CD pipeline per repo.
- Ship a free, passive-only security tool (the [DNSSEC Posture Scanner](/projects/dnssec-posture-scanner)) as a lead-generation funnel, without the scanning itself creating legal exposure under Nigeria's Cybercrimes Act — read-only DNS lookups only, no active probing.

## System architecture

![Forzaq Labs deployment architecture — Traefik routing to the web and API stacks on a single Docker Swarm VPS, with CI/CD and host observability](/images/projects/forzaq-labs-architecture.svg)

Four repos, one VPS, one Traefik ingress. `forzaq-labs-web` and `forzaq-labs-api` deploy as separate Swarm stacks; the UI library is pulled into the web build at build time as a private GitHub package. The whole host — Swarm init, Traefik, Portainer, Prometheus/Grafana, Loki/Promtail — is provisioned once by the `infrastructure` repo's Ansible roles and shared across every product on the box.

## Screenshots

![Forzaq Labs homepage hero — "Innovate with your data, without inheriting the risk"](/images/projects/forzaqlabs-hero-screenshot.webp)

![Forzaq Labs "before/after forzaq" comparison section](/images/projects/forzaqlabs-services-screenshot.webp)

## Tools & technology

- **Backend:** PHP 8.3, Laravel 13.8, Filament 3.3, Laravel Horizon 5.47, Laravel Octane 2.17 (FrankenPHP), PostgreSQL 18, Redis, opcodesio/log-viewer, Pest/PHPUnit
- **Frontend:** Nuxt 4.4.8, Vue 3.5, Nuxt Content 3.14, Nuxt Image, TanStack Vue Query, axios
- **Component library:** Vite (library mode), TypeScript strict, Storybook 10, Chart.js/vue-chartjs, Changesets, Vitest
- **Infrastructure/CI:** Ansible, Docker Swarm, Traefik v3.6.6, Portainer 2.27.3, Prometheus v3.4.2 + Grafana 11.6.16, Loki/Promtail 3.5.2, GHCR, GitHub Actions, Cloudflare R2

## Links

- Live site: [forzaqlabs.com](https://forzaqlabs.com/)
- Related project: [DNSSEC Posture Scanner](/projects/dnssec-posture-scanner)

## Reasoning

The infrastructure docs are explicit about a few decisions worth naming. There's deliberately **no global HTTP→HTTPS redirect** — that would break the Let's Encrypt HTTP-01 challenge, which needs `/.well-known/acme-challenge/` reachable over plain HTTP, so every service declares its own `https-redirect@file` router instead. Every Swarm service standardises on `restart_policy: condition: any`, never `on-failure`, so a healthy-but-manually-stopped container still comes back.

The free DNSSEC scanner exists because a solo-led consulting practice "cannot scale outbound, content, and sales by hand" — the documented funnel is Tool → Index (authority) → Monitoring (recurring revenue) → Remediation (the actual consulting engagement), with a hard guardrail that scanning stays passive and read-only. And the broader positioning — open standards, zero lock-in, full client handover — shapes the product itself: no invented metrics, no guaranteed-compliance claims in the marketing copy, since only a regulator or auditor can actually certify compliance.
