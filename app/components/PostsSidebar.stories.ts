import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import PostsSidebar from './PostsSidebar.vue'

const meta: Meta<typeof PostsSidebar> = {
  title: 'Components/PostsSidebar',
  component: PostsSidebar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Composes SearchInput, CategoryFilter, and TagFilter into a divided card matching PostCard\'s exact container styling (bg-black, border-gloss-gray-800, rounded-xl, shadow-sm) with section dividers matching the "Related:" footer border pattern.'
      }
    }
  },
  decorators: [() => ({ template: '<div style="max-width:280px"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof PostsSidebar>

const categories = [
  { label: 'Kubernetes', count: 1 },
  { label: 'Laravel', count: 1 },
  { label: 'Versioning', count: 1 },
  { label: 'CI/CD', count: 1 }
]

const allTags = ['Kubernetes', 'Mysql', 'Laravel', 'AWS', 'CalVer', 'SemVer', 'CI/CD', 'Git']

export const Default: Story = {
  render: () => ({
    components: { PostsSidebar },
    setup: () => ({
      categories,
      allTags,
      search: ref(''),
      category: ref<string | null>(null),
      tags: ref<string[]>([])
    }),
    template: `
      <PostsSidebar
        :categories="categories"
        :all-tags="allTags"
        v-model:search="search"
        v-model:category="category"
        v-model:tags="tags"
      />
    `
  })
}

export const WithActiveFilters: Story = {
  render: () => ({
    components: { PostsSidebar },
    setup: () => ({
      categories,
      allTags,
      search: ref('kubernetes'),
      category: ref<string | null>('Kubernetes'),
      tags: ref<string[]>(['Mysql'])
    }),
    template: `
      <PostsSidebar
        :categories="categories"
        :all-tags="allTags"
        v-model:search="search"
        v-model:category="category"
        v-model:tags="tags"
      />
    `
  })
}
