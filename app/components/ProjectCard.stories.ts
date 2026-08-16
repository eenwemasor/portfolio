import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ProjectCard from './ProjectCard.vue'

const meta: Meta<typeof ProjectCard> = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="max-width:420px"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof ProjectCard>

export const Default: Story = {
  args: {
    title: 'Infrastructure-as-Code Platform',
    summary: 'Ansible roles that turn a bare OVH Cloud VPS into a production-ready, fully observable Docker Swarm host in one run.',
    dateLabel: '2026',
    techStack: ['Ansible', 'Docker Swarm', 'Traefik', 'Prometheus', 'Grafana', 'Loki/Promtail', 'Portainer', 'OVH Cloud']
  }
}

export const ShortTechStack: Story = {
  args: {
    title: 'Cloud-Native Notification Platform',
    summary: 'An event-driven, multi-channel notification platform provisioned from bare VMs to a running Kubernetes cluster without manual setup.',
    dateLabel: '2026',
    techStack: ['TypeScript', 'Kafka', 'Avro', 'Kubernetes', 'Helm']
  }
}
