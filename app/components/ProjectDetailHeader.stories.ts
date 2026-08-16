import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ProjectDetailHeader from './ProjectDetailHeader.vue'
import GradientBackground from './GradientBackground.vue'

const meta: Meta<typeof ProjectDetailHeader> = {
  title: 'Components/ProjectDetailHeader',
  component: ProjectDetailHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Exact match of the project detail hero on githubnext.com/projects/. Composed with GradientBackground(variant="hero") behind it, matching how the real page nests them (gradient + header + this hero content, all inside one overflow-hidden wrapper).'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof ProjectDetailHeader>

const contributors = [
  { name: 'Enwemasor Barnabas', avatarUrl: 'https://github.com/eenwemasor.png?size=80', url: 'https://github.com/eenwemasor' }
]

export const Default: Story = {
  render: () => ({
    components: { ProjectDetailHeader, GradientBackground },
    setup: () => ({ contributors }),
    template: `
      <div style="position:relative;min-height:90vh;background:#f6f7ee;overflow:hidden">
        <GradientBackground variant="hero" :colors="['#c4d7d9', '#fdc987']" />
        <ProjectDetailHeader
          title="Tikirtin — Event Ticketing Platform"
          subtitle="A complete event-ticketing product, sole-built and operated for two years."
          what-for="Give organisers a complete, self-serve platform to create events, sell tickets, and get paid automatically every week."
          stage="Product"
          date="2024-01-01"
          date-label="Jan 2024"
          share-url="https://enwemasorbarnabas.com/projects/tikirtin"
          :contributors="contributors"
        />
      </div>
    `
  })
}
