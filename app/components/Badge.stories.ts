import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Badge from './Badge.vue'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['post', 'idea', 'link'] }
  }
}

export default meta
type Story = StoryObj<typeof Badge>

export const Post: Story = { args: { type: 'post' } }
export const LittleIdea: Story = { args: { type: 'idea' } }
export const Link: Story = { args: { type: 'link' } }
