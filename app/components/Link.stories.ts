import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Link from './Link.vue'
import IconChevronLeft from './icons/IconChevronLeft.vue'

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'muted', 'primer'] }
  },
  parameters: {
    docs: {
      description: {
        component: 'Text-link variants sourced from patterns already in the mirror: `default` matches the prose/excerpt link rule (`text-lavender-600`, underline on hover), `muted` matches the post-detail back/author links (`text-gray-400` → `text-white`), and `primer` surfaces the extracted `--color-gh-primer-link` token.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {
  args: { href: 'https://github.com/githubnext/crane', variant: 'default' },
  render: (args) => ({ components: { Link }, setup: () => ({ args }), template: '<Link v-bind="args">Crane</Link>' })
}

export const Muted: Story = {
  args: { href: 'https://github.com/mrjf', variant: 'muted' },
  render: (args) => ({ components: { Link }, setup: () => ({ args }), template: '<Link v-bind="args">Russell Horton</Link>' })
}

export const Primer: Story = {
  args: { href: 'https://githubnext.com', variant: 'primer' },
  render: (args) => ({ components: { Link }, setup: () => ({ args }), template: '<Link v-bind="args">githubnext.com</Link>' })
}

export const WithLeadingIcon: Story = {
  args: { href: '../index.html', variant: 'muted' },
  render: (args) => ({
    components: { Link, IconChevronLeft },
    setup: () => ({ args }),
    template: '<Link v-bind="args"><template #icon-left><IconChevronLeft /></template>Back to Posts</Link>'
  })
}
