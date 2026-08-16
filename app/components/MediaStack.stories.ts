import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MediaStack from './MediaStack.vue'

const meta: Meta<typeof MediaStack> = {
  title: 'Components/MediaStack',
  component: MediaStack,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Image/video carousel used inside "Little ideas" post cards. Single-item usage (no dots/arrows) is the exact markup found in the mirror; the multi-item carousel state was reconstructed from the site\'s own `data-media-stack` JS logic, since no live example in the mirror had 2+ slides.'
      }
    }
  },
  decorators: [() => ({ template: '<div style="max-width:360px"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof MediaStack>

export const SingleVideo: Story = {
  args: {
    items: [
      { type: 'video', src: 'https://githubnext.com/assets/projects/ace/traffic-lights.webm', alt: 'Native macOS traffic light buttons animating in Ace' }
    ]
  }
}

export const MultipleImagesWithDots: Story = {
  args: {
    items: [
      { type: 'image', src: '/images/crane-hero-card.webp', alt: 'A white crane flying across a blue circular background.' },
      { type: 'image', src: '/images/chrizbo-agentics-beyond-code-hero-card.webp', alt: 'A launch readiness flow with insights and checklist triage.' },
      { type: 'image', src: '/images/agents-are-power-tools-card.webp', alt: 'A three-panel comic about tooling and industrial scale.' }
    ]
  }
}
