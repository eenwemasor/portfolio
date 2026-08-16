import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import InfinitePagination from './InfinitePagination.vue'

const meta: Meta<typeof InfinitePagination> = {
  title: 'Components/InfinitePagination',
  component: InfinitePagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'No pagination existed in the mirror (the posts index renders all posts on one page), so this is built from already-extracted tokens only: the card meta-text style for the loading label, the footer\'s uppercase copyright style for the end-of-list message, and the new Button component for the manual "Load more" fallback. An IntersectionObserver on the sentinel div auto-triggers `load-more` when scrolled into view.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof InfinitePagination>

export const HasMore: Story = { args: { hasMore: true, loading: false } }
export const Loading: Story = { args: { hasMore: true, loading: true } }
export const EndOfList: Story = { args: { hasMore: false, loading: false } }
export const ErrorState: Story = { args: { hasMore: true, loading: false, error: 'Couldn’t load more posts. Check your connection and try again.' } }

export const InteractiveDemo: Story = {
  render: () => ({
    components: { InfinitePagination },
    setup: () => {
      const loading = ref(false)
      const hasMore = ref(true)
      const page = ref(1)
      const onLoadMore = () => {
        loading.value = true
        setTimeout(() => {
          loading.value = false
          page.value += 1
          if (page.value > 3) hasMore.value = false
        }, 800)
      }
      return { loading, hasMore, onLoadMore }
    },
    template: '<InfinitePagination :loading="loading" :has-more="hasMore" @load-more="onLoadMore" />'
  })
}
