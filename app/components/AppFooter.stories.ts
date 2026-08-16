import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppFooter from './AppFooter.vue'

const meta: Meta<typeof AppFooter> = {
  title: 'Components/AppFooter',
  component: AppFooter,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [() => ({ template: '<div style="background:#f6f7ee"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof AppFooter>

export const Default: Story = {
  args: { year: 2026 }
}
