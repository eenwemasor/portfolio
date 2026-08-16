---
title: "Infrastructure-as-Code Platform"
summary: "Ansible roles that turn a bare OVH Cloud VPS into a production-ready, fully observable Docker Swarm host in one run."
dateLabel: "2026"
techStack: ["Ansible", "Docker Swarm", "Traefik", "Prometheus", "Grafana", "Loki/Promtail", "Portainer", "OVH Cloud"]
---

- Authored the Ansible roles that turn a bare OVH Cloud VPS into a production-ready Docker Swarm host in one run: Docker installation, Swarm initialization, and templated service stacks.
- Deployed Traefik as the reverse proxy with automatic service routing, Prometheus/Grafana dashboards for metrics, and Loki/Promtail for centralized log aggregation — full observability for every product deployed onto it.
- Hardened the host with templated sshd configuration and fail2ban rules, and managed all secrets with Ansible Vault.
- This platform is the deployment target for the Tikirtin and Forzaq Labs products — one repeatable command replaces manual server setup.
