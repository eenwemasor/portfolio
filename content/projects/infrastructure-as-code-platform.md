---
title: "Infrastructure-as-Code Platform"
summary: "Ansible roles that turn a bare OVH Cloud VPS into a production-ready, fully observable Docker Swarm host in one run."
whatFor: "Turn a bare cloud VPS into a production-ready, fully observable Docker Swarm host with one repeatable command."
date: "2026-01-01"
dateLabel: "Jan 2026"
stage: "Completed"
gradientColors: ["#fdc987", "#60a0b3"]
authorName: "Enwemasor Barnabas"
authorUrl: "https://github.com/eenwemasor"
authorAvatarUrl: "https://github.com/eenwemasor.png?size=80"
---

- Authored the Ansible roles that turn a bare OVH Cloud VPS into a production-ready Docker Swarm host in one run: Docker installation, Swarm initialization, and templated service stacks.
- Deployed Traefik as the reverse proxy with automatic service routing, Prometheus/Grafana dashboards for metrics, and Loki/Promtail for centralized log aggregation — full observability for every product deployed onto it.
- Hardened the host with templated sshd configuration and fail2ban rules, and managed all secrets with Ansible Vault.
- This platform is the deployment target for the Tikirtin and Forzaq Labs products — one repeatable command replaces manual server setup.

**Tech stack:** Ansible, Docker Swarm, Traefik, Prometheus, Grafana, Loki/Promtail, Portainer, OVH Cloud
