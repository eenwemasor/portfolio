<script setup lang="ts">
/**
 * Best-effort visual recreation of the source site's animated gradient
 * background (an Astro-hydrated island backed by minified JS that isn't
 * cleanly recoverable). Two variants match the two real usages found in
 * the mirror: `strip` (top-of-page fade behind the posts/projects listing
 * header, uses the default gn-* palette) and `hero` (full-bleed, no fade
 * mask, used behind a project detail page's title — the real site passes
 * a unique 2-color pair per project via the same underlying component).
 */
import { onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  opacity?: number
  colors?: string[]
  variant?: 'strip' | 'hero'
}>(), {
  opacity: 0.7,
  colors: undefined,
  variant: 'strip'
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let frame = 0
let raf = 0

const defaultBlobColors = ['#fdc987', '#ce6d53', '#60a0b3', '#c4d7d9', '#dedfbd']

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const { width, height } = canvas
  ctx.clearRect(0, 0, width, height)

  const palette = props.colors && props.colors.length > 0 ? props.colors : defaultBlobColors

  palette.forEach((color, i) => {
    const t = frame / 240 + i
    const x = width * (0.15 + 0.7 * ((Math.sin(t * 0.6 + i) + 1) / 2))
    const y = height * (0.1 + 0.5 * ((Math.cos(t * 0.4 + i * 1.3) + 1) / 2))
    const radius = Math.min(width, height) * (props.variant === 'hero' ? 0.55 : 0.35)

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, `${color}aa`)
    gradient.addColorStop(1, `${color}00`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  })

  frame += 1
  raf = requestAnimationFrame(draw)
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas || !canvas.parentElement) return
  canvas.width = canvas.parentElement.clientWidth
  canvas.height = canvas.parentElement.clientHeight
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  raf = requestAnimationFrame(draw)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div
    v-if="variant === 'hero'"
    class="absolute inset-0 z-0"
    aria-hidden="true"
  >
    <canvas ref="canvasRef" :style="{ opacity }" class="w-full h-full" />
  </div>
  <div
    v-else
    class="pointer-events-none absolute top-0 left-0 right-0 h-[400px] z-0"
    style="mask-image: linear-gradient(to bottom, black 0px, black 50px, transparent 800px); -webkit-mask-image: linear-gradient(to bottom, black 0px, black 50px, transparent 800px);"
    aria-hidden="true"
  >
    <div style="width:100%;height:100%" class="fade-in">
      <canvas ref="canvasRef" :style="{ opacity }" class="w-full h-full" />
    </div>
  </div>
</template>
