<script setup lang="ts">
/**
 * A figure that counts from `from` to `to` the first time it scrolls into view.
 * Server render and reduced motion show `to` directly. The animated text is hidden
 * from assistive tech; screen readers get the final value once.
 */
const props = withDefaults(defineProps<{
  to: number
  from?: number
  prefix?: string
  suffix?: string
  /** ms */
  duration?: number
}>(), {
  from: 0,
  prefix: '',
  suffix: '',
  duration: 1200
})

const el = ref<HTMLElement | null>(null)
const current = ref(props.to)
const ready = ref(false)

/**
 * Negative targets count down from a plain "0": the minus sign (a true U+2212, not a hyphen)
 * appears once the value drops below zero, and zero never shows as "-0".
 */
function display(n: number) {
  const rounded = Math.round(n)
  if (rounded === 0) return props.to < 0 ? '0' : `${props.prefix}0${props.suffix}`
  const sign = rounded < 0 ? '\u2212' : ''
  return `${sign}${props.prefix}${Math.abs(rounded).toLocaleString('en-US')}${props.suffix}`
}

const finalText = computed(() => display(props.to))

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

onMounted(() => {
  if (motionAllowed()) current.value = props.from
  ready.value = true
})

useInViewOnce(el, () => {
  const start = performance.now()
  const tick = (now: number) => {
    // rAF timestamps can predate `start` by a frame; clamp so the value never overshoots past `from`.
    const t = Math.min(1, Math.max(0, (now - start) / props.duration))
    current.value = props.from + (props.to - props.from) * easeOutCubic(t)
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}, { threshold: 0.6 })
</script>

<template>
  <span
    ref="el"
    data-motion
    :data-ready="ready || undefined"
    class="tabular-nums"
  >
    <span aria-hidden="true">{{ display(current) }}</span>
    <span class="sr-only">{{ finalText }}</span>
  </span>
</template>
