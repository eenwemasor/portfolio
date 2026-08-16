---
title: "Cloud-Native Notification Platform"
summary: "An event-driven, multi-channel notification platform provisioned from bare VMs to a running Kubernetes cluster without manual setup."
dateLabel: "2026"
techStack: ["TypeScript", "Kafka", "Avro", "Kubernetes", "Helm", "Skaffold", "Ansible"]
---

- Designed an event-driven, multi-channel notification platform: a TypeScript gateway publishing Avro-encoded events to Kafka with a schema registry, and decoupled consumer services per channel.
- Wrote the Helm chart packaging the full stack and the Ansible playbooks provisioning a multi-node Kubernetes cluster from bare VMs — empty machines to running platform without manual setup.
