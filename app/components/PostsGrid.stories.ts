import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PostsGrid from './PostsGrid.vue'
import PostCard from './PostCard.vue'

const meta: Meta<typeof PostsGrid> = {
  title: 'Components/PostsGrid',
  component: PostsGrid,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
}

export default meta
type Story = StoryObj<typeof PostsGrid>

export const Default: Story = {
  render: () => ({
    components: { PostsGrid, PostCard },
    template: `
      <PostsGrid>
        <PostCard
          href="crane/index.html" type="post" date="2026-06-08T00:00:00.000Z" date-label="June 8"
          title="Crane: verified code migration"
          excerpt="Crane is a migration assistant for GitHub repositories that plans, executes, and verifies code migrations in small agentic steps while keeping humans in control."
          :authors="[{ name: 'Russell Horton', avatarUrl: 'https://avatars.githubusercontent.com/u/180956?s=48&v=4' }]"
          hero-image="/images/crane-hero-card.webp" hero-image-alt="A white crane flying across a blue circular background."
        />
        <PostCard
          href="can-agents-be-proud-of-their-work/index.html" type="idea" date="2026-07-01T00:00:00.000Z" date-label="Jul 1"
          title="Can agents be proud of their work?"
          excerpt="In 2022, we got better output from large language models by asking them to show their work."
          :authors="[{ name: 'Alex Gorischek', avatarUrl: 'https://avatars.githubusercontent.com/u/6295280?s=48&v=4' }]"
        />
        <PostCard
          href="agentic-workflows-local-inference/index.html" type="post" date="2026-06-22T00:00:00.000Z" date-label="June 22"
          title="Agentic Workflows Can Use Local Inference"
          excerpt="Agentic Workflows gives you complete control to customize your Actions runtime and choose your AI model."
          :authors="[{ name: 'Russell Horton', avatarUrl: 'https://avatars.githubusercontent.com/u/180956?s=48&v=4' }]"
        />
        <PostCard
          href="chrizbo-agentics-beyond-code/index.html" type="post" date="2026-05-29T00:00:00.000Z" date-label="May 29"
          title="Agentics Beyond Code"
          excerpt="What happens when you give PMs, compliance teams, and leaders their own agents?"
          :authors="[{ name: 'Chris Butler', avatarUrl: 'https://avatars.githubusercontent.com/u/104644?s=48&v=4' }]"
          hero-image="/images/chrizbo-agentics-beyond-code-hero-card.webp" hero-image-alt="A launch readiness flow with insights and checklist triage."
        />
        <PostCard
          href="micro-ace-traffic-lights/index.html" type="idea" date="2026-05-26T00:00:00.000Z" date-label="May 26"
          title="Animating the native traffic lights in Ace"
          :authors="[{ name: 'Terkel Gjervig', avatarUrl: 'https://avatars.githubusercontent.com/u/2302254?s=48&v=4' }]"
          :media="[{ type: 'video', src: 'https://githubnext.com/assets/projects/ace/traffic-lights.webm', alt: 'Native macOS traffic light buttons animating in Ace' }]"
        />
        <PostCard
          href="dsyme-introducing-continuous-ai/index.html" type="link" date="2025-06-19T00:00:00.000Z" date-label="Jun 19, 2025"
          title='Introducing "Continuous AI"'
          excerpt="Just as CI/CD transformed software development by automating integration and deployment, Continuous AI covers the ways in which AI can be used to automate and enhance collaboration workflows."
          :authors="[{ name: 'Don Syme', avatarUrl: 'https://avatars.githubusercontent.com/u/7204669?s=48&v=4' }]"
          link-url="https://githubnext.com/projects/continuous-ai/"
        />
      </PostsGrid>
    `
  })
}
