import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CodeBlock from './CodeBlock.vue'

const meta: Meta<typeof CodeBlock> = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="max-width:600px"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof CodeBlock>

export const InstallCommand: Story = {
  args: {
    code: 'Install Crane using https://github.com/githubnext/crane/blob/main/install.md'
  }
}
