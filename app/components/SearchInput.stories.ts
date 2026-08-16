import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SearchInput from './SearchInput.vue'

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'No form/input precedent exists in the mirror, so this is built from the site\'s own tokens (sand-200 border, rounded-lg, lavender-300 focus ring) rather than any literal source markup.'
      }
    }
  },
  decorators: [() => ({ template: '<div style="max-width:320px"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const Empty: Story = {
  render: () => ({
    components: { SearchInput },
    setup: () => ({ query: ref('') }),
    template: '<SearchInput v-model="query" />'
  })
}

export const WithValue: Story = {
  render: () => ({
    components: { SearchInput },
    setup: () => ({ query: ref('kubernetes') }),
    template: '<SearchInput v-model="query" />'
  })
}
