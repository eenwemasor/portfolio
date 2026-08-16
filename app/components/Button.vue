<script setup lang="ts">
/**
 * Button variants derived from real button-like patterns already present
 * in the mirror: `secondary` matches the footer RSS pill exactly,
 * `ghost` matches the header nav-toggle button, and `primary` reuses the
 * gn-ink brand token as a solid fill (that token exists in the source
 * palette, just not previously used as a button background).
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

withDefaults(defineProps<{
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  disabled?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  href: undefined,
  disabled: false
})

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-3 text-base gap-2'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-gn-ink text-white shadow-sm hover:bg-black',
  secondary: 'border border-sand-100 bg-bg-base text-gloss-gray-500 shadow-sm shadow-black/5 hover:border-white/80 hover:bg-white/60 hover:text-gloss-gray-700',
  ghost: 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? undefined : 'button'"
    :disabled="!href && disabled"
    :aria-disabled="disabled || undefined"
    class="inline-flex items-center justify-center rounded-full font-medium no-underline transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gloss-gray-200 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    :class="[sizeClasses[size], variantClasses[variant]]"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>
