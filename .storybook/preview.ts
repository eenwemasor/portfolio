import type { Preview } from '@storybook/vue3-vite'
import '../app/assets/css/main.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'gn-base',
      values: [
        { name: 'gn-base', value: '#f6f7ee' },
        { name: 'gn-paper', value: '#fefefd' },
        { name: 'white', value: '#ffffff' }
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
