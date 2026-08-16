import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'
import ProjectStageBadge, { type ProjectStage } from './ProjectStageBadge.vue'

const meta: Meta<typeof ProjectStageBadge> = {
  title: 'Components/ProjectStageBadge',
  component: ProjectStageBadge,
  tags: ['autodocs'],
  argTypes: {
    stage: { control: 'select', options: ['Research Prototype', 'Napkin Sketch', 'WIP', 'Prototype', 'Completed', 'Product', 'Open Sourced'] },
    variant: { control: 'select', options: ['card', 'hero'] }
  },
  parameters: {
    docs: {
      description: {
        component: 'Exact match of githubnext.com/projects/ stage badges. Color-family mapping verified against all 35 real projects in the mirror: green = Research Prototype/Napkin Sketch, blue = Completed/Product/Open Sourced, pink = WIP, purple = Prototype.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof ProjectStageBadge>

export const Card: Story = { args: { stage: 'Product', variant: 'card' } }
export const Hero: Story = { args: { stage: 'Product', variant: 'hero' } }

const allStages: ProjectStage[] = ['Research Prototype', 'Napkin Sketch', 'WIP', 'Prototype', 'Completed', 'Product', 'Open Sourced']

export const AllStagesCard: Story = {
  render: () => h('div', { style: 'display:flex;flex-wrap:wrap;gap:8px' }, allStages.map((stage) => h(ProjectStageBadge, { stage, variant: 'card' })))
}

export const AllStagesHero: Story = {
  render: () => h(
    'div',
    { style: 'display:flex;flex-wrap:wrap;gap:8px;background:#1b1f24;padding:16px;border-radius:8px' },
    allStages.map((stage) => h(ProjectStageBadge, { stage, variant: 'hero' }))
  )
}
