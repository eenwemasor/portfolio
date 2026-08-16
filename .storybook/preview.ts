import type { Preview } from '@storybook/vue3-vite'
import '../app/assets/css/main.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'gn-base',
      values: [
        { name: 'gn-base', value: '#000000' },
        { name: 'gloss-gray-900', value: '#1b1f24' },
        { name: 'black', value: '#000000' }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
