<script setup lang="ts">
/**
 * Easter egg: after a visitor has spent a while on the page with the band in view, something
 * Seattle crosses the marquee band, taking turns about once a minute.
 *
 * Decorative and hidden from assistive tech. Never runs under reduced motion (or without JS),
 * waits while the tab is hidden or the band is off screen, and freezes with the band's Pause.
 */
const props = withDefaults(defineProps<{
  paused?: boolean
  /** Seconds of attention before the first crossing. */
  firstAfter?: number
  /** Seconds between crossings after that. */
  every?: number
}>(), {
  paused: false,
  firstAfter: 20,
  every: 60
})

const travelers = [
  { emoji: '⛴️', caption: 'West Seattle Water Taxi', flip: true },
  { emoji: '🌭', caption: 'Seattle Dog, cream cheese', flip: false },
  { emoji: '☕', caption: 'Third coffee today', flip: false },
  { emoji: '🐟', caption: 'Incoming from Pike Place', flip: true }
] as const

const root = ref<HTMLElement | null>(null)
const current = ref<(typeof travelers)[number] & { key: number } | null>(null)

let seen = 0
let nextAt = props.firstAfter
let turn = 0
let inView = false
let timer: ReturnType<typeof setInterval> | undefined
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!motionAllowed() || !root.value) return

  observer = new IntersectionObserver(([entry]) => {
    inView = !!entry?.isIntersecting
  })
  observer.observe(root.value)

  // Counts seconds the band has actually been on screen in a visible tab.
  timer = setInterval(() => {
    if (document.visibilityState !== 'visible' || !inView || props.paused || current.value) return
    seen += 1
    if (seen < nextAt) return
    current.value = { ...travelers[turn % travelers.length]!, key: Date.now() }
    turn += 1
    nextAt = seen + props.every
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="root"
    class="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <div
      v-if="current"
      :key="current.key"
      :class="[
        // Centered by stretching to the band's height: the keyframes own `translate`.
        'absolute inset-y-0 left-0 flex items-center gap-2 animate-[travel-across_12s_linear_forwards]',
        paused && '[animation-play-state:paused]'
      ]"
      @animationend="current = null"
    >
      <span
        :class="['text-4xl leading-none', current.flip && '-scale-x-100']"
      >{{ current.emoji }}</span>
      <span class="border-2 border-ink bg-paper px-2 py-0.5 font-mono text-xs whitespace-nowrap text-black shadow-brutal-sm">
        {{ current.caption }}
      </span>
    </div>
  </div>
</template>
