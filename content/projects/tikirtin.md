---
title: "Tikirtin — Event Ticketing Platform"
summary: "A complete event-ticketing product sole-built and operated for two years, with a fully automated weekly payout engine."
whatFor: "Give event organisers a self-serve platform to create events, sell tickets, and get paid automatically every week."
date: "2024-01-01"
dateLabel: "Jan 2024"
stage: "Product"
gradientColors: ["#c4d7d9", "#fdc987"]
authorName: "Enwemasor Barnabas"
authorUrl: "https://github.com/eenwemasor"
authorAvatarUrl: "https://github.com/eenwemasor.png?size=80"
---

- Sole-built and have operated for two years a complete event-ticketing product: a Laravel REST API shipped across ~45 tagged releases and a React/Redux organiser dashboard plus public discovery and checkout UI.
- Built the organiser experience end to end — event creation with recurring schedules, ticket management, team members, payout destinations — and the public-facing checkout with Flutterwave payments, tax breakdown and order confirmation.
- Designed a fully automated weekly payout engine that calculates and records organiser settlements daily with duplicate prevention and unique payout references — no manual settlement processing.
- Delivered a documented SEO and performance pass on the front end: code-split, lazy-loaded routes; JSON-LD structured data; dynamic sitemap generation; semantic HTML with ARIA labeling and skip-to-content accessibility.
- Runs on Docker with separate develop/production GitHub Actions pipelines and automated database backups.

**Tech stack:** Laravel, React 18, Redux Toolkit, TypeScript, Vite, Tailwind, Flutterwave, Docker, GitHub Actions

## Requirements

- Let organisers create events with recurring/multi-date schedules, sections and ticket tiers, speakers, agenda, sponsors, image galleries and custom registration forms, then publish, pause, or archive them.
- Support both guest and authenticated ticket purchase, with a configurable cost breakdown — organisers choose whether platform fees and VAT are passed through to the buyer or absorbed.
- Give organisers a team: invite members (rate-limited invite creation), assign roles, and manage payout destinations per event.
- Automate settlement so organisers get paid without anyone manually reconciling an event's takings — and record every payout with duplicate prevention and a full audit trail.
- Issue and validate real tickets: QR/issued-ticket generation, check-in, and invalidation, plus CSV export of orders, tickets and form submissions for organisers who need it offline.
- Keep the public listing populated even before an organiser has posted directly — aggregate third-party event listings (Eventbrite, Nairabox, TixAfrica) as a supplementary demand feed, without slowing down or coupling to the core booking flow.
- Run five independently-versioned repos — API, app, scraper, blog, help center — against one production VPS without any of them blocking another's release.

## System architecture

![Tikirtin architecture — React app and Laravel API at the core, an independent scraper feeding external events, and a daily-running payout engine](/images/projects/tikirtin-architecture.svg)

The core product is `tikirtin-app` (React/Redux) talking to `tikirtin-api` (Laravel, Sanctum-authenticated, Postgres + Redis). Checkout goes through Flutterwave via a `PaymentGatewayContract`/`PaymentGatewayFactory` pair — only one gateway is wired up today, but the interface is built for more than one. `tikirtin-scpr`, a separate Django + Celery + Playwright service, runs its own scrapers on its own schedule and feeds discovered events into the API through a single admin-protected seed endpoint — it can fail, stall, or redeploy without touching ticket sales. `tikirtin-blog` and `tikirtin-help` are two more Next.js sites, deployed and versioned on their own.

## Screenshots

![Tikirtin homepage — "Discover, Book, Experience More" with an event image grid](/images/projects/tikirtin-hero-screenshot.webp)

![Tikirtin public event listing grid](/images/projects/tikirtin-events-screenshot.webp)

## Tools & technology

- **Backend (tikirtin-api):** PHP 8.3, Laravel 12, Laravel Horizon, Sanctum, Filament 5, Socialite (Google OAuth), Maatwebsite Excel, Spatie Browsershot, PHPUnit/Pest
- **Frontend (tikirtin-app):** React 18, Redux Toolkit + redux-persist, React Router 6, Vite, TanStack Query, Formik + Yup, Tailwind CSS 3, `flutterwave-react-v3`, FullCalendar, Chart.js/ApexCharts
- **Scraper (tikirtin-scpr):** Python 3.13, Django 6.0, DRF, Celery 5.6 + django-celery-beat, Playwright, BeautifulSoup4/lxml, uv
- **Content (tikirtin-blog / tikirtin-help):** Next.js 16, React 19, MDX, Tailwind CSS 4, Framer Motion
- **Payments:** Flutterwave
- **Infrastructure/CI:** Docker Swarm (single-manager OVH VPS), Traefik, Portainer (webhook-driven redeploys), GHCR, GitHub Actions, Prometheus/Grafana + Loki/Promtail, Cloudflare R2

## Links

- Live site: [tikirtin.com](https://tikirtin.com/)

## Reasoning

The payout engine is named "weekly" in its own documentation but runs **daily** by design — `PayoutCreatorJob` recalculates every event date falling in the current Monday–Sunday week each time it runs, so payout amounts stay current with same-week ticket sales right up until the settlement window closes, rather than only reconciling once and risking a stale figure. A manual `artisan payouts:process-weekly --force` command exists as a fallback for the days automation shouldn't be trusted blindly.

Splitting the scraper into its own repo and its own Postgres/Redis instance means a scraping run that hangs on a slow third-party site, or a scraper that needs a Playwright/Chromium upgrade, can never take ticket sales or checkout down with it — it talks to the core API through exactly one endpoint. The `PaymentGatewayContract` interface, with only Flutterwave implemented behind it, is a deliberate seam for adding a second processor later without touching the checkout flow that calls it.
