import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageHero from './PageHero.vue'

const meta: Meta<typeof PageHero> = {
  title: 'Components/PageHero',
  component: PageHero,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="background:#f6f7ee"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof PageHero>

export const Posts: Story = {
  render: () => ({ components: { PageHero }, template: '<PageHero>Posts</PageHero>' })
}
