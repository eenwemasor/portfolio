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

## Requirements

- Passively assess a domain's email and DNS security posture — no active SMTP probing, public DNS lookups only — covering MX, root TXT (SPF), `_dmarc.<domain>` TXT (DMARC), `<selector>._domainkey.<domain>` TXT (DKIM via selector discovery), and the DS/DNSKEY chain (DNSSEC), plus optional CAA/SOA.
- Turn those raw records into one transparent, explainable score out of 100 — DMARC weighted 35, SPF 20, DKIM 20, DNSSEC 25 — banded into grades A through F, because DMARC is what actually ties SPF and DKIM to an enforcement policy.
- Scan a fixed list of roughly 4,650 African domains (tagged by sector — banking, news, ecommerce, government, education, business) on a recurring schedule, plus a random 10-domain spot-check between full runs, without hammering anyone's DNS resolver.
- Surface the results as a public, no-login dashboard: score distribution, DMARC/DNSSEC adoption, score trend over time, scan freshness, and a searchable, sortable domain table.
- Let the scanning backend and the public dashboard ship and scale independently of each other.

## System architecture

![DNSSEC Posture Scanner architecture — Celery Beat driving the scanning pipeline into PostgreSQL, read by a separate Django REST API and Nuxt SPA dashboard](/images/projects/dnssec-posture-architecture.svg)

`django_celery_beat`'s database-backed scheduler triggers the scan tasks (the schedule is configured at runtime through the Django admin, not hardcoded). Workers rate-limit themselves — a token bucket per resolver, capped around 20 queries/second globally — because a 4,650-domain public scan has to stay a polite citizen of other people's DNS infrastructure. Results land in Postgres, and that's the only thing the frontend repo ever talks to, through the DRF API — the Nuxt dashboard is a pure client-side SPA (`ssr: false`) with no server-side logic of its own.

## Screenshots

![DNSSEC Posture Scanner landing page and scan input](/images/projects/dnssec-posture-hero-screenshot.webp)

![DNSSEC Posture Scanner dashboard charts — DMARC policy adoption, DNSSEC adoption, score trend, scan success rate](/images/projects/dnssec-posture-dashboard-screenshot.webp)

![DNSSEC Posture Scanner scanned-domains table with per-domain grade and record breakdown](/images/projects/dnssec-posture-table-screenshot.webp)

## Tools & technology

- **Backend:** Python 3.13, Django 4.2, Django REST Framework 3.14, dnspython 2.8, Poetry
- **Task queue:** Celery 5.5, django-celery-beat, Redis (broker + result backend)
- **AI/ML:** google-generativeai (remediation recommendations), scikit-learn (sector clustering)
- **Database:** PostgreSQL 18
- **Frontend:** Nuxt 4.4.8 (SPA mode), TanStack Vue Query, axios, TypeScript 5.7, `@forzaq-labs/ui`
- **Infrastructure/CI:** Docker, GHCR, Docker Swarm, Traefik, GitHub Actions (SSH/SCP deploy)

## Links

- Live site: [dnssec-posture.forzaqlabs.com](https://dnssec-posture.forzaqlabs.com/)
- Built as part of: [Forzaq Labs](/projects/forzaq-labs)

## Reasoning

The scoring weights are a direct, documented judgment call: DMARC gets the largest share (35 of 100) because it's the record that determines policy and visibility — DNSSEC and DKIM are strong protections on their own, but DMARC is what ties SPF and DKIM together into an enforceable, monitorable policy. Splitting the scanner into two repos wasn't an abstract architecture choice — the frontend is explicitly documented as a consumer that still runs several dashboard charts on mock data until the corresponding backend endpoints ship, tracked endpoint-by-endpoint in the API repo. Keeping the dashboard SSR-off follows from the same fact: it has nothing to render server-side, since every byte it shows comes from the API.
