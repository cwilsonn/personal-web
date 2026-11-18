<script setup lang="ts">
/**
 * One tile in a bento grid. Owns the surface (edge, fill, shadow) so tiles can't drift
 * from the theme; callers only pass layout (spans) through `class`.
 */
const props = withDefaults(defineProps<{
  tone?: 'paper' | 'primary' | 'signal' | 'ink'
  /** Larger shadow for the one tile that leads the grid. */
  lead?: boolean
  /** Vertical rhythm inside the tile. A prop, not a class, so it can't collide with the base gap. */
  space?: 'md' | 'lg' | 'xl'
  as?: string
}>(), {
  tone: 'paper',
  lead: false,
  space: 'md',
  as: 'article'
})

const tones = {
  paper: 'bg-paper text-default',
  primary: 'bg-primary text-inverted',
  signal: 'bg-secondary text-black',
  ink: 'bg-inverted text-inverted'
} as const

const spaces = { md: 'gap-4', lg: 'gap-5', xl: 'gap-8' } as const
</script>

<template>
  <component
    :is="props.as"
    :class="[
      'flex flex-col border-2 border-ink p-6',
      spaces[props.space],
      tones[props.tone],
      props.lead ? 'shadow-brutal' : 'shadow-brutal-sm'
    ]"
  >
    <slot />
  </component>
</template>
