---
name: "Enwemasor Barnabas"
role: "Full-Stack Engineer — DevOps"
email: "enwemasorbarnabas@gmail.com"
phone: "+2348164951313"
location: "Lagos, Nigeria"
website: "https://enwemasorbarnabas.com"
---

## Professional Summary

Full-stack engineer who takes products from idea to production and keeps them running — front end, API, infrastructure and CI/CD — with 8+ years of experience and three complete products shipped and operated independently, from an event-ticketing platform with automated payouts to a monitored Docker Swarm deployment platform built from scratch. Brings a builder's bias toward removing manual work: every hand-run process encountered — case entry, approvals, settlements, server setup — gets replaced with something automated and observable. Self directed enough to own a system alone, collaborative enough to have spent four years shipping inside SeamlessHR's cross-functional product teams.

## Professional Experience

### Senior Backend Engineer, SeamlessHR
*10/2021 – Present*

- Led the migration of the company's reporting engine from a Laravel monolith to a serverless Node.js/TypeScript architecture on AWS Lambda and DynamoDB — building a Docker Compose local environment (DynamoDB Local plus an admin UI) so the team could develop against the new stack without touching AWS, and standing up the staging deployment workflow.
- Built disciplinary case-management features full-stack — the Vue.js front end and the Laravel REST API — across four role-scoped access levels, including a drag-and-drop bulk-upload UI backed by a chunked processing pipeline with progress tracking that replaced one-by-one case entry.
- Designed and built the overtime-requisition module end to end — database schema, approval chain workflow, and the admin/HOD/supervisor interfaces — plus a letterhead-template editor with live preview and PDF export, replacing a manual, email-based approval process.
- Designed a JWT/SSO authentication layer with API-Gateway-level token validation, rotating refresh tokens, AES-256-GCM session encryption and DynamoDB TTL-based expiry — removing a round-trip to the legacy SSO service on every request.

### Senior Full Stack Engineer, Daba Finance
*09/2021 – 07/2022*

- Orchestrated the design and implementation of a groundbreaking microservices architecture using Node.js, TypeScript, GraphQL, Kafka, and MongoDB. This transformative approach resulted in a streamlined and highly scalable system.
- Pioneered the development of the Daba Finance Testing the Waters (TTW) investment platform, catalyzing a remarkable 30% surge in investor interest before the beta launch.
- Managed the end-to-end execution of two fully integrated microservices, leveraging Node.js, GraphQL, and MongoDB to ensure optimal performance and functionality.
- Innovatively engineered Python scraping scripts, serving as the primary data source and contributing to 80% of the company's dataset.

### Full Stack Engineer, Skooleeo Technology
*02/2021 – 09/2021*

- Led a strategic initiative to transition a monolithic Laravel project into a dynamic API-based Laravel REST API and Vue.js Single Page Application. This visionary move resulted in a remarkable 50% boost in the engineering team's productivity and a significant enhancement in product performance.
- Optimized user experience by strategically crafting and modifying Vue.js components, contributing to a more intuitive and responsive application.
- Spearheaded the development of a robust referral reward system for the school management system, elevating user engagement, and refined the coupon code redemption implementation for Skooleeo, improving overall product efficiency.

### Full Stack Engineer (Contract), ReachTech Solution
*06/2020 – 12/2020*

- Engineered and maintained two high-performance Laravel e-commerce platforms, integrating React.js, Vue.js, Laravel, Gatsby, PostgreSQL, and MySQL.
- Architected and implemented a seamless CI/CD process, ensuring smooth deployment of client apps across multiple platforms including AWS, Microsoft Azure, Netlify, and Heroku.
- Developed a user-friendly mobile app with Flutter and Firebase functions, delivering a scalable and secure experience.

### Full Stack Engineer, Phosmobile
*04/2017 – 06/2020*

- Crafted modern applications using React, Vue.js, Laravel, Gatsby, PostgreSQL, and MySQL, resulting in fast, scalable, and responsive user experiences.
- Designed and developed feature-rich mobile apps using Flutter, incorporating functionalities such as push notifications and user authentication.
- Elevated continuous integration practices through the implementation of updated CI/CD scripts, ensuring error-free software releases.
- Led the project delivery phase for mobile apps and software systems, orchestrating cross-functional teams to achieve timely and budget-friendly milestones.

## Education

- **MSc, Computing and Information Systems** — Liverpool John Moores University, UK (2026)
- **Higher National Diploma, Computer Science** — Lagos State Polytechnic, Nigeria (2023)
- **National Diploma, Computer Science** — Lagos State Polytechnic, Nigeria (2018)

## Technical Skills

**Languages & Frameworks**
React / Redux, Vue.js / Nuxt.js / Next.js, TypeScript / Node.js, PHP / Laravel

**Infrastructure & DevOps**
Docker & Docker Swarm, Kubernetes (Helm), Ansible (IaC), GitHub Actions CI/CD, Traefik (Reverse Proxy), Linux Server Hardening

**Databases, APIs & Cloud**
REST & GraphQL APIs, Prometheus / Grafana / Loki, PostgreSQL / MySQL, MongoDB, Redis, AWS (Lambda, S3, DynamoDB)

## Independent Projects

### Infrastructure-as-Code Platform
*Ansible, Docker Swarm, Traefik, Prometheus, Grafana, Loki/Promtail, Portainer, OVH Cloud — 2026*

- Authored the Ansible roles that turn a bare OVH Cloud VPS into a production-ready Docker Swarm host in one run: Docker installation, Swarm initialization, and templated service stacks.
- Deployed Traefik as the reverse proxy with automatic service routing, Prometheus/Grafana dashboards for metrics, and Loki/Promtail for centralized log aggregation — full observability for every product deployed onto it.
- Hardened the host with templated sshd configuration and fail2ban rules, and managed all secrets with Ansible Vault.
- This platform is the deployment target for the Tikirtin and Forzaq Labs products below — one repeatable command replaces manual server setup.

### Forzaq Labs — Product Suite
*Laravel 13, Filament, Octane (FrankenPHP), Nuxt 4, Vue 3, Storybook, Docker Swarm, GHCR — 2026*

- Built and independently operates a three-repo product suite: a Laravel/Filament API on the Octane (FrankenPHP) runtime, a Nuxt 4 marketing site with a Nuxt Content blog engine, and a published Vue 3 component library.
- Authored the component library as a versioned, npm-installable package — 48 components spanning charts, forms, marketing sections and data display, documented in Storybook and consumed by the web app as a dependency.
- Locked down the admin surfaces with IP-allowlist middleware and proxy-aware client-IP resolution for the Horizon queue dashboard and log viewer.
- Each repo ships through its own GitHub Actions pipeline: build, push to GitHub Container Registry, and deploy to Docker Swarm on the VPS via `docker stack deploy`.

### Cloud-Native Notification Platform
*TypeScript, Kafka, Avro, Kubernetes, Helm, Skaffold, Ansible — 2026*

- Designed an event-driven, multi-channel notification platform: a TypeScript gateway publishing Avro-encoded events to Kafka with a schema registry, and decoupled consumer services per channel.
- Wrote the Helm chart packaging the full stack and the Ansible playbooks provisioning a multi-node Kubernetes cluster from bare VMs — empty machines to running platform without manual setup.

### DNSSEC Posture Scanner
*Django, DRF, Celery, PostgreSQL, Nuxt 4, TypeScript, Docker, GitHub Actions — 2025 – 2026*

- Solo-built a domain-security product scanning roughly 4,000 domains for DNSSEC/SPF/DKIM/DMARC posture on a recurring schedule, with ~10 analytics endpoints feeding a Nuxt dashboard.
- Deliberately split the original monolith into an API backend and standalone Nuxt frontend so each deploys independently through its own Dockerfile and GitHub Actions workflow.

### Tikirtin — Event Ticketing Platform
*Laravel, React 18, Redux Toolkit, TypeScript, Vite, Tailwind, Flutterwave, Docker, GitHub Actions — 2024 – 2026*

- Sole-built and have operated for two years a complete event-ticketing product: a Laravel REST API shipped across ~45 tagged releases and a React/Redux organiser dashboard plus public discovery and checkout UI.
- Built the organiser experience end to end — event creation with recurring schedules, ticket management, team members, payout destinations — and the public-facing checkout with Flutterwave payments, tax breakdown and order confirmation.
- Designed a fully automated weekly payout engine that calculates and records organiser settlements daily with duplicate prevention and unique payout references — no manual settlement processing.
- Delivered a documented SEO and performance pass on the front end: code-split, lazy-loaded routes; JSON-LD structured data; dynamic sitemap generation; semantic HTML with ARIA labeling and skip-to-content accessibility.
- Runs on Docker with separate develop/production GitHub Actions pipelines and automated database backups.

## Certifications

- **Cloud and DevOps Architect Master's Course** — Intellipaat
- **AWS Solutions Architect Associate** — Intellipaat
- **Google Professional Cloud Architect Training** — Intellipaat
- **DevOps Training** — Intellipaat
