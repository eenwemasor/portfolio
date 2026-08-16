<script setup lang="ts">
/**
 * Button variants derived from real button-like patterns already present
 * in the mirror: `secondary` matches the footer RSS pill exactly,
 * `ghost` matches the header nav-toggle button, and `primary` originally
 * reused the gn-ink brand token as a solid dark fill. For the dark theme
 * flip, primary is inverted to a solid white pill with black text — the
 * same "solid emphasis" role gn-ink played against a white page, now
 * played by --color-white against the black one — composed from existing
 * tokens only, per tokens.css's dark-theme override note.
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
  primary: 'bg-white text-black shadow-sm hover:bg-gray-200',
  secondary: 'border border-gloss-gray-800 bg-bg-base text-gloss-gray-400 shadow-sm shadow-black/5 hover:border-white/30 hover:bg-white/10 hover:text-white',
  ghost: 'text-gray-400 hover:text-white hover:bg-white/10'
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? undefined : 'button'"
    :disabled="!href && disabled"
    :aria-disabled="disabled || undefined"
    class="inline-flex items-center justify-center rounded-full font-medium no-underline transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gloss-gray-200 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none"
    :class="[sizeClasses[size], variantClasses[variant]]"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>
