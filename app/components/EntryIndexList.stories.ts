import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EntryIndexList, { type IndexEntry } from './EntryIndexList.vue'

const meta: Meta<typeof EntryIndexList> = {
  title: 'Components/EntryIndexList',
  component: EntryIndexList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Numbered index-list rows (tag pills + large title + index number) with a spine rule down the left edge. No mirror precedent — structural layout only, composed from existing tokens.'
      }
    }
  },
  decorators: [() => ({ template: '<div style="max-width:640px"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof EntryIndexList>

const postEntries: IndexEntry[] = [
  { href: '#', title: 'Kubernetes, MySQL, and Laravel', tags: ['Post', 'Kubernetes'], index: '01' },
  { href: '#', title: 'Why I moved to CalVer', tags: ['Idea', 'Versioning'], index: '02' },
  { href: '#', title: 'A CI/CD pipeline for Laravel on Swarm', tags: ['Post', 'CI/CD'], index: '03' }
]

const projectEntries: IndexEntry[] = [
  { href: '#', title: 'Tikirtin', tags: ['Product'], index: '01' },
  { href: '#', title: 'DNSSEC Posture Scanner', tags: ['Product'], index: '02' },
  { href: '#', title: 'Cloud-Native Notification Platform', tags: ['Prototype'], index: '03' }
]

export const Posts: Story = {
  render: () => ({
    components: { EntryIndexList },
    setup: () => ({ entries: postEntries }),
    template: '<EntryIndexList :entries="entries" />'
  })
}

export const Projects: Story = {
  render: () => ({
    components: { EntryIndexList },
    setup: () => ({ entries: projectEntries }),
    template: '<EntryIndexList :entries="entries" />'
  })
}
