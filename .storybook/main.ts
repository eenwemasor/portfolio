import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../app/components/**/*.stories.@(ts|js)'],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  viteFinal: async (viteConfig) => {
    viteConfig.plugins = viteConfig.plugins || []
    viteConfig.plugins.unshift(vue())
    viteConfig.plugins.push(tailwindcss())
    viteConfig.resolve = viteConfig.resolve || {}
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias || {}),
      '~': fileURLToPath(new URL('../app', import.meta.url)),
      '@': fileURLToPath(new URL('../app', import.meta.url))
    }
    return viteConfig
  }
}

export default config
