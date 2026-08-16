---
title: "Forzaq Labs — Product Suite"
summary: "A three-repo product suite: a Laravel/Filament API on Octane, a Nuxt 4 marketing site, and a published Vue 3 component library."
dateLabel: "2026"
techStack: ["Laravel 13", "Filament", "Octane (FrankenPHP)", "Nuxt 4", "Vue 3", "Storybook", "Docker Swarm", "GHCR"]
---

- Built and independently operates a three-repo product suite: a Laravel/Filament API on the Octane (FrankenPHP) runtime, a Nuxt 4 marketing site with a Nuxt Content blog engine, and a published Vue 3 component library.
- Authored the component library as a versioned, npm-installable package — 48 components spanning charts, forms, marketing sections and data display, documented in Storybook and consumed by the web app as a dependency.
- Locked down the admin surfaces with IP-allowlist middleware and proxy-aware client-IP resolution for the Horizon queue dashboard and log viewer.
- Each repo ships through its own GitHub Actions pipeline: build, push to GitHub Container Registry, and deploy to Docker Swarm on the VPS via `docker stack deploy`.
