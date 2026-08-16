import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TagPill from './TagPill.vue'

const meta: Meta<typeof TagPill> = {
  title: 'Components/TagPill',
  component: TagPill,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Reuses the site\'s real "Related:" footer-link pill exactly (rounded-md, lavender-500/10 fill, font-mono text-[13px]) as a toggleable filter chip.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof TagPill>

export const Inactive: Story = {
  render: (args) => ({ components: { TagPill }, setup: () => ({ args }), template: '<TagPill v-bind="args">Kubernetes</TagPill>' })
}

export const Active: Story = {
  args: { active: true },
  render: (args) => ({ components: { TagPill }, setup: () => ({ args }), template: '<TagPill v-bind="args">Kubernetes</TagPill>' })
}
