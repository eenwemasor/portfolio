import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PostDetailHeader from './PostDetailHeader.vue'

const meta: Meta<typeof PostDetailHeader> = {
  title: 'Components/PostDetailHeader',
  component: PostDetailHeader,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof PostDetailHeader>

export const Post: Story = {
  args: {
    backHref: '../index.html',
    title: 'Crane: verified code migration',
    subtitle: 'Crane is a migration assistant for GitHub repositories that plans, executes, and verifies code migrations in small agentic steps while keeping humans in control.',
    authorName: 'Russell Horton',
    authorUrl: 'https://github.com/mrjf',
    authorAvatarUrl: 'https://avatars.githubusercontent.com/u/180956?s=48&v=4',
    date: '2026-06-08T00:00:00.000Z',
    dateLabel: 'Jun 8, 2026'
  }
}

export const LittleIdeaWithBadge: Story = {
  args: {
    backHref: '../index.html',
    type: 'idea',
    title: 'Animating the native traffic lights in Ace',
    authorName: 'Terkel Gjervig',
    authorUrl: 'https://github.com/terkelg',
    authorAvatarUrl: 'https://avatars.githubusercontent.com/u/2302254?s=48&v=4',
    date: '2026-05-26T00:00:00.000Z',
    dateLabel: 'May 26, 2026'
  }
}
