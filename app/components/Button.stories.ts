import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'
import Button from './Button.vue'
import IconRss from './icons/IconRss.vue'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] }
  },
  parameters: {
    docs: {
      description: {
        component: 'No standalone "button" component existed in the mirror, so these variants are modeled on real button-like patterns found there: `secondary` reproduces the footer\'s RSS subscribe pill exactly, `ghost` reproduces the header\'s mobile nav-toggle button, and `primary` is a solid fill using the existing gn-ink brand token.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { variant: 'primary' }, render: (args) => ({ components: { Button }, setup: () => ({ args }), template: '<Button v-bind="args">Get started</Button>' }) }
export const Secondary: Story = { args: { variant: 'secondary' }, render: (args) => ({ components: { Button }, setup: () => ({ args }), template: '<Button v-bind="args">Subscribe via RSS</Button>' }) }
export const Ghost: Story = { args: { variant: 'ghost' }, render: (args) => ({ components: { Button }, setup: () => ({ args }), template: '<Button v-bind="args">Cancel</Button>' }) }
export const Disabled: Story = { args: { variant: 'primary', disabled: true }, render: (args) => ({ components: { Button }, setup: () => ({ args }), template: '<Button v-bind="args">Unavailable</Button>' }) }

export const WithIcon: Story = {
  args: { variant: 'secondary' },
  render: (args) => ({
    components: { Button, IconRss },
    setup: () => ({ args }),
    template: '<Button v-bind="args"><template #icon-left><IconRss class="w-4 h-4 fill-current text-gloss-gray-300" /></template>Subscribe via RSS</Button>'
  })
}

export const AsLink: Story = {
  args: { variant: 'primary', href: 'https://githubnext.com' },
  render: (args) => ({ components: { Button }, setup: () => ({ args }), template: '<Button v-bind="args">Visit GitHub Next</Button>' })
}

export const AllSizes: Story = {
  render: () => h('div', { style: 'display:flex;align-items:center;gap:12px' }, [
    h(Button, { variant: 'primary', size: 'sm' }, () => 'Small'),
    h(Button, { variant: 'primary', size: 'md' }, () => 'Medium'),
    h(Button, { variant: 'primary', size: 'lg' }, () => 'Large')
  ])
}
