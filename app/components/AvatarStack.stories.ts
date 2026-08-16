import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AvatarStack from './AvatarStack.vue'

const meta: Meta<typeof AvatarStack> = {
  title: 'Components/AvatarStack',
  component: AvatarStack,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof AvatarStack>

export const SingleAuthor: Story = {
  args: {
    authors: [
      { name: 'Russell Horton', avatarUrl: 'https://avatars.githubusercontent.com/u/180956?s=48&v=4' }
    ]
  }
}

export const MultipleAuthors: Story = {
  args: {
    authors: [
      { name: 'Landon Cox', avatarUrl: 'https://avatars.githubusercontent.com/u/15877973?s=48&v=4' },
      { name: 'Peli de Halleux', avatarUrl: 'https://avatars.githubusercontent.com/u/4175913?s=48&v=4' },
      { name: 'Rodrigo Fonseca', avatarUrl: 'https://avatars.githubusercontent.com/u/163015?s=48&v=4' },
      { name: 'Vic Li', avatarUrl: 'https://avatars.githubusercontent.com/u/40274755?s=48&v=4' },
      { name: 'Pedro Henrique Penna', avatarUrl: 'https://avatars.githubusercontent.com/u/4939789?s=48&v=4' }
    ]
  }
}
