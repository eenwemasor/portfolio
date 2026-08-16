---
title: "DNSSEC Posture Scanner"
summary: "A solo-built domain-security product scanning roughly 4,000 domains for DNSSEC/SPF/DKIM/DMARC posture on a recurring schedule."
dateLabel: "2025 – 2026"
techStack: ["Django", "DRF", "Celery", "PostgreSQL", "Nuxt 4", "TypeScript", "Docker", "GitHub Actions"]
---

- Solo-built a domain-security product scanning roughly 4,000 domains for DNSSEC/SPF/DKIM/DMARC posture on a recurring schedule, with ~10 analytics endpoints feeding a Nuxt dashboard.
- Deliberately split the original monolith into an API backend and standalone Nuxt frontend so each deploys independently through its own Dockerfile and GitHub Actions workflow.
