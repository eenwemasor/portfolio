import type { Meta, StoryObj } from '@storybook/vue3-vite'
import GradientBackground from './GradientBackground.vue'

const meta: Meta<typeof GradientBackground> = {
  title: 'Components/GradientBackground',
  component: GradientBackground,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Best-effort visual recreation of the source site\'s animated hero gradient (a hydrated Astro island backed by minified JS that could not be byte-recovered). Uses only the extracted gn-* brand colors.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof GradientBackground>

export const Default: Story = {
  args: { opacity: 0.7 },
  decorators: [() => ({ template: '<div style="position:relative;height:400px;background:#f6f7ee;overflow:hidden"><story /></div>' })]
}

export const HeroVariant: Story = {
  args: { variant: 'hero', opacity: 1, colors: ['#fdc987', '#60a0b3'] },
  parameters: {
    docs: {
      description: {
        story: 'Full-bleed variant used behind a project detail page title. The real site passes a unique 2-color pair per project via this same component; here we cycle only the extracted gn-* tokens rather than inventing new hex values.'
      }
    }
  },
  decorators: [() => ({ template: '<div style="position:relative;height:500px;background:#f6f7ee;overflow:hidden"><story /></div>' })]
}
