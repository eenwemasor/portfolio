import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import CategoryFilter from './CategoryFilter.vue'

const meta: Meta<typeof CategoryFilter> = {
  title: 'Components/CategoryFilter',
  component: CategoryFilter,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Single-select category list. Active/inactive item styling reuses AppHeader\'s mobile nav-sheet link classes exactly.'
      }
    }
  },
  decorators: [() => ({ template: '<div style="max-width:260px"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof CategoryFilter>

const categories = [
  { label: 'Kubernetes', count: 1 },
  { label: 'Laravel', count: 1 },
  { label: 'Versioning', count: 1 },
  { label: 'CI/CD', count: 1 }
]

export const Default: Story = {
  render: () => ({
    components: { CategoryFilter },
    setup: () => ({ categories, active: ref<string | null>(null) }),
    template: '<CategoryFilter :categories="categories" v-model="active" />'
  })
}

export const WithSelection: Story = {
  render: () => ({
    components: { CategoryFilter },
    setup: () => ({ categories, active: ref<string | null>('Kubernetes') }),
    template: '<CategoryFilter :categories="categories" v-model="active" />'
  })
}
