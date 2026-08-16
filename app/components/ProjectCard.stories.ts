import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ProjectCard from './ProjectCard.vue'

const meta: Meta<typeof ProjectCard> = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Exact match of the project card on githubnext.com/projects/ — replaces the earlier invented card design. Whole card is a single link, full-bleed background thumbnail, stage badge + date row, bottom-pinned title/summary/avatar-stack.'
      }
    }
  },
  decorators: [() => ({ template: '<div style="max-width:360px"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof ProjectCard>

export const Product: Story = {
  args: {
    href: '/projects/tikirtin',
    title: 'Tikirtin — Event Ticketing Platform',
    summary: 'A complete event-ticketing product sole-built and operated for two years, with a fully automated weekly payout engine.',
    date: '2024-01-01',
    dateLabel: 'Jan 2024',
    stage: 'Product',
    authors: [{ name: 'Enwemasor Barnabas', avatarUrl: 'https://github.com/eenwemasor.png?size=48' }]
  }
}

export const Completed: Story = {
  args: {
    href: '/projects/infrastructure-as-code-platform',
    title: 'Infrastructure-as-Code Platform',
    summary: 'Ansible roles that turn a bare OVH Cloud VPS into a production-ready, fully observable Docker Swarm host in one run.',
    date: '2026-01-01',
    dateLabel: 'Jan 2026',
    stage: 'Completed',
    authors: [{ name: 'Enwemasor Barnabas', avatarUrl: 'https://github.com/eenwemasor.png?size=48' }]
  }
}

export const Prototype: Story = {
  args: {
    href: '/projects/cloud-native-notification-platform',
    title: 'Cloud-Native Notification Platform',
    summary: 'An event-driven, multi-channel notification platform provisioned from bare VMs to a running Kubernetes cluster without manual setup.',
    date: '2026-02-01',
    dateLabel: 'Feb 2026',
    stage: 'Prototype',
    authors: [{ name: 'Enwemasor Barnabas', avatarUrl: 'https://github.com/eenwemasor.png?size=48' }]
  }
}

export const WithoutThumbnail: Story = {
  args: {
    href: '/projects/dnssec-posture-scanner',
    title: 'DNSSEC Posture Scanner',
    summary: 'A solo-built domain-security product scanning roughly 4,000 domains for DNSSEC/SPF/DKIM/DMARC posture on a recurring schedule.',
    date: '2025-06-01',
    dateLabel: 'Jun 2025',
    stage: 'Product',
    authors: [{ name: 'Enwemasor Barnabas', avatarUrl: 'https://github.com/eenwemasor.png?size=48' }]
  }
}
