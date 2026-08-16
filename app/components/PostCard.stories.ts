import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PostCard from './PostCard.vue'

const meta: Meta<typeof PostCard> = {
  title: 'Components/PostCard',
  component: PostCard,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="max-width:420px"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof PostCard>

export const PostWithImage: Story = {
  args: {
    href: 'crane/index.html',
    type: 'post',
    date: '2026-06-08T00:00:00.000Z',
    dateLabel: 'June 8',
    title: 'Crane: verified code migration',
    excerpt: 'Crane is a migration assistant for GitHub repositories that plans, executes, and verifies code migrations in small agentic steps while keeping humans in control.',
    authors: [{ name: 'Russell Horton', avatarUrl: 'https://avatars.githubusercontent.com/u/180956?s=48&v=4' }],
    heroImage: '/images/crane-hero-card.webp',
    heroImageAlt: 'A white crane flying across a blue circular background.'
  }
}

export const PostWithoutImage: Story = {
  args: {
    href: 'evergreen/index.html',
    type: 'post',
    date: '2026-07-22T00:00:00.000Z',
    dateLabel: 'July 22',
    title: 'Evergreen: Your PR Gardener',
    excerpt: 'Evergreen helps keep pull requests green and mergeable by fixing CI failures and merge conflicts, and keeping PR branches up to date with the base branch.',
    authors: [{ name: 'Russell Horton', avatarUrl: 'https://avatars.githubusercontent.com/u/180956?s=48&v=4' }]
  }
}

export const LittleIdeaWithVideo: Story = {
  args: {
    href: 'micro-ace-traffic-lights/index.html',
    type: 'idea',
    date: '2026-05-26T00:00:00.000Z',
    dateLabel: 'May 26',
    title: 'Animating the native traffic lights in Ace',
    authors: [{ name: 'Terkel Gjervig', avatarUrl: 'https://avatars.githubusercontent.com/u/2302254?s=48&v=4' }],
    media: [{ type: 'video', src: 'https://githubnext.com/assets/projects/ace/traffic-lights.webm', alt: 'Native macOS traffic light buttons animating in Ace' }]
  }
}

export const LittleIdeaWithoutMedia: Story = {
  args: {
    href: 'can-agents-be-proud-of-their-work/index.html',
    type: 'idea',
    date: '2026-07-01T00:00:00.000Z',
    dateLabel: 'Jul 1',
    title: 'Can agents be proud of their work?',
    excerpt: 'In 2022, we got better output from large language models by asking them to show their work. In 2026, can we get better output from autonomous agents by asking them to be proud of their work?',
    authors: [{ name: 'Alex Gorischek', avatarUrl: 'https://avatars.githubusercontent.com/u/6295280?s=48&v=4' }]
  }
}

export const LinkType: Story = {
  args: {
    href: 'dsyme-introducing-continuous-ai/index.html',
    type: 'link',
    date: '2025-06-19T00:00:00.000Z',
    dateLabel: 'Jun 19, 2025',
    title: 'Introducing "Continuous AI"',
    excerpt: 'Just as CI/CD transformed software development by automating integration and deployment, Continuous AI covers the ways in which AI can be used to automate and enhance collaboration workflows.',
    authors: [{ name: 'Don Syme', avatarUrl: 'https://avatars.githubusercontent.com/u/7204669?s=48&v=4' }],
    linkUrl: 'https://githubnext.com/projects/continuous-ai/'
  }
}

export const ManyAuthors: Story = {
  args: {
    href: 'integrity-filtering/index.html',
    type: 'post',
    date: '2026-05-26T00:00:00.000Z',
    dateLabel: 'May 26',
    title: 'Control what your agentic workflows see with integrity filtering',
    excerpt: 'GitHub Agentic Workflows filter untrusted GitHub content before it reaches the agent. Here’s why integrity filtering matters for repository maintainers, and how we built it.',
    authors: [
      { name: 'Landon Cox', avatarUrl: 'https://avatars.githubusercontent.com/u/15877973?s=48&v=4' },
      { name: 'Peli de Halleux', avatarUrl: 'https://avatars.githubusercontent.com/u/4175913?s=48&v=4' },
      { name: 'Rodrigo Fonseca', avatarUrl: 'https://avatars.githubusercontent.com/u/163015?s=48&v=4' },
      { name: 'Vic Li', avatarUrl: 'https://avatars.githubusercontent.com/u/40274755?s=48&v=4' },
      { name: 'Pedro Henrique Penna', avatarUrl: 'https://avatars.githubusercontent.com/u/4939789?s=48&v=4' }
    ]
  }
}
