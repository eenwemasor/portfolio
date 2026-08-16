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

- Designed an event-driven notification platform: a TypeScript gateway that validates a request, encodes it as Avro against a schema registry, and publishes it to Kafka for a decoupled consumer to pick up — email is built and working end to end today, with push and SMS designed as the same pattern repeated per channel, not yet built.
- Wrote the Helm chart packaging the full stack and the Ansible playbooks provisioning a multi-node Kubernetes cluster from bare VMs — empty machines to running platform without manual setup.

**Tech stack:** TypeScript, Kafka, Avro, Kubernetes, Helm, Skaffold, Ansible

## Requirements

- Accept a notification request and return immediately (`202 Accepted`) without ever blocking the caller on actual delivery — the API's only job is to validate and enqueue.
- Decouple the producer from the deliverer entirely through a message broker, so a slow or down email provider queues up messages instead of taking the caller down with it.
- Encode every event against a shared Avro schema, validated by a schema registry, so producer and consumer can evolve independently without silently drifting out of sync on message shape.
- Deduplicate on a per-message idempotency key, since Kafka's at-least-once delivery means the same message can legitimately be processed more than once.
- Package the whole stack — broker, schema registry, gateway, channel workers, a mail-testing UI — as one Helm chart deployable to any Kubernetes cluster.
- Turn a set of empty cloud VMs into a working Kubernetes cluster with a single Ansible run: no manual `kubeadm init`, no hand-edited kubeconfig.

## System architecture

![Cloud-native notification platform architecture — the gateway-to-Kafka-to-email-worker request flow, the same stack running under Docker Compose and under Kubernetes, and the Ansible bootstrap that builds the cluster from empty machines](/images/projects/cloud-native-notification-platform-architecture.svg)

The request path is deliberately small: `Gateway` validates with Zod, encodes with the schema registry client, and publishes to the `email.notification` topic (3 partitions, replication factor 1 — this is a learning/portfolio cluster, not a production HA one). `email-service` is a plain `kafkajs` consumer in its own consumer group; today it deduplicates with an in-memory `Set`, which is honest about where this project actually is — that dedup doesn't survive a pod restart yet, and the reference design's Redis-backed idempotency window is documented as the next step, not shipped. A second topic, `notifications.status`, already exists for delivery-status events but has no consumer wired up yet.

The same six services run two ways: `docker compose up` for local iteration, or the Helm chart (driven by `skaffold.yaml`) onto a real Kubernetes cluster. That cluster isn't assumed to exist — the `infrastructure/ansible` playbook builds one from scratch on Multipass VMs: a local container registry, then VM provisioning, then `containerd` + `kubeadm` on every node in parallel, then control-plane init, then workers joining via a token captured mid-run, then a merged kubeconfig so `kubectl` just works from the host afterward.

## Screenshots

No public deployment exists for this project — it's a local/prototype-stage system run via Docker Compose or a local Kubernetes cluster, not a hosted product with a URL to screenshot. The diagram above reflects what's actually implemented and running today, not an aspirational design.

## Tools & technology

- **Application layer:** TypeScript, Node.js 20, Express, Zod (request validation), KafkaJS, `@kafkajs/confluent-schema-registry`
- **Messaging:** Apache Kafka (KRaft mode, no Zookeeper), Confluent Schema Registry 7.6.0, Avro
- **Local dev tooling:** kafbat Kafka UI, MailHog / Mailpit (fake SMTP)
- **Containerization & orchestration:** Docker, Kubernetes, Helm, Skaffold
- **Cluster provisioning:** Ansible, Multipass, containerd, kubeadm

## Links

- No public deployment — this is a local-only prototype; see the architecture diagram above for what's built and running.

## Reasoning

The build follows a deliberately incremental plan rather than trying to stand up every channel and every resilience mechanism at once: prove the async pattern with one channel end to end first, then add fan-out and a second channel, then move to Kubernetes and add real resilience (retries, DLQs, idempotency), then autoscaling and observability, then the remaining channels. What's actually built — gateway, schema registry, Kafka, one working email consumer, both a Compose and a Helm/Kubernetes deployment path, and a from-scratch Ansible cluster bootstrap — corresponds to finishing that first phase properly rather than half-finishing all five. Kafka over a managed queue (SNS/SQS) was the deliberate choice for a portfolio project specifically because self-hosting the broker teaches the internals that a managed service would hide.
