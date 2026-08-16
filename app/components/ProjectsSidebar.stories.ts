import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import ProjectsSidebar from './ProjectsSidebar.vue'

const meta: Meta<typeof ProjectsSidebar> = {
  title: 'Components/ProjectsSidebar',
  component: ProjectsSidebar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Same filter-sidebar container as PostsSidebar (search + a single-select list), reused for the /projects listing with a Stage filter in place of Category + Tags.'
      }
    }
  },
  decorators: [() => ({ template: '<div style="max-width:280px"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof ProjectsSidebar>

const stages = [
  { label: 'Product', count: 3 },
  { label: 'Prototype', count: 1 },
  { label: 'Completed', count: 1 }
]

export const Default: Story = {
  render: () => ({
    components: { ProjectsSidebar },
    setup: () => ({ stages, search: ref(''), stage: ref<string | null>(null) }),
    template: `
      <ProjectsSidebar
        :stages="stages"
        v-model:search="search"
        v-model:stage="stage"
      />
    `
  })
}

export const WithActiveFilters: Story = {
  render: () => ({
    components: { ProjectsSidebar },
    setup: () => ({ stages, search: ref('scanner'), stage: ref<string | null>('Product') }),
    template: `
      <ProjectsSidebar
        :stages="stages"
        v-model:search="search"
        v-model:stage="stage"
      />
    `
  })
}
