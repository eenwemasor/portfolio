import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppHeader from './AppHeader.vue'

const meta: Meta<typeof AppHeader> = {
  title: 'Components/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [() => ({ template: '<div style="background:#f6f7ee"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof AppHeader>

export const Default: Story = {
  args: { activeHref: '/posts' }
}

export const HomeActive: Story = {
  args: { activeHref: '/' }
}

export const WithoutSocialLinks: Story = {
  args: { activeHref: '/posts', showSocial: false }
}

export const WithPhotoLogo: Story = {
  args: { activeHref: '/cv', logoSrc: '/images/enwemasorbarnabas.jpeg', logoAlt: 'Enwemasor Barnabas' }
}
