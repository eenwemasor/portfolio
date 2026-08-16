import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ProjectShareLinks from './ProjectShareLinks.vue'

const meta: Meta<typeof ProjectShareLinks> = {
  title: 'Components/ProjectShareLinks',
  component: ProjectShareLinks,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ProjectShareLinks>

export const Default: Story = {
  args: {
    url: 'https://enwemasorbarnabas.com/projects/tikirtin',
    title: 'Tikirtin — Event Ticketing Platform'
  }
}
