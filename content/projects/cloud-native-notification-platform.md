---
title: "Cloud-Native Notification Platform"
summary: "An event-driven, multi-channel notification platform provisioned from bare VMs to a running Kubernetes cluster without manual setup."
whatFor: "Give products a single event-driven pipeline for publishing notifications across multiple channels."
date: "2026-02-01"
dateLabel: "Feb 2026"
stage: "Prototype"
gradientColors: ["#dedfbd", "#b4bdcb"]
authorName: "Enwemasor Barnabas"
authorUrl: "https://github.com/eenwemasor"
authorAvatarUrl: "https://github.com/eenwemasor.png?size=80"
---

- Designed an event-driven, multi-channel notification platform: a TypeScript gateway publishing Avro-encoded events to Kafka with a schema registry, and decoupled consumer services per channel.
- Wrote the Helm chart packaging the full stack and the Ansible playbooks provisioning a multi-node Kubernetes cluster from bare VMs — empty machines to running platform without manual setup.

**Tech stack:** TypeScript, Kafka, Avro, Kubernetes, Helm, Skaffold, Ansible
