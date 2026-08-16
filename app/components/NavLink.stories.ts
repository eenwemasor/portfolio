import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NavLink from './NavLink.vue'

const meta: Meta<typeof NavLink> = {
  title: 'Components/NavLink',
  component: NavLink,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="background:rgba(255,255,255,.5);display:inline-flex;border-radius:9999px;padding:4px;backdrop-filter:blur(24px)"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof NavLink>

export const Default: Story = {
  args: { href: '/projects/', active: false },
  render: (args) => ({
    components: { NavLink },
    setup: () => ({ args }),
    template: '<NavLink v-bind="args">Projects</NavLink>'
  })
}

export const Active: Story = {
  args: { href: '/posts/', active: true },
  render: (args) => ({
    components: { NavLink },
    setup: () => ({ args }),
    template: '<NavLink v-bind="args">Posts</NavLink>'
  })
}
