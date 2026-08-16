<script setup lang="ts">
import { ref } from 'vue'
import IconCopy from './icons/IconCopy.vue'
import IconCheck from './icons/IconCheck.vue'

const props = defineProps<{
  code: string
}>()

const copied = ref(false)
let timeout: ReturnType<typeof setTimeout> | undefined

async function copy() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  clearTimeout(timeout)
  timeout = setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="copy-code-wrapper not-prose my-6">
    <div class="copy-code-block flex items-start gap-3 rounded-lg bg-gray-900 px-5 py-4 overflow-x-auto">
      <code class="flex-1 font-mono font-light text-sm leading-normal !text-[#dbd7caee] !bg-transparent !p-0 !border-0 break-all whitespace-normal">{{ code }}</code>
      <button
        type="button"
        class="copy-code-btn relative -top-2 -right-3 flex flex-shrink-0 cursor-pointer items-center justify-center rounded p-2 text-gray-400 transition-all duration-150 ease-out hover:bg-gray-800 hover:text-white hover:shadow-[0_3px_8px_rgba(0,0,0,0.6)]"
        aria-label="Copy to clipboard"
        @click="copy"
      >
        <IconCopy v-if="!copied" />
        <IconCheck v-else />
      </button>
    </div>
  </div>
</template>
