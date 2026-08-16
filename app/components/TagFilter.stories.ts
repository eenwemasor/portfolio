import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import TagFilter from './TagFilter.vue'

const meta: Meta<typeof TagFilter> = {
  title: 'Components/TagFilter',
  component: TagFilter,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="max-width:320px"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof TagFilter>

const tags = ['Kubernetes', 'Mysql', 'Laravel', 'AWS', 'CalVer', 'SemVer', 'CI/CD', 'Git']

export const Default: Story = {
  render: () => ({
    components: { TagFilter },
    setup: () => ({ tags, selected: ref<string[]>([]) }),
    template: '<TagFilter :tags="tags" v-model="selected" />'
  })
}

export const WithSelection: Story = {
  render: () => ({
    components: { TagFilter },
    setup: () => ({ tags, selected: ref<string[]>(['Kubernetes', 'Laravel']) }),
    template: '<TagFilter :tags="tags" v-model="selected" />'
  })
}
