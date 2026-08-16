---
title: "DNSSEC Posture Scanner"
summary: "A solo-built domain-security product scanning roughly 4,000 domains for DNSSEC/SPF/DKIM/DMARC posture on a recurring schedule."
whatFor: "Give domain owners visibility into their DNSSEC/SPF/DKIM/DMARC posture without manually checking each record."
date: "2025-06-01"
dateLabel: "Jun 2025"
stage: "Product"
gradientColors: ["#60a0b3", "#d78a67"]
authorName: "Enwemasor Barnabas"
authorUrl: "https://github.com/eenwemasor"
authorAvatarUrl: "https://github.com/eenwemasor.png?size=80"
---

- Solo-built a domain-security product scanning roughly 4,000 domains for DNSSEC/SPF/DKIM/DMARC posture on a recurring schedule, with ~10 analytics endpoints feeding a Nuxt dashboard.
- Deliberately split the original monolith into an API backend and standalone Nuxt frontend so each deploys independently through its own Dockerfile and GitHub Actions workflow.

**Tech stack:** Django, DRF, Celery, PostgreSQL, Nuxt 4, TypeScript, Docker, GitHub Actions
