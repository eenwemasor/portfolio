import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'
import LogoMark from './LogoMark.vue'
import IconChevronDown from './IconChevronDown.vue'
import IconChevronLeft from './IconChevronLeft.vue'
import IconHome from './IconHome.vue'
import IconPost from './IconPost.vue'
import IconLittleIdea from './IconLittleIdea.vue'
import IconLink from './IconLink.vue'
import IconCopy from './IconCopy.vue'
import IconCheck from './IconCheck.vue'
import IconRss from './IconRss.vue'
import IconMastodon from './IconMastodon.vue'
import IconBluesky from './IconBluesky.vue'
import IconX from './IconX.vue'
import IconDiscord from './IconDiscord.vue'
import IconGitHub from './IconGitHub.vue'
import IconLinkedIn from './IconLinkedIn.vue'
import IconMail from './IconMail.vue'
import IconSearch from './IconSearch.vue'
import IconClose from './IconClose.vue'
import IconGlobe from './IconGlobe.vue'

const icons = {
  LogoMark,
  IconChevronDown,
  IconChevronLeft,
  IconHome,
  IconPost,
  IconLittleIdea,
  IconLink,
  IconCopy,
  IconCheck,
  IconRss,
  IconMastodon,
  IconBluesky,
  IconX,
  IconDiscord,
  IconGitHub,
  IconLinkedIn,
  IconMail,
  IconSearch,
  IconClose,
  IconGlobe
}

const meta: Meta = {
  title: 'Icons/Gallery',
  parameters: {
    docs: {
      description: {
        component: 'Icons extracted verbatim (identical path data) from the GitHub Next posts mirror, plus GitHub/LinkedIn/X added as standard brand-mark icons in the same single-color, fill-current style (X was already present in the mirror\'s footer).'
      }
    }
  }
}

export default meta
type Story = StoryObj

export const AllIcons: Story = {
  render: () => h(
    'div',
    { style: 'display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:1.5rem;color:#303026;font-family:"Mona Sans",sans-serif' },
    Object.entries(icons).map(([name, component]) =>
      h('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:0.5rem;text-align:center' }, [
        h('div', { style: 'width:32px;height:32px;display:flex;align-items:center;justify-content:center' }, [h(component)]),
        h('span', { style: 'font-size:11px;font-family:monospace;color:#75766d' }, name)
      ])
    )
  )
}
