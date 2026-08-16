import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HomeIndexSection from './HomeIndexSection.vue'
import type { IndexEntry } from './EntryIndexList.vue'

const meta: Meta<typeof HomeIndexSection> = {
  title: 'Components/HomeIndexSection',
  component: HomeIndexSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Homepage teaser section: heading + EntryIndexList + a "view all" CTA button. Used identically for the Posts and Projects sections on the homepage.'
      }
    }
  },
  decorators: [() => ({ template: '<div style="max-width:640px"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof HomeIndexSection>

const entries: IndexEntry[] = [
  { href: '#', title: 'Tikirtin', tags: ['Product'], index: '01' },
  { href: '#', title: 'DNSSEC Posture Scanner', tags: ['Product'], index: '02' },
  { href: '#', title: 'Cloud-Native Notification Platform', tags: ['Prototype'], index: '03' }
]

export const Default: Story = {
  render: () => ({
    components: { HomeIndexSection },
    setup: () => ({ entries }),
    template: '<HomeIndexSection heading="Projects" :entries="entries" view-all-href="#" view-all-label="View all projects" />'
  })
}
