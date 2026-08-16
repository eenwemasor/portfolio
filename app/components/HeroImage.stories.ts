import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HeroImage from './HeroImage.vue'

const meta: Meta<typeof HeroImage> = {
  title: 'Components/HeroImage',
  component: HeroImage,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="max-width:720px"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof HeroImage>

export const Default: Story = {
  args: {
    src: '/images/crane-hero-full.webp',
    alt: 'A white crane flying across a blue circular background.'
  }
}
