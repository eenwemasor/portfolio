import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ArticleProse from './ArticleProse.vue'

const meta: Meta<typeof ArticleProse> = {
  title: 'Components/ArticleProse',
  component: ArticleProse,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Post body wrapper. The first paragraph gets an automatic drop-cap on its first letter via the `[&>p:first-of-type::first-letter]` rule copied verbatim from the source stylesheet.'
      }
    }
  },
  decorators: [() => ({ template: '<div style="max-width:680px;margin:0 auto"><story /></div>' })]
}

export default meta
type Story = StoryObj<typeof ArticleProse>

export const CranePostExcerpt: Story = {
  render: () => ({
    components: { ArticleProse },
    template: `
      <ArticleProse>
        <p>Introducing <a href="https://github.com/githubnext/crane">Crane</a>, our newest Agentic Workflow, designed to make code migrations fast and sure-footed. To get started right away:</p>
        <p>Migrating existing code to more modern or more performant languages is one of the highest-return projects you can undertake. It's also one where agents are especially capable.</p>
        <h2>Migration as a ratchet</h2>
        <p>The central idea in Crane is simple: migration progress should advance verifiably.</p>
        <p>Every Crane migration defines four things:</p>
        <ol>
          <li><strong>Source</strong>: the language, runtime, and paths being migrated from</li>
          <li><strong>Target</strong>: the language or languages, runtime, and paths being migrated to</li>
          <li><strong>Strategy</strong>: <code>in-place</code>, <code>greenfield</code>, or <code>auto</code></li>
          <li><strong>Verification</strong>: a command that prints a JSON health score</li>
        </ol>
      </ArticleProse>
    `
  })
}
